import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FrontFetchService } from '../../service/fetch-service';
import { NotificationService } from 'app/service/notification.service';
import swal from 'sweetalert2';

declare var $;

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  responseData;
  aboutUsTitle;
  aboutUsContent;
  chefTitle;
  chefName;
  chefPictureURL;
  chefContent;
  isDisabled;
  chefBioPressed = false;
  loading;
  toggleStatusText;
  isChefEnabled;

  userCredentials = {
    id: sessionStorage.user_id,
    token: sessionStorage.token
  };

  chefBioToggle = {
    id: sessionStorage.user_id,
    token: sessionStorage.token,
    toggleStatus: <any>null
  };

  aboutUsJson = {
    id: sessionStorage.user_id,
    token: sessionStorage.token,
    aboutUsTitle: <any>null,
    aboutUsContent: <any>null
  };

  chefBioJson = {
    id: sessionStorage.user_id,
    token: sessionStorage.token,
    chefTitle: <any>null,
    chefName: <any>null,
    chefContent: <any>null
  };

  constructor(private authService: FrontFetchService, public http: Http, private notification: NotificationService) {
    this.authService.postData(this.userCredentials, 'aboutUsInitialize').then((result) => {
      this.responseData = result;
      this.aboutUsTitle = this.responseData.aboutUs.title;
      this.aboutUsContent = this.responseData.aboutUs.content;

      this.chefTitle = this.responseData.chefBio.title;
      this.chefName = this.responseData.chefBio.chef_name;
      this.chefPictureURL = this.responseData.chefBio.picture_url;
      this.chefContent = this.responseData.chefBio.content;
      this.isDisabled = this.responseData.chefBio.isDisabled;

      if (this.isDisabled === '0') {
        this.isChefEnabled = true;
        this.toggleStatusText = 'Enabled';
      } else {
        this.isChefEnabled = false;
        this.toggleStatusText = 'Disabled';
      }

      try {
        if (this.aboutUsTitle.length > 0) {
          const d = document.getElementById('aboutUsTitle');
          d.className += 'is-focused';
        }
        if (this.chefTitle.length > 0) {
          const c = document.getElementById('chefTitle');
          c.className += 'is-focused';
        }
        if (this.chefName.length > 0) {
          const c = document.getElementById('chefName');
          c.className += 'is-focused';
        }

      } catch ($e) {

      }

      // initialize summer note after everything has been rendered and get from db
      $(document).ready(function () {
        $('#summernote, #summernote2').summernote({
          placeholder: 'Please write here...',
          minHeight: 250,             // set minimum height of editor
          maxHeight: null,             // set maximum height of editor
          focus: true,
          toolbar: [
            ['headline', ['style']],
            ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
            ['textsize', ['fontsize']],
            ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
          ],
        });
      });
    }, (err) => {
    });
  }

  ngOnInit() {
  }

  chefCheckBox() {
    this.chefBioToggle.toggleStatus = !this.isChefEnabled;
    this.authService.postData(this.chefBioToggle, 'chefBioToggle').then((result) => {
      this.responseData = result;
      if (this.isChefEnabled === true) {
        this.isChefEnabled = false;
        this.toggleStatusText = 'Disabled';
      } else if (this.isChefEnabled === false) {
        this.isChefEnabled = true;
        this.toggleStatusText = 'Enabled';
      }
      this.notification.chefToggleNotification(this.isChefEnabled);
    }, (err) => {
    });

  }

  saveAboutUs(aboutUsTitle) {
    this.loading = true;
    this.aboutUsJson.aboutUsTitle = aboutUsTitle.value;
    this.aboutUsJson.aboutUsContent = $('#summernote').summernote('code');
    this.authService.postData(this.aboutUsJson, 'saveAboutUs').then((result) => {
      this.responseData = result;
      if (this.responseData.msg === 'success') {
        this.notification.aboutUsSave();
      } else {
        this.notification.error();
      }
      this.loading = false;
    }, (err) => {
    });
  }

  saveChefBio(chefName, chefTitle) {
    this.loading = true;

    this.chefBioJson.chefTitle = chefTitle.value;
    this.chefBioJson.chefName = chefName.value;
    this.chefBioJson.chefContent = $('#summernote2').summernote('code');
    this.authService.postData(this.chefBioJson, 'saveChefBio').then((result) => {
      this.responseData = result;
      if (this.responseData.msg === 'success') {
        this.notification.chefSave();
      } else {
        this.notification.error();
      }
      this.loading = false;
    }, (err) => {
    });
  }

  uploadFile(event) {
    swal({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      title: 'Are you sure you want to upload this?',
      text: 'Please make sure that the image is a square image for best result! (eg. 300px by 300px)',
      type: 'question',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonColor: '#ffb606',
      cancelButtonColor: '#e87164',
      confirmButtonText: 'Yes!',
      preConfirm: (email) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 1000);
        });
      },
    }).then(() => {
      this.loading = true;
      const formData = new FormData();
      formData.append('image_data', event.target.files[0]);
      formData.append('user_id', sessionStorage.user_id);
      formData.append('token', sessionStorage.token);
      formData.append('previousImageURL', this.chefPictureURL);

      this.authService.postDataFile(formData, 'chefImageUpload.php').then((result) => {
        this.responseData = result;
        this.loading = false;
        if (this.responseData.msg === 'success') {
          this.chefPictureURL = this.responseData.image_url;
          this.notification.showNotification('success');
        } else {
          this.notification.showNotification('danger');
        }

      }, (err) => {
      });

    }, (dismiss) => {
      if (dismiss === 'cancel') {
        swal(
          'Cancelled',
          'You didn\'t upload anything!',
          'error'
        );
        this.loading = false;
      }
    });
  }

  aboutBlurbLink() {
    this.chefBioPressed = false;
  }

  chefLink() {
    this.chefBioPressed = true;
  }
}
