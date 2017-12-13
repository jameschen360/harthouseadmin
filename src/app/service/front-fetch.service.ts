import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

import { Injectable, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class FrontFetchService {
  // PRODUCTION OR SANDBOX DEV
  setAs: String = 'production'; // production or sandbox
  URL: String;

  constructor(public http: Http, public router: Router) {
    if (this.setAs === 'production') {
      this.URL = 'https://harthousewineandtapa.com/angularServices/general/';
    } else  if (this.setAs === 'sandbox') {
      this.URL = 'https://harthousewineandtapa.com/ngtest/general/';
    }
  }

  postData(credentials, type) {
    return new Promise((resolve, reject) => {
      const headers = new Headers();
      this.http.post(this.URL + type, JSON.stringify(credentials), { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }



}
