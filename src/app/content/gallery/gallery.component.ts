import { Component, OnInit } from '@angular/core';
import { Gallery } from '../models/gallery.interface';
import { GALLERY_LIST } from '../mocks/gallery.mocks';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  imageList: Gallery[];
  constructor() {
    this.imageList = GALLERY_LIST;
  }

  ngOnInit() {
  }
}
