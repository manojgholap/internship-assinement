import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.css']
})
export class CreateprojectComponent implements OnInit {
  projectName:string='';
  reason:string='';
  type:string='';
  division:string='';
  category:string='';
  Priority:string='';
  department:string='';
  location:string='';
  startDate:string='';
  endDate:string='';
  constructor(public ApiService:ApiService) { }

  public ngOnInit(): void {
  }
public createproject(){
    if(!this.projectName)
    {
      window.alert("please enter project name");
    }
    else if(!this.reason){
      window.alert("please select reason");
    }
    else if(!this.type){
      window.alert("please select type");
    }
     else if(!this.division){
      window.alert("please select division");
    }
    else if(!this.category){
      window.alert("please select category");
    }
    else if(!this.Priority){
      window.alert("please select priority");
    }
    else if(!this.department){
      window.alert("please select department");
    }
    else if(!this.location){
      window.alert("please select location");
    }
    else if(!this.startDate){
      window.alert("please select startdate");
    }
    else if(!this.endDate){
      window.alert("please select enddate");
    }
    else{

    let data={
    pname:this.projectName,
    reason:this.reason,
    type:this.type,
    division:this.division,
    category:this.category,
    priority:this.Priority,
    department:this.department,
    location:this.location,
    startDate:this.startDate,
    endDate:this.endDate
    }
    this.ApiService.createProject(data);
  }
}
}
