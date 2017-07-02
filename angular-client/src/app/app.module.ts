import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchService } from './search.service';
<<<<<<< HEAD
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';

const appRoutes: Routes = [
  {path: 'search', component: SearchComponent},

=======
import {HistoryService} from './history.service';
import {MdMenuModule} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HistoryComponent } from './history/history.component';
import { SearchComponent } from './search/search.component';

const appRoutes: Routes = [
  {path: 'history', component: HistoryComponent},
  {path: 'search', component: SearchComponent}
>>>>>>> 7fe01aa6fd9f32e64cdbda237303ea3827abbb90
]

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
=======
    HistoryComponent,
>>>>>>> 7fe01aa6fd9f32e64cdbda237303ea3827abbb90
    SearchComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MdInputModule,
    HttpModule,
    MdMenuModule
  ],
  providers: [SearchService, HistoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
