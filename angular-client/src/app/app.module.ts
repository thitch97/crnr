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
import {NgxPaginationModule} from 'ngx-pagination';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';




import { AppComponent } from './app.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { ResultComponent } from './result/result.component';
import { LoginComponent } from './login/login.component';


const appRoutes: Routes = [
  {path: 'history', component: HistoryComponent},
  {path: '', component: HomeComponent},
  {path: 'results', component: ResultComponent},
  {path: 'login', component: LoginComponent}
 ]

@NgModule({
  declarations: [
    AppComponent,
    HistoryComponent,
    HomeComponent,
    ResultComponent,
    LoginComponent
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
    NgxPaginationModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, 
    AngularFireAuthModule, 
  ],
  providers: [SearchService, HistoryService, ResultService],
  bootstrap: [AppComponent]
})
export class AppModule { }
