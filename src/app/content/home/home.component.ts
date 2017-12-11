import { FetchService } from '../../service/fetch-service';
import { Component, OnInit } from '@angular/core';

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
  public loading = false;
  public responseData;

  userCredentials = {
    id: sessionStorage.user_id,
    token: sessionStorage.token
  };

  constructor( private authService: FetchService) {
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
      console.log(this.responseData);
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
    this.loading = true;
    console.log(event.target.files[0]);
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
      confirmButtonText: 'Yes!'

    }).then(() => {
      // this.getData.postData(this.markAsDeliveredData, 'markAsDelivered').then((result) => {


      // }, (err) => {
      //     // show some error
      //     console.log(err);
      // });
    }, (dismiss) => {
      if (dismiss === 'cancel') {
        this.loading = false;
      }
    });
  }

}
