import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userName: string = '';
  password: string = '';
  userMessage: any;
  passwordMessage: any
  Apiurl = "http://localhost:8100/";
  // Apiurl = 'https://agile-oasis-83321.herokuapp.com/';
  constructor(private http: HttpClient, private router: Router) {
    this.saveUserInfo();
  }
  public saveUserInfo() {
    let url = window.location.href
    let Url = new URL(url);
    var code = Url.searchParams.get("code")
    if (code) {
      this.http.post(this.Apiurl + "saveUserInfo", { code }).subscribe((res: any) => {
        if (res.status == true) {
          window.localStorage.setItem("userId", res.id);
          this.router.navigate(["/dashboard"]);
        }
        else {
          console.log("err in api ")
        }
      })
    }
    else {
      console.log("no code is found");
    }
  }
  public login() {
    this.http.post(this.Apiurl + "getAuthUrl", "").subscribe((res: any) => {
      let authUrl = res.oauthUrl;
      window.open(authUrl, "_self");
    })
  }

}