import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { LoginService } from '../service/login.service';



@Injectable()
export class AuthPreventLoginPage implements CanActivate {

    constructor (public authService: LoginService,
        public router: Router) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (sessionStorage.token != null) {
            this.router.navigate(['/content/dashboard']);
            return false;
        }
        return true;
    }
}
