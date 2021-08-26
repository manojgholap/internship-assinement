import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.css']
})
export class ProjectlistComponent implements OnInit {
  resdata:any
  constructor(private http:HttpClient,public apiService:ApiService) { }

  ngOnInit(): void {
    this.http.get("http://localhost:8000/projectlist").subscribe((res)=>{
      this.resdata=res
      console.log(this.resdata);
      this.resdata=this.resdata.data
    })
  }
  start(id:any){
      var data={
        id:id,
        status:'running'
      }
      this.apiService.updatestatus(data)
  }
  close(id:any){
    var data={
      id:id,
      status:'completed'
    }
    this.apiService.updatestatus(data)
}
cancel(id:any){
  var data={
    id:id,
    status:'canceled'
  }
  this.apiService.updatestatus(data)
}
 setDate(date:any) 
  {
      var time = (new Date(date).getDate()) + "/" + (new Date(date).getMonth() + 1) + '/' + new Date(date).getFullYear()
      // console.log("scoper time", date)
      return time;
  }
}
