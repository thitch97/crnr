import { Component } from '@angular/core';
import { SearchService } from '../search.service';
import {MdMenuModule} from '@angular/material';
import {MdSidenavModule} from '@angular/material';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';



@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  
	items : FirebaseListObservable<any[]>;
	user: Observable<firebase.User>;

	constructor(db: AngularFireDatabase, public afAuth: AngularFireAuth){
		this.user = afAuth.authState;
	}

	//logs the user in with Google
	loginG(){
		this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
	}

	//logs the user in with Facebook
	loginF(){
		this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
	}

	logout(){
		this.afAuth.auth.signOut();
	}

}
