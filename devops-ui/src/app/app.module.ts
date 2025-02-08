import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { RightMenuComponent } from './header/right-menu/right-menu.component';
import { SearchComponent } from './search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccommodationPageComponent } from './accommodation-page/accommodation-page.component';
import { GalleriaModule } from 'primeng/galleria';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import {
  AccountComponent,
  DeleteAccountDialog,
} from './user/account/account.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PersonalReservationsComponent } from './personal-reservations/personal-reservations.component';
import { RequestsComponent } from './requests/requests.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    RightMenuComponent,
    SearchComponent,
    AccommodationPageComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    DeleteAccountDialog,
    StarRatingComponent,
    NotificationsComponent,
    PersonalReservationsComponent,
    RequestsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    GalleriaModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
  ],
  entryComponents: [DeleteAccountDialog],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
