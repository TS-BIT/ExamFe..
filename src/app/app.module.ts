import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './components/app/app.component';
import { BooksComponent } from './components/books/books.component';
import { AudiobooksComponent } from './components/audiobooks/audiobooks.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    AudiobooksComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'books', component: BooksComponent },
      { path: 'audiobooks', component: AudiobooksComponent },
      { path: '', component: HomeComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
