import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'assinement';
  constructor(public router:Router){}

  ngOnInit(): void {
    const userId= localStorage.getItem("userId");
    if(userId){
      console.log("user is logged in this system",userId);
      this.router.navigate(["/dashboard"])
    }
    else{
      console.log("no user find");
    }
  }
}

