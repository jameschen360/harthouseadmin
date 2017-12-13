
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { FetchService } from '../../service/fetch-service';
import swal from 'sweetalert2';


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

  constructor(private authService: FetchService, public http: Http) {
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

      this.http.post('https://harthousewineandtapa.com/ngtest/admin/bannerFileUpload.php', formData)
        .map(response => response.json()).subscribe(
        result => {
          this.bannerLoading = false;
          const response = result;
          this.bannerImagePath.push(response.image_data);
          if (response.msg === 'success') {
            this.showNotification('success');
          } else {
            this.showNotification('danger');
          }
        },
        error => {
          console.log(error);
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

  showNotification(type) {
    if (type === 'success') {
      $.notify({
          icon: 'notifications',
          message: 'Banner image upload success!'

      }, {
          type: type,
          timer: 4000,
          placement: {
              from: 'top',
              align: 'center'
          }
      });
    } else {
      $.notify({
        icon: 'notifications',
        message: 'Something went wrong!'

    }, {
        type: type,
        timer: 4000,
        placement: {
            from: 'top',
            align: 'center'
        }
    });
    }
}



}
