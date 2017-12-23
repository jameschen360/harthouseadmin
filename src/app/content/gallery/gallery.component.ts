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
  public pageLoading = true;

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
      this.bannerImagePath = this.responseData.gallery;
      this.pageLoading = false;

    }, (err) => {
    });
  }

  removeGalleryImage(galleryDOM) {
    this.pageLoading = true;
    const galleryDOM_ID = galleryDOM.id;
    const galleryID = galleryDOM_ID.split('_')[1];
    this.galleryRemove.bannerID = galleryID;
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
      this.pageLoading = true;
      this.authService.postData(this.galleryRemove, 'galleryImageRemove').then((result) => {
        this.responseData = result;
        if (this.responseData.msg === 'success') {
          $(document).ready(function () {
            $('#' + galleryDOM_ID).closest('.container').fadeOut(600);
          });
          this.notification.showNotification('warning');
        } else {
          this.notification.showNotification('danger');
        }
        this.pageLoading = false;
      }, (err) => {
      });
    }, (dismiss) => {
      if (dismiss === 'cancel') {
        this.pageLoading = false;
      }
    });
  }

  saveSort(event) {
    swal({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      title: 'Are you sure you want to save this?',
      text: 'You are about to save the sort order of the photos on your gallery page!',
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
      this.imageId = document.getElementsByClassName('imageId');
      this.imageUrl = document.getElementsByClassName('imageUrl');
      this.imageSort = document.getElementsByClassName('imageSort');
      this.gallerySize = this.imageId.length;
      this.imageList = [];


      for (let i = 0; i < this.gallerySize; i++) {
        this.imageList[i] = { 'id': this.imageId[i].value, 'url': this.imageUrl[i].value, 'sort': i };
      }
      this.imageList[this.imageId.length] = { 'id': sessionStorage.user_id, 'url': sessionStorage.token, 'sort': 1 };

      this.authService.postData(this.imageList, 'galleryPageSortSave').then((result) => {
        this.responseData = result;
        this.pageLoading = false;
      }, (err) => {
      });


    }, (dismiss) => {
      if (dismiss === 'cancel') {
        swal(
          'Cancelled',
          'You didn\'t save anything!',
          'error'
        );
        this.pageLoading = false;
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
      this.pageLoading = true;
      const formData = new FormData();
      formData.append('image_data', event.target.files[0]);
      formData.append('user_id', sessionStorage.user_id);
      formData.append('token', sessionStorage.token);
      formData.append('type', 'upload');

      this.authService.postDataFile(formData, 'galleryFileUpload.php').then((result) => {
        this.responseData = result;
        this.pageLoading = false;
        this.bannerImagePath.unshift(this.responseData.image_data);
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

  buttonStatus(){}
}
