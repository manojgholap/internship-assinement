import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

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
