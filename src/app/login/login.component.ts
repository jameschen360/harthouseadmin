import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LoginService } from '../service/login.service';
import { AuthGuard } from 'app/auth/auth-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  responseData: any;
  returnUrl: string;
  loginData = {
    'username': '',
    'password': ''
  };
  isLoggedIn;
  errorLoginMsg = false;

  authenticated = false;

  loading = false;
  loginForm: FormGroup;

  constructor(public authService: LoginService,
    public router: Router,
    public route: ActivatedRoute,
    private authGuard: AuthGuard) {
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'content/dashboard';

      this.loginForm = new FormGroup({
        'username': new FormControl(null, [Validators.required]),
        'password': new FormControl(null, [Validators.required])
      });

  }

  ngOnInit() {
    this.isLoggedIn = this.authGuard.loggedIn();
  }

  onSignIn() {
    this.loading = true;
    this.loginData.username = this.loginForm.value.username;
    this.loginData.password = this.loginForm.value.password;

    if (this.loginData.username && this.loginData.password) {
      this.router.navigateByUrl(this.returnUrl);
      this.authService.postData(this.loginData, 'login').then((result) => {
        this.responseData = result;
        this.isLoggedIn = this.authGuard.loggedIn();
        if (this.responseData.userData === false) {
          this.loading = false;
          this.errorLoginMsg = true;
        } else {
          this.loading = false;
          this.errorLoginMsg = false;
          this.router.navigateByUrl(this.returnUrl);
        }
      }, (err) => {
      });
    } else {
      // error message
    }
  }
}
