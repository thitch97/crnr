import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchService } from './search.service';
import {HistoryService} from './history.service';
import { ResultService } from './result.service'; 
import {MdMenuModule} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import{ FlexLayoutModule } from '@angular/flex-layout';




import { AppComponent } from './app.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { ResultComponent } from './result/result.component';

const appRoutes: Routes = [
  {path: 'history', component: HistoryComponent},
  {path: '', component: HomeComponent},
  {path: 'results', component: ResultComponent}
 ]

@NgModule({
  declarations: [
    AppComponent,
    HistoryComponent,
    HomeComponent,
    ResultComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    FlexLayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MdInputModule,
    HttpModule,
    MdMenuModule,
    MdButtonModule,

  ],
  providers: [SearchService, HistoryService, ResultService],
  bootstrap: [AppComponent]
})
export class AppModule { }
