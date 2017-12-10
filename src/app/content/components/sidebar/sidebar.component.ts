import { Component, OnInit } from '@angular/core';
import { AuthLogout } from 'app/auth/auth-logout';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
    { path: 'home', title: 'Home Page', icon: 'home', class: '' },
    { path: 'aboutus', title: 'About Us Page', icon: 'assignment_ind', class: '' },
    { path: 'menu', title: 'Menu Page', icon: 'restaurant_menu', class: '' },
    { path: 'gallery', title: 'Gallery Page', icon: 'view_module', class: '' },
    { path: 'news', title: 'News Page', icon: 'description', class: '' },
    { path: 'cwevent', title: 'C/W Page', icon: 'event', class: '' },
    { path: 'reservation', title: 'Reservations', icon: 'perm_phone_msg', class: '' },
    { path: 'parallax', title: 'Parallax', icon: 'burst_mode', class: '' },

    { path: 'user-profile', title: 'User Profile', icon: '', class: '' },
    { path: 'table-list', title: 'Table List', icon: '', class: '' },
    { path: 'typography', title: 'Typography', icon: '', class: '' },
    { path: 'icons', title: 'Icons', icon: '', class: '' },
    { path: 'notifications', title: 'Notifications', icon: '', class: '' },
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];

    constructor(private authLogout: AuthLogout) {
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
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
