import { Component, OnInit } from '@angular/core';
import { AuthLogout } from 'app/auth/auth-logout';
import { ActivatedRoute, Router } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    // { path: 'user-profile', title: 'User Profile', icon: '', class: '' },
    // { path: 'table-list', title: 'Table List', icon: '', class: '' },
    // { path: 'typography', title: 'Typography', icon: '', class: '' },
    // { path: 'icons', title: 'Icons', icon: '', class: '' },
    // { path: 'notifications', title: 'Notifications', icon: '', class: '' },
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    constructor(private authLogout: AuthLogout, private router: Router) {
    }

    ngOnInit() {
    }
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    onLogoutClick() {
        this.authLogout.onLogout();
    }
}
