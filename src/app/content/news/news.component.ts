import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FrontFetchService } from 'app/service/fetch-service';
import { NotificationService } from 'app/service/notification.service';

import swal from 'sweetalert2';
declare var $;

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  userCredentials = {
    id: sessionStorage.user_id,
    token: sessionStorage.token
  };
  newsDataPost = {
    id: sessionStorage.user_id,
    token: sessionStorage.token,
    newsTitle: '',
    newsContent: ''
  };
  newsDataRemove = {
    id: sessionStorage.user_id,
    token: sessionStorage.token,
    newsID: <any>null
  };
  responseData;
  pageLoading = true;
  newsInit;
  addNewsForm: FormGroup;

  constructor(private authService: FrontFetchService, private notification: NotificationService) { 
    this.newsPageInitialize();
    this.addNewsForm = new FormGroup({
      'newsTitle': new FormControl(null, [Validators.required]),
      'newsContent': new FormControl(null, [Validators.required])
    });
  }

  ngOnInit() {
  }

  newsPageInitialize() {
    this.authService.postData(this.userCredentials, 'newsPageInitialize').then((result) => {
      this.responseData = result;
      this.newsInit = this.responseData.newsFeed;
      this.pageLoading = false;
    }, (err) => {
      this.pageLoading = false;
    });
  }

  addNewsModal() {
    $(() => {
      const options = {};
      $('[data-remodal-id=addNewsModal]').remodal(options).open();
    });
  }

  addNews() {
    swal({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      title: 'Are you sure you want to post this?',
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
      this.newsDataPost.newsTitle = this.addNewsForm.value.newsTitle;
      this.newsDataPost.newsContent = this.addNewsForm.value.newsContent;
      this.pageLoading = true;
      this.authService.postData(this.newsDataPost, 'newsAdd').then((result) => {
        this.responseData = result;
        this.newsInit = this.responseData.newsFeed;
        $('[data-remodal-id=addNewsModal]').remodal().close();
        this.addNewsForm.reset();
        this.pageLoading = false;
      }, (err) => {
        this.pageLoading = false;
      });
    }, (dismiss) => {
        this.pageLoading = false;
    });
  }

  removeNews(newsIDDOM) {
    const newsID = newsIDDOM.id;
    this.newsDataRemove.newsID = newsID;
    swal({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      title: 'Are you sure you want to delete this?',
      text: 'This action cannot be un-done!',
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
      this.authService.postData(this.newsDataRemove, 'newsRemove').then((result) => {
        this.responseData = result;

        $(() => {
          $('#' + newsID).fadeOut(650).remove();
        });

        this.pageLoading = false;
      }, (err) => {
        this.pageLoading = false;
      });
    }, (dismiss) => {
    });
  }
}
