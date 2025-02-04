import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccommodationPageComponent } from './accommodation-page/accommodation-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'accommodation/:id', component: AccommodationPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
