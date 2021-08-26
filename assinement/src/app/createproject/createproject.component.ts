import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-createproject',
  templateUrl: './createproject.component.html',
  styleUrls: ['./createproject.component.css']
})
export class CreateprojectComponent implements OnInit {
  projectname:any;
  reason:any;
  type:any;
  division:any;
  category:any;
  Priority:any;
  department:any;
  location:any;
  startdate:any;
  enddate:any;
  constructor(public ApiService:ApiService) { }

  ngOnInit(): void {
  }
  createproject(){
    if(!this.projectname)
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
    else if(!this.startdate){
      window.alert("please select startdate");
    }
    else if(!this.enddate){
      window.alert("please select enddate");
    }
    else{
    
   var data={
    pname:this.projectname,
    reason:this.reason,
    type:this.type,
    division:this.division,
    category:this.category,
    priority:this.Priority,
    department:this.department,
    location:this.location,
    startdate:this.startdate,
    enddate:this.enddate
    }
    this.ApiService.createproject(data);
  }
}
}
