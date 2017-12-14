import { Component, OnInit } from '@angular/core';
import { Gallery } from '../models/gallery.interface';
import { GALLERY_LIST } from '../mocks/gallery.mocks';
import { FrontFetchService } from 'app/service/fetch-service';

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

  constructor(public getData: FrontFetchService) {
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


  buttonStatus(){}
}
