import { Component, OnInit } from '@angular/core';

import swal from 'sweetalert2';
import { FrontFetchService } from 'app/service/fetch-service';
import { NotificationService } from 'app/service/notification.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  pdfSrc;
  loading;
  buttonText;
  isSelected;
  responseData;
  drinkMenu;
  foodMenu;
  pageLoading = true;
  userCredentials = {
    id: sessionStorage.user_id,
    token: sessionStorage.token
  };

  constructor(private authService: FrontFetchService, private notification: NotificationService) {
    this.menuInitialize();
  }

  ngOnInit() {
  }

  menuInitialize() {
    this.isSelected = 'food';
    this.buttonText = 'Upload Food Menu';
    this.authService.postData(this.userCredentials, 'menuPageInitialize').then((result) => {
      this.responseData = result;
      this.drinkMenu = this.responseData.drink.menu_url;
      this.foodMenu = this.responseData.food.menu_url;
      this.pdfSrc = this.foodMenu;
      this.pageLoading = false;
    }, (err) => {
    });
  }

  foodMenuSelector() {
    this.pdfSrc = this.foodMenu;
    this.buttonText = 'Upload Food Menu';
    this.isSelected = 'food';
  }

  drinkMenuSelector() {
    this.pdfSrc = this.drinkMenu;
    this.buttonText = 'Upload Drink Menu';
    this.isSelected = 'drink';
  }

  uploadFile(event) {
    console.log(this.isSelected)
    swal({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      title: 'Are you sure you want to upload this menu?',
      text: 'Only PDF documents are accepted!',
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
      this.loading = true;
      const formData = new FormData();
      formData.append('image_data', event.target.files[0]);
      formData.append('user_id', sessionStorage.user_id);
      formData.append('token', sessionStorage.token);
      formData.append('type', this.isSelected);
      formData.append('previousPdfURL', this.pdfSrc);

      this.authService.postDataFile(formData, 'menuPdfUpload.php').then((result) => {
        this.responseData = result;
        this.loading = false;
        const response = result;
        if (this.responseData.msg === 'success') {
          this.pdfSrc = this.responseData.pdf_url;
          this.notification.showNotificationPDF('success');
        } else {
          this.notification.showNotificationPDF('danger');
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
        this.loading = false;
      }
    });
  }

}
