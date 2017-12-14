import { Component, OnInit } from '@angular/core';
import { Gallery } from '../models/gallery.interface';
import { GALLERY_LIST } from '../mocks/gallery.mocks';
import { FrontFetchService } from '../../service/fetch-service';
import { NotificationService } from 'app/service/notification.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  postData = {
    'user_id': 'public'
  };
  imageList: Gallery[];
  imageInfo: Gallery[];
  editOrder: boolean;
  public responseData;
  public galleryLoading = false;
  public parrallaxUrl;
  public buttonLoading = true;

  public bannerLoading = false;

  constructor(public getData: FrontFetchService, private authService: FrontFetchService) {
    this.imageList = GALLERY_LIST;
  }

  ngOnInit() {
  }

  getGalleryImages() {
    this.getData.postData(this.postData, 'galleryImages').then((result) => {
      this.responseData = result;
      for (let i = 0; i < this.responseData.galleryImages.length; i++) {
      }
    }, (err) => {
    });
  }

  editOrderChange(){
    this.editOrder = true;
    console.log(this.editOrder);

    // if (this.editOrder = null){
    //   this.editOrder = false;
    //   console.log(this.editOrder);
    // } else if(this.editOrder = false){
    //   this.editOrder = true;
    //   console.log(this.editOrder);
    // } else if(this.editOrder = true){
    //   this.editOrder = false;
    //   console.log(this.editOrder);
    // }
  }

  editOrderNumber () {
   // alert(this.imageList.order);
   this.editOrder = false;
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
        // this.bannerImagePath.push(this.responseData.image_data);
        // if (this.responseData.msg === 'success') {
        //   this.notification.showNotification('success');
        // } else {
        //   this.notification.showNotification('danger');
        // }

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

  buttonStatus(){}
}
