import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
username:any;
password:any;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }
  login(){
    var userdata={
     username: this.username,
     password: this.password
    }
    console.log(userdata);
    this.http.get('http://localhost:8000/createproject').subscribe(res=>{
      console.log(res);
    })
  }
}
