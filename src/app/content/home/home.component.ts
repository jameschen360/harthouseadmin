
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FrontFetchService } from '../../service/fetch-service';
import { NotificationService } from 'app/service/notification.service';
import swal from 'sweetalert2';

declare var $;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  videoContentForm: FormGroup;
  public isVideoEnabled = false;
  public toggleStatusText = 'Disabled';
  public bannerLoading = true;
  public videoContentLoading = false;

  public responseData;
  public bannerImagePath;
  public s3AWSImagePath;

  videoTitle;
  videoURL;
  contentText;
  isDisabled;

  userCredentials = {
    id: sessionStorage.user_id,
    token: sessionStorage.token
  };

  bannerRemove = {
    id: sessionStorage.user_id,
    token: sessionStorage.token,
    bannerID: ''
  };

  toggleVideo = {
    id: sessionStorage.user_id,
    token: sessionStorage.token,
    toggleStatus: <any>null
  };

  videoContent = {
    id: sessionStorage.user_id,
    token: sessionStorage.token,
    videoTitle: <any>null,
    videoURL: <any>null,
    videoContent: <any>null
  };

  constructor(private authService: FrontFetchService, public http: Http, private notification: NotificationService) {
    this.initializeHomePage();
    this.videoContentForm = new FormGroup({
      'videoTitle': new FormControl(this.videoTitle, [Validators.required]),
      'videoURL': new FormControl(this.videoURL, [Validators.required])
    });

  }

  ngOnInit() {
  }

  removeBannerImage(bannerDOM) {
    const bannerDOM_ID = bannerDOM.id;
    const bannerID = bannerDOM_ID.split('_')[1];
    this.bannerRemove.bannerID = bannerID;
    console.log(this.bannerRemove);
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
        console.log(result);
        if (this.responseData.msg === 'success') {
          $(document).ready(function () {
            $('#' + bannerDOM_ID).closest('.container').fadeOut(600);
          });
          this.notification.showNotification('warning');
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
      console.log(this.bannerImagePath);
      this.videoTitle = this.responseData.videoContent.title;
      this.videoURL = this.responseData.videoContent.video_url;
      this.contentText = this.responseData.videoContent.content_text;
      this.isDisabled = this.responseData.videoContent.isDisabled;

      if (this.isDisabled === '0') {
        this.isVideoEnabled = true;
        this.toggleStatusText = 'Enabled';
      } else {
        this.isVideoEnabled = false;
        this.toggleStatusText = 'Disabled';
      }

      try {
        if (this.videoTitle.length > 0) {
          const d = document.getElementById('videoTitle');
          d.className += 'is-focused';
        }
        if (this.videoURL.length > 0) {
          const c = document.getElementById('videoURL');
          c.className += 'is-focused';
        }

      } catch ($e) {

      }

      // initialize summer note after everything has been rendered and get from db
      $(document).ready(function () {
        $('#summernote').summernote({
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

      this.bannerLoading = false;
    }, (err) => {
    });
  }

  homeVideoCheckBox() {
    this.toggleVideo.toggleStatus = !this.isVideoEnabled;
    this.authService.postData(this.toggleVideo, 'toggleVideo').then((result) => {
      this.responseData = result;
      if (this.isVideoEnabled === true) {
        this.isVideoEnabled = false;
        this.toggleStatusText = 'Disabled';
      } else if (this.isVideoEnabled === false) {
        this.isVideoEnabled = true;
        this.toggleStatusText = 'Enabled';
      }
      this.notification.videoToggleNotification(this.isVideoEnabled);
    }, (err) => {
    });

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
        console.log(this.bannerImagePath);
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

  saveVideoContent(videoTitle, videoURL) {

    this.videoContentLoading = true;
    this.videoContent.videoContent = $('#summernote').summernote('code');

    this.videoContent.videoTitle = videoTitle.value;
    this.videoContent.videoURL = videoURL.value;

    this.authService.postData(this.videoContent, 'videoContentSave').then((result) => {
      this.responseData = result;
      this.videoContentLoading = false;
      this.notification.videoSave();
    }, (err) => {
    });

  }

}
