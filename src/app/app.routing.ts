import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/auth/auth-guard.service';
import { AuthPreventLoginPage } from 'app/auth/auth-prevent-login-page.services';
import { ContentComponent } from 'app/content/content.component';
import { MenuComponent } from 'app/content/menu/menu.component';
import { ReservationComponent } from 'app/content/reservation/reservation.component';
import { LoginComponent } from 'app/login/login.component';

import { AboutusComponent } from './content/aboutus/aboutus.component';
import { CweventComponent } from './content/cwevent/cwevent.component';
import { DashboardComponent } from './content/dashboard/dashboard.component';
import { GalleryComponent } from './content/gallery/gallery.component';
import { HomeComponent } from './content/home/home.component';
import { NewsComponent } from './content/news/news.component';
import { ParallaxComponent } from './content/parallax/parallax.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthPreventLoginPage] },
  { path: 'content', redirectTo: 'content/dashboard' },
  { path: 'content', component: ContentComponent, canActivate: [AuthGuard], children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'home', component: HomeComponent },
    { path: 'aboutus', component: AboutusComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'gallery', component: GalleryComponent },
    { path: 'news', component: NewsComponent },
    { path: 'cwevent', component: CweventComponent },
    { path: 'reservation', component: ReservationComponent },
    { path: 'parallax', component: ParallaxComponent },
  ]},
  { path: '**', redirectTo: 'content/dashboard' },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
