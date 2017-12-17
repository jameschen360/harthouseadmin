import { Component, OnInit } from '@angular/core';
import { FrontFetchService } from 'app/service/fetch-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pageLoading = true;
  responseData;
  numberOfReservation;
  userCredentials = {
    id: sessionStorage.user_id,
    token: sessionStorage.token
  };
  constructor(private authService: FrontFetchService) {
    this.dashboardInit();
  }

  dashboardInit() {
    this.authService.postData(this.userCredentials, 'dashboardInit').then((result) => {
      this.responseData = result;
      this.numberOfReservation = this.responseData.pendingReservations;
      this.pageLoading = false;
    }, (err) => {
    });
  }

  ngOnInit() {
  }

}
