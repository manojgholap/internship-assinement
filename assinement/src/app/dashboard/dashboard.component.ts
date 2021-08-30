import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ChartOptions, ChartType, ChartDataSets} from 'chart.js';
import { Label } from 'ng2-charts';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  res:any
  canceled:any;
  running:any;
  completed:any;
  registered:any;
  documentcount:any;
  chart:any=[];
  resdata:any
  constructor(private router:Router,public http:HttpClient) {

   }

  ngOnInit(): void {
    this.http.get("http://localhost:8000/getcount").subscribe((res:any)=>{
        this.res=res.countdata;
        this.canceled=this.res.canceled;
        this.running=this.res.running;
        this.completed=this.res.completed;
        this.registered=this.res.registered;
        this.documentcount=this.res.documentcount;
  })
  this.http.get("http://localhost:8000/getBarCount").subscribe((res:any)=>{
    this.resdata=res.countdata;
    // console.log(this.resdata);
    var startergy=this.resdata.startergy;
    var startergycompleted=this.resdata.startergycompleted;
    var finance=this.resdata.finance;
    var financecompleted=this.resdata.financecompleted;
    var quality=this.resdata.quality;
    var qualitycompleted=this.resdata.qualitycompleted;
    var maintainance=this.resdata.maintainance;
    var maintainancecompleted=this.resdata.maintainancecompleted;
    var store=this.resdata.store;
    var storecompleted=this.resdata.storecompleted;
    var hr=this.resdata.hr;
    var hrcompleted=this.resdata.hrcompleted;
      //     var canceled=this.res.canceled;
      //   var running=this.res.running;
      // var completed=this.res.completed;
      //   var registered=this.res.registered;
      //   var documentcount=this.res
    //       let labeldata=[];
    //       cdata.forEach((res:any)=>{
    //         let mydata=res;
    //         labeldata.push(mydata);
    //       })
      var chart = new Chart('canvas',{
        type:'bar',
        data:{
          labels:['startergy', 'finance', 'quality', 'maintainance', 'store', 'hr'],
          datasets:[
            {data:[startergy,finance,quality,maintainance,store,hr],label:'project Registered',backgroundColor:"rgb(0, 255, 0);"},
            {data:[startergycompleted,financecompleted,qualitycompleted,maintainancecompleted,storecompleted,hrcompleted],label:'project completed',backgroundColor:"orange"},
          ]},     
})
})
  
}
addproject(){
  this.router.navigate(['/createproject']);
}
listproject(){
  this.router.navigate(['/projectlist']);

}

barChartOptions: ChartOptions = {
  responsive: true,
};
barChartLabels: Label[] = ['startergy', 'finance', 'quality', 'maintainance', 'store', 'hr'];
barChartType: ChartType = 'bar';
barChartLegend = true;
barChartPlugins = [];

barChartData: ChartDataSets[] = [
  { data: [54,20,30,49,50,44],label:"Project Registered "},
  { data: [46,11,18,33,39,35],label:"Project Completed"}
];
}
