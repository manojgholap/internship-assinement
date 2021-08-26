import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ApiService} from '../api.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
Username:any;
Password:any;
usermessage:any
passwordmessage:any
constructor(private http:HttpClient,private ApiService:ApiService){}
login(){
if(!this.Username)
{
 
  this.usermessage=true;
      this.usermessage='enter your username';
      setTimeout(()=>
      {   
        this.usermessage = '';
   }, 2000);
}
else if(!this.Password)
{
  this.passwordmessage=true;
  this.passwordmessage='enter your password'
  setTimeout(()=>
  {   
    this.passwordmessage = '';
},2000)
}
else
{
  var data={
    username:this.Username,
    password:this.Password
  }
  this.ApiService.loginApi(data)
}
  }

}