import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  res:any
  url='http://localhost:8000/'
  data:any;
  constructor(private http:HttpClient,private router:Router) { }

  private _listner = new Subject<any>();
 public listen ():Observable<any>{
    return this._listner.asObservable()
  }
  public filter(filterby:string){
    this._listner.next(filterby)
  }
 public loginApi(data:object):void{
    this.http.post(this.url+'login',data).subscribe((res)=>{
      this.res=res;
      if(this.res.status==true){
       window.alert('login successfully')
       this.router.navigate(['/dashboard']);
      }
      else{
        window.alert('invalid credentials')
      }
    })
  }

 getFromParent(data:any){
   this.data=data;
}
sendToChild(){
 return this.data;
}
 public createProject(data:any):void{
    this.http.post(this.url+"createproject",data).subscribe((res)=>{
      this.res=res;
      if(this.res.status==true){
       window.alert('project added')
       this.router.navigate(['/dashboard']);
      }
      else{
        window.alert('unable to add new project')
      }
    })
  }
 public updateStatus(data:object):void{
    this.http.post(this.url+"updatestatus",data).subscribe((res)=>{
      this.res=res;
      if(this.res.status==true){
       window.alert('status updated')
       this.router.navigate(['/projectlist']);
       this.filter("project list")
      }
      else{
        window.alert('unable to update status')
      }
    })
  }
}
