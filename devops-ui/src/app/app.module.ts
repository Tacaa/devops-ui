import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { RightMenuComponent } from './header/right-menu/right-menu.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { AccommodationPageComponent } from './accommodation-page/accommodation-page.component';
import { GalleriaModule } from 'primeng/galleria';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    RightMenuComponent,
    SearchComponent,
    AccommodationPageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, GalleriaModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
