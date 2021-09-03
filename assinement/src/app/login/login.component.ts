import { Component, OnInit,Output,EventEmitter, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // userData="hello from child "
  userName:string='';
  password: string='';
  userMessage: any;
  passwordMessage: any
  constructor(private http: HttpClient, private ApiService: ApiService) { }
 public login() {
    if (!this.userName) {
      this.userMessage = true;
      this.userMessage = 'enter your username';
    }
    else if (!this.password) {
      this.passwordMessage = true;
      this.passwordMessage = 'enter your password'
    }
    else {
     let data = {
        userName: this.userName,
        password: this.password
      }
      localStorage.setItem('username',this.userName);
      localStorage.setItem('password',this.password);
      // this.userData=this.userName
      this.ApiService.loginApi(data)
    }
  }

}