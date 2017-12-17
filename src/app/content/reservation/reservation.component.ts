import { Component, OnInit } from '@angular/core';
import { FrontFetchService } from 'app/service/fetch-service';
import { NotificationService } from 'app/service/notification.service';

import swal from 'sweetalert2';

declare var $;

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  userCredentials = {
    id: sessionStorage.user_id,
    token: sessionStorage.token
  };
  reservationData = {
    id: sessionStorage.user_id,
    token: sessionStorage.token,
    reservationID: ''
  };

  pageLoading = true;
  responseData;
  pendingReservations;
  completeReservations;

  detailedReservationDateTime;
  detailedReservationEmail;
  detailedReservationFullName;
  detailedReservationMessage;
  detailedReservationPeople;
  detailedReservationStatus;

  loading = false;
  modalLoading = false;

  reservationID;
  constructor(private authService: FrontFetchService, private notification: NotificationService) {
    this.reservationPageInitialize();

  }

  ngOnInit() {
  }

  reservationPageInitialize() {
    this.authService.postData(this.userCredentials, 'reservationPageInitialize').then((result) => {
      this.responseData = result;
      this.pendingReservations = this.responseData.pending;
      this.completeReservations = this.responseData.complete;

      this.pageLoading = false;
    }, (err) => {
    });
  }

  reservationModal(reservationIdDOM) {
    this.loading = true;
    this.reservationID = reservationIdDOM.id;
    this.reservationData.reservationID = reservationIdDOM.id;
    this.authService.postData(this.reservationData, 'reservationDataPull').then((result) => {
      this.responseData = result;
      this.detailedReservationDateTime = this.responseData.reservationData.date_time;
      this.detailedReservationEmail = this.responseData.reservationData.email;
      this.detailedReservationFullName = this.responseData.reservationData.full_name;
      this.detailedReservationMessage = this.responseData.reservationData.message_content;
      this.detailedReservationPeople = this.responseData.reservationData.people_number;
      this.detailedReservationStatus = this.responseData.reservationData.status_reserve;
      $(() => {
        const options = {};
        $('[data-remodal-id=reservationModal]').remodal(options).open();
        this.loading = false;
      });
    }, (err) => {
      this.loading = false;
    });
  }

  approveReservation() {
    this.modalLoading = true;
    this.loading = true;
    this.authService.postData(this.reservationData, 'approveReservation').then((result) => {
      this.completeReservations.push(this.responseData.reservationData);
      $(() => {
        $('#' + this.reservationID).fadeOut(600).remove();
      });
      this.modalLoading = false;
      this.loading = false;
      this.notification.reservationNotification('success');
    }, (err) => {
      this.modalLoading = false;
      this.loading = false;
      this.notification.error();
    });
  }

  deleteReservation() {
    swal({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      title: 'Are you sure you want to delete this?',
      text: 'Action cannot be un-done!',
      type: 'info',
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
      this.modalLoading = true;
      this.authService.postData(this.reservationData, 'deleteReservation').then((result) => {
        $(() => {
          $('#' + this.reservationID).fadeOut(600).remove();
        });
        this.modalLoading = false;
        this.notification.reservationNotification('danger');
      }, (err) => {
        this.notification.error();
      });

    }, (dismiss) => {
        this.modalLoading = false;
    });
  }

}
