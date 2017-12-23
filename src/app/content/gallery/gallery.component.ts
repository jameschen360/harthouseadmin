import { Component, OnInit } from '@angular/core';
import { Gallery } from '../models/gallery.interface';
import { GALLERY_LIST } from '../mocks/gallery.mocks';
import { FrontFetchService } from '../../service/fetch-service';
import { NotificationService } from 'app/service/notification.service';

import swal from 'sweetalert2';
declare var $;

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  postData = {
    id: sessionStorage.user_id,
    token: sessionStorage.token,
    bannerID: ''
  };
  imageList: Gallery[];
  imageInfo: Gallery[];
  editOrder = false;
  public responseData;
  public galleryLoading = false;
  public parrallaxUrl;
  public buttonLoading = true;
  public bannerLoading = false;
  public imageId;
  public imageUrl;
  public imageSort;
  public gallerySize;
  public bannerImagePath;
  public imageDataArray;
  public dataArray;

  toggleEdit = {
    id: sessionStorage.user_id,
    token: sessionStorage.token,
    toggleStatus: <any>null
  };

  galleryRemove = {
    id: sessionStorage.user_id,
    token: sessionStorage.token,
    bannerID: ''
  };

  public isEditEnabled = false;
  public toggleStatusButton;
  public toggleStatusInput;

  constructor(public getData: FrontFetchService, private authService: FrontFetchService, private notification: NotificationService) {
    this.imageList = GALLERY_LIST;
  }

  ngOnInit() {
    this.getGalleryImages();
  }

  getGalleryImages() {
    this.getData.postData(this.postData, 'galleryPageInitialize').then((result) => {
      this.responseData = result;
      this.imageInfo = this.responseData.gallery;

      for (let i = 0; i < this.responseData.gallery.length; i++) {
        //this.responseData.gallery
      }
    }, (err) => {
    });
  }

  removeGalleryImage(galleryDOM) {
    const galleryDOM_ID = galleryDOM.id;
    const galleryID = galleryDOM_ID.split('_')[1];
    console.log(galleryDOM_ID);
    console.log(galleryID);
    this.galleryRemove.bannerID = galleryID;
    console.log(this.galleryRemove);
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
      this.authService.postData(this.galleryRemove, 'galleryImageRemove').then((result) => {
        this.responseData = result;
        console.log(result);
        if (this.responseData.msg === 'success') {
          $(document).ready(function () {
            $('#' + galleryDOM_ID).closest('.container').fadeOut(600);
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

  editCheckBox() {
    this.toggleEdit.toggleStatus = !this.isEditEnabled;
    this.authService.postData(this.toggleEdit, 'toggleVideo').then((result) => {
      this.responseData = result;
      if (this.isEditEnabled === true) {
        this.isEditEnabled = false;
        this.toggleStatusButton = 'Disabled';
        this.toggleStatusInput = 'Disabled';
        this.editOrder = true;
      } else if (this.isEditEnabled === false) {
        this.isEditEnabled = true;
        this.toggleStatusButton = 'Enabled';
        this.toggleStatusInput = 'Enabled';
        this.editOrder = false;
      }
      this.notification.galleryRemoveNotification(this.isEditEnabled);

      this.imageId = document.getElementsByClassName('imageId');
      this.imageUrl = document.getElementsByClassName('imageUrl');
      this.imageSort = document.getElementsByClassName('imageSort');
      this.gallerySize = this.imageId.length;

      for (let i = 0; i < this.gallerySize; i++) {
        this.imageInfo[i] = { 'id': this.imageId[i].value, 'url': this.imageUrl[i].value, 'sort': this.imageSort[i].value };
      }
      console.log(this.imageInfo);
      console.log(JSON.stringify(this.imageInfo));

    }, (err) => {
    });
  }

  saveSort(event) {
    swal({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      title: 'Are you sure you want to save this?',
      text: 'Please be mindful of the image dimension/size and how it will fit on the gallery page!',
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
      this.imageId = document.getElementsByClassName('imageId');
      this.imageUrl = document.getElementsByClassName('imageUrl');
      this.imageSort = document.getElementsByClassName('imageSort');
      this.gallerySize = this.imageId.length;

      for (let i = 0; i < this.gallerySize; i++) {
        this.imageInfo[i] = { 'id': this.imageId[i].value, 'url': this.imageUrl[i].value, 'sort': this.imageSort[i].value };
      }

      this.bannerLoading = true;
      const formData = new FormData();
      formData.append('imageInfo', JSON.stringify(this.imageInfo));
      formData.append('user_id', sessionStorage.user_id);
      formData.append('token', sessionStorage.token);
      formData.append('type', 'sort');

      console.log(this.imageInfo);
      console.log(JSON.stringify(this.imageInfo));
      this.authService.postDataFile(formData, 'galleryFileUpload.php').then((result) => {
        this.responseData = result;
        console.log(this.responseData.imageArray);
        console.log(this.responseData.imageSort);
        console.log(this.responseData.imageId);
        console.log(this.responseData.galleryInfoArray);
        console.log(this.responseData.gallerySize);
        console.log(this.responseData.testTrue);
      }, (err) => {
      });


    }, (dismiss) => {
      if (dismiss === 'cancel') {
        swal(
          'Cancelled',
          'You didn\'t save anything!',
          'error'
        );
        this.bannerLoading = false;
      }
    });
  }

  uploadFile(event) {
    swal({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      title: 'Are you sure you want to upload this?',
      text: 'Please be mindful of the image dimension/size and how it will fit in the gallery!',
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
      formData.append('type', 'upload');

      this.authService.postDataFile(formData, 'galleryFileUpload.php').then((result) => {
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

  buttonStatus(){}
}
