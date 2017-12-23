import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';

declare var jquery: any;
declare var $: any;

@Injectable()
export class LoginService {
  token: string;
  user_id: string;
  responseData;
  errorLoginMsg = false;
  loginAPIURI = 'https://harthousewineandtapa.com/angularServices/login/';
  returnUrl: string;
  isLoggedIn;
  constructor(public http: Http,
              public router: Router
            ) {

            }
  postData(credentials, type) {
    return new Promise((resolve, reject) => {
      const headers = new Headers();
      this.http.post(this.loginAPIURI + type, JSON.stringify(credentials), { headers: headers })
        .subscribe(res => {
          resolve(res.json());
          this.responseData = res.json();
          this.token = res.json().token;
          this.user_id = res.json().user_id;
          sessionStorage.clear();
          if (this.token != null) {
            sessionStorage.setItem('userData', JSON.stringify(res.json()));
            sessionStorage.setItem('token', this.token);
            sessionStorage.setItem('user_id', this.user_id);
          } else {
            this.errorLoginMsg = true;
          }
        }, (err) => {
          reject(err);
        });
    });
  }

}
