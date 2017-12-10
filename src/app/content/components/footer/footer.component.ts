import { Component, OnInit } from '@angular/core';
import { AuthGuard } from 'app/auth/auth-guard.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isLoggedIn;
  constructor(private authGuard: AuthGuard) {
    this.isLoggedIn = authGuard.loggedIn();
  }

  ngOnInit() {
  }

}
