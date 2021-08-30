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
  sortbyvalue:any
  isDesc:any
  property:any
  // key:any
  constructor(private http:HttpClient,public apiService:ApiService) { }

  ngOnInit(): void {
    this.http.get("http://localhost:8000/projectlist").subscribe((res)=>{
      this.resdata=res
      console.log(this.resdata);
      this.resdata=this.resdata.data
    })
  this.apiService.listen().subscribe((res:any)=>{
    console.log(res);
    this.Projectlist();
  })
}

Projectlist(){
  this.http.get("http://localhost:8000/projectlist").subscribe((res)=>{
    this.resdata=res
    console.log(this.resdata);
    this.resdata=this.resdata.data
  })
}
key: string ='pname';
reverse:boolean=false;
sort(key:any){
  this.key=key;
  this.reverse=!this.reverse;
} 
// sortData(){
//   // console.log(this.resdata)
//   console.log(this.resdata);
//   if(this.sortbyvalue=="pname")
//   {
//     var array=this.resdata
//      const sortarray= array.sort((a:any,b:any)=>{   
      
//       }) 
//       console.log(sortarray)
//       // this.resdata=sortarray;
//     }
//     else if(this.sortbyvalue=="department")
//     {
//       var array=this.resdata
//      const sortarray =array.sort((a:any,b:any)=>{   
//           a.department.localeCompare(b.department);
//         }) 
//       console.log(sortarray)
//         this.resdata=sortarray;
//       }
//       else(this.sortbyvalue=="category")
//       {
//         var array=this.resdata
//         const sortarray= array.sort((a:any,b:any)=>{   
//              a.category - b.category 
//           }) 
//       console.log(sortarray)
//           this.resdata=sortarray;
//         }
// }
sortdata(property:any){
  this.isDesc=!this.isDesc
   let direction = this.isDesc ? 1: -1;
   this.resdata.sort((a:any,b:any)=>{
     if(a[property] < b[property]){
       return -1 * direction;
     }
     else if(a[property] < b[property]){
        return 1 * direction;
     }
     else{
       return 0;
     }
   })
}

search(){
  if(this.pname==""){
    this.ngOnInit();
  }
  else{
    this.resdata=this.resdata.filter((res:any)=>{
      return res.pname.toLocaleLowerCase().match(this.pname.toLocaleLowerCase());
    });   
  }  
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
