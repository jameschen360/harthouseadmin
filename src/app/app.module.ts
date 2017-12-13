import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'app/auth/auth-guard.service';
import { AuthLogout } from 'app/auth/auth-logout';
import { AuthPreventLoginPage } from 'app/auth/auth-prevent-login-page.services';
import { AboutusComponent } from 'app/content/aboutus/aboutus.component';
import { ContentComponent } from 'app/content/content.component';
import { CweventComponent } from 'app/content/cwevent/cwevent.component';
import { HomeComponent } from 'app/content/home/home.component';
import { LoginComponent } from 'app/login/login.component';
import { LoginService } from 'app/service/login.service';
import { LoadingModule } from 'ngx-loading';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './content/components/components.module';
import { DashboardComponent } from './content/dashboard/dashboard.component';
import { GalleryComponent } from './content/gallery/gallery.component';
import { IconsComponent } from './content/icons/icons.component';
import { MenuComponent } from './content/menu/menu.component';
import { NewsComponent } from './content/news/news.component';
import { NotificationsComponent } from './content/notifications/notifications.component';
import { ParallaxComponent } from './content/parallax/parallax.component';
import { ReservationComponent } from './content/reservation/reservation.component';
import { TableListComponent } from './content/table-list/table-list.component';
import { TypographyComponent } from './content/typography/typography.component';
import { UpgradeComponent } from './content/upgrade/upgrade.component';
import { UserProfileComponent } from './content/user-profile/user-profile.component';
import { FetchService } from './service/fetch-service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    NotificationsComponent,
    UpgradeComponent,
    ContentComponent,
    LoginComponent,
    HomeComponent,
    AboutusComponent,
    MenuComponent,
    GalleryComponent,
    NewsComponent,
    CweventComponent,
    ReservationComponent,
    ParallaxComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    LoadingModule
  ],
  providers: [
    AuthPreventLoginPage,
    AuthGuard,
    LoginService,
    AuthLogout,
    FetchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
