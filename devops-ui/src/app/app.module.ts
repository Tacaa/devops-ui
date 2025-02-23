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
import { StarRatingComponent } from './star-rating/star-rating.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PersonalReservationsComponent } from './personal-reservations/personal-reservations.component';
import { RequestsComponent } from './requests/requests.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateAccommodationComponent } from './create-accommodation/create-accommodation.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { HostReviewDialogComponent } from './dialogs/host-review-dialog/host-review-dialog.component';
import { AccommodationReviewDialogComponent } from './dialogs/accommodation-review-dialog/accommodation-review-dialog.component'; // Required for <mat-option>

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
    CreateAccommodationComponent,
    HostReviewDialogComponent,
    AccommodationReviewDialogComponent,
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
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatOptionModule,
    BrowserModule,
  ],
  entryComponents: [DeleteAccountDialog],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
