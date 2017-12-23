import { Component, OnInit } from '@angular/core';
import { FrontFetchService } from 'app/service/fetch-service';
import { NotificationService } from 'app/service/notification.service';

import swal from 'sweetalert2';
@Component({
  selector: 'app-parallax',
  templateUrl: './parallax.component.html',
  styleUrls: ['./parallax.component.css']
})
export class ParallaxComponent implements OnInit {
  userCredentials = {
    id: sessionStorage.user_id,
    token: sessionStorage.token
  };
  parallaxChangeData = {
    id: sessionStorage.user_id,
    token: sessionStorage.token,
    changeTag: ''
  };
  responseData;
  imageURL;
  selectedParallaxTab;
  pageLoading = true;
  imageIsSet = false;
  constructor(private authService: FrontFetchService, private notification: NotificationService) {
    this.parallaxPageInit();
  }

  ngOnInit() {
  }

  parallaxPageInit() {
    this.authService.postData(this.userCredentials, 'parallaxPageInit').then((result) => {
      this.responseData = result;
      this.imageURL = this.responseData.parallax.image_path;
      try {
        if (this.imageURL.length > 0) {
          this.imageIsSet = true;
        } else {
          this.imageIsSet = false;
        }
      } catch (err) {

      }
      this.pageLoading = false;
    }, (err) => {
      this.pageLoading = false;
    });
  }

  changePageImage(event) {
    this.pageLoading = true;
    this.parallaxChangeData.changeTag = event.target.value;
    this.selectedParallaxTab = event.target.value;
    this.authService.postData(this.parallaxChangeData, 'parallaxPageChangeSelect').then((result) => {
      this.responseData = result;
      this.imageURL = this.responseData.parallax.image_path;
      try {
        if (this.imageURL.length > 0) {
          this.imageIsSet = true;
        } else {
          this.imageIsSet = false;
        }
      } catch (err) {

      }
      this.pageLoading = false;
    }, (err) => {
      this.pageLoading = false;
    });
  }

  uploadFile(event) {
    swal({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      title: 'Are you sure you want to upload this?',
      text: 'Please insure the picture has a width that is greater than 1200px so it will fit the span of the backdrop!',
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
      this.pageLoading = true;
      const formData = new FormData();
      formData.append('image_data', event.target.files[0]);
      formData.append('user_id', sessionStorage.user_id);
      formData.append('token', sessionStorage.token);
      formData.append('previousImageURL', this.imageURL);
      formData.append('type', this.selectedParallaxTab);

      this.authService.postDataFile(formData, 'parallaxImageUpload.php').then((result) => {
        this.responseData = result;
        this.pageLoading = false;
        this.imageURL = this.responseData.image_url;
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
        this.pageLoading = false;
      }
    });
  }
}
