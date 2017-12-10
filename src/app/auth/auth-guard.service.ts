import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { LoginService } from '../service/login.service';



@Injectable()
export class AuthGuard implements CanActivate {
    isLoggedIn;
    constructor(public authService: LoginService,
        public router: Router) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (sessionStorage.getItem('token')) {
            this.authService.isLoggedIn = true;
            return true;
        }
        // not logged in so redirect to login page with the return url
        // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }

    loggedIn() {
        if (sessionStorage.getItem('token')) {
            return true;
        } else {
            return false;
        }
    }
}
