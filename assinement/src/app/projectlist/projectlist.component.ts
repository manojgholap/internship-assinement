import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.css']
})
export class ProjectlistComponent implements OnInit {
  userForm:FormGroup;
  listData:any
  resdata:any
  pname:any;
  category:any;
  department:any;
  type:any;
  location:any;
  priority:any;
  reason:any;
  startDate:any;
  endDate:any;
  status:any
  p:number=1;
  reverse:boolean=false;
  url="http://localhost:8000/"

  constructor(private http:HttpClient,public apiService:ApiService,private fb:FormBuilder) {
    this.listData=[]; 
    this.userForm = this.fb.group({
      key:['',Validators.required],
      value:['',Validators.required],
    })
  }

  addItem(){
    this.listData.push(this.userForm.value);
    this.userForm.reset()
  }
  reset(){
    this.userForm.reset()
  }
  removeItem(element:any){
    this.listData.forEach((value:any,index:any)=>{
      if(value==element){
        this.listData.splice(index,1);

      }
    })
  }
 public ngOnInit(): void {
    this.http.get(this.url+"projectlist").subscribe((res)=>{
      this.resdata=res
      this.resdata=this.resdata.data
    })
  this.apiService.listen().subscribe((res:any)=>{
      this.ProjectList();
  })
}

public ProjectList(){
  this.http.get(this.url+"projectlist").subscribe((res)=>{
    this.resdata=res
    this.resdata=this.resdata.data
  })
}

public search():void{
  if(this.pname==""){
    this.ngOnInit();
  }
  else{
    this.resdata=this.resdata.filter((res:any)=>{
      return res.pname.toLocaleLowerCase().startsWith(this.pname.toLocaleLowerCase());
    });   
  }  
}

  public start(id:object):void{
      var data={
        id:id,
        status:'running'
      }
      this.apiService.updateStatus(data)
  }
  public close(id:object):void{
    var data={
      id:id,
      status:'completed'
    }
    this.apiService.updateStatus(data)
}
public cancel(id:object):void{
  var data={
    id:id,
    status:'canceled'
  }
  this.apiService.updateStatus(data)
}
 public setDate(date:any) 
  {
      var time = (new Date(date).getDate()) + "/" + (new Date(date).getMonth() + 1) + '/' + new Date(date).getFullYear()
      return time;
  }
}
