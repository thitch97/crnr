import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchService } from './search.service';
import {HistoryService} from './history.service';
import {MdMenuModule} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HistoryComponent } from './history/history.component';
import { SearchComponent } from './search/search.component';

const appRoutes: Routes = [
  {path: 'history', component: HistoryComponent},
  {path: 'search', component: SearchComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HistoryComponent,
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
