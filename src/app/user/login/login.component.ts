import { Component, OnInit } from '@angular/core';
import { BackendService } from './../../services/backend.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userloggedin: boolean = true;
  error: boolean = false;
  errorMessage: String = "";
  dataLoading: boolean = false;

  constructor(public afAuth: AngularFireAuth, private _backendService : BackendService) { }

  ngOnInit() {
    //this.userloggedin = true;
    this.getAuthStatus();
  }

  login(loginType, formData?) {
    this.dataLoading = true;
    return this._backendService.login(loginType, formData). catch(
      (err) => {
        this.error = true;
        this.errorMessage = err.message;
        console.log(err);
        this.userloggedin = false;
        this.dataLoading = false;
      }
    );
    
  }

  logout(){
    this.dataLoading = true;
    return this._backendService.logout().then((success)=>{
      this.userloggedin = false;
      this.dataLoading = false;
    });

  }

  getAuthStatus(){
    this.dataLoading = true;
    this._backendService.redirectLogin().then(function(result){
      if (result.credential) {
        console.log(result.credential)
        if (result.credential["accessToken"] !=""){
          return this.userloggedin = true;
        }
        this.dataLoading = false;
        //return this.userloggedin = true;
      }
    }).catch(
      (err) => {
        this.error = true;
        this.errorMessage = err.message;
        console.log(err);
        this.userloggedin = false;
        this.dataLoading = false;
      }
    );
    this.dataLoading = false;

  }

}
