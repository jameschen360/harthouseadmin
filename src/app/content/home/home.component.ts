
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { FrontFetchService } from '../../service/fetch-service';
import swal from 'sweetalert2';
import { NotificationService } from 'app/service/notification.service';


declare var $;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public isVideoEnabled = false;
  public toggleStatusText = 'Disabled';
  public bannerLoading = false;
  public responseData;
  public bannerImagePath;
  public s3AWSImagePath;

  userCredentials = {
    id: sessionStorage.user_id,
    token: sessionStorage.token
  };

  bannerRemove = {
    id: sessionStorage.user_id,
    token: sessionStorage.token,
    bannerID: ''
  };

  constructor(private authService: FrontFetchService, public http: Http, private notification: NotificationService) {
    $(document).ready(function () {
      $('#summernote').summernote({
        placeholder: 'Please write a reason here...',
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

    this.initializeHomePage();
  }

  ngOnInit() {
  }

  removeBannerImage(bannerDOM) {
    const bannerDOM_ID = bannerDOM.id;
    const bannerID = bannerDOM_ID.split('_')[1];
    this.bannerRemove.bannerID = bannerID;
    swal({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      title: 'Are you sure you want to delete this?',
      type: 'question',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonColor: '#ffb606',
      cancelButtonColor: '#e87164',
      confirmButtonText: 'Yes!',
      preConfirm: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 400);
        });
      },
    }).then(() => {
      this.bannerLoading = true;
      this.authService.postData(this.bannerRemove, 'bannerImageRemove').then((result) => {
        this.responseData = result;
        if (this.responseData.msg === 'success') {
          $(document).ready(function () {
            $('#' + bannerDOM_ID).closest('.container').fadeOut(600);
          });
        } else {
          this.notification.showNotification('danger');
        }
        this.bannerLoading = false;
      }, (err) => {
      });
    }, (dismiss) => {
      if (dismiss === 'cancel') {
        this.bannerLoading = false;
      }
    });
  }

  initializeHomePage() {
    this.authService.postData(this.userCredentials, 'homePageInitialize').then((result) => {
      this.responseData = result;
      this.bannerImagePath = this.responseData.url_path;
    }, (err) => {
    });
  }

  homeVideoCheckBox() {
    if (this.isVideoEnabled === true) {
      this.isVideoEnabled = false;
      this.toggleStatusText = 'Disabled';
    } else if (this.isVideoEnabled === false) {
      this.isVideoEnabled = true;
      this.toggleStatusText = 'Enabled';
    }
  }

  uploadFile(event) {
    swal({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      title: 'Are you sure you want to upload this?',
      text: 'Please be mindful of the image dimension/size and how it will fit on the front page!',
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
      this.bannerLoading = true;
      const formData = new FormData();
      formData.append('image_data', event.target.files[0]);
      formData.append('user_id', sessionStorage.user_id);
      formData.append('token', sessionStorage.token);

      this.authService.postDataFile(formData, 'bannerFileUpload.php').then((result) => {
        this.responseData = result;
        this.bannerLoading = false;
        const response = result;
        this.bannerImagePath.push(this.responseData.image_data);
        if (this.responseData.msg === 'success') {
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
        this.bannerLoading = false;
      }
    });
  }

}
