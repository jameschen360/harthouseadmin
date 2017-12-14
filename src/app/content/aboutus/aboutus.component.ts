import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FrontFetchService } from '../../service/fetch-service';
import { NotificationService } from 'app/service/notification.service';
import swal from 'sweetalert2';

declare var $;

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  responseData;
  userCredentials = {
    id: sessionStorage.user_id,
    token: sessionStorage.token
  };

  constructor(private authService: FrontFetchService, public http: Http, private notification: NotificationService) {

  }

  ngOnInit() {
  }

}
