import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { take, map } from 'rxjs/operators'; 
import { Observable } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public afAuth: AngularFireAuth, private router: Router) { }

  canActivate(): Observable<boolean> {
    return Observable.from(this.afAuth.authState)
    .take(1)
    .map(state => !!state)
    .do(authenticated => {
      if 
      (!authenticated)
      this.router.navigate(['/login']);
    })
  }
}
