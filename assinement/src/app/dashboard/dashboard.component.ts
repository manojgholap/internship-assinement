import { Component,Input,OnInit, EventEmitter,Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as Chart from 'chart.js';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // @Input() parentData:string='';
  url='http://localhost:8000/'
  labels=['startergy', 'finance', 'quality', 'maintainance', 'store', 'hr']
  res:any;
  canceled:any;
  running:any;
  completed:any;
  registered:any;
  documentcount:any;
  chart:any=[];
  resdata:any
  resData:any

  constructor(private router:Router,public http:HttpClient) {
      let password=localStorage.getItem('password');
      let userName=localStorage.getItem('username')
      console.log(userName+" "+password)
   }

 public ngOnInit(): void {
    this.http.get(this.url+"getcount").subscribe((res:any)=>{
        this.res=res.data
        this.canceled=this.res[4];
        this.running=this.res[2];
        this.completed=this.res[1];
        this.registered=this.res[3];
        this.documentcount=this.res[0];
  })
  this.http.get(this.url+'getBarCount').subscribe((res:any)=>{
    this.resdata=res.data
    this.http.get(this.url+'getBarCount1').subscribe((res:any)=>{
      this.resData=res.data
    
     let chart = new Chart('canvas',{
        type:'bar',
        data:{
          labels:this.labels,
          datasets:[
            {data:this.resdata,label:'project Registered',backgroundColor:"rgb(0, 255, 0);"},
            {data:this.resData,label:'project completed',backgroundColor:"orange"},
          ]},     
})
})
}) 
}
}
