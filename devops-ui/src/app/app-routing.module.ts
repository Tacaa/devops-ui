import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccommodationPageComponent } from './accommodation-page/accommodation-page.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { AccountComponent } from './user/account/account.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PersonalReservationsComponent } from './personal-reservations/personal-reservations.component';
import { RequestsComponent } from './requests/requests.component';
import { CreateAccommodationComponent } from './create-accommodation/create-accommodation.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: HomeComponent },
  { path: 'accommodation/:id', component: AccommodationPageComponent },
  { path: 'registration', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'account/:id', component: AccountComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'reservations', component: PersonalReservationsComponent },
  { path: 'requests', component: RequestsComponent },
  { path: 'create_accommodation', component: CreateAccommodationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
