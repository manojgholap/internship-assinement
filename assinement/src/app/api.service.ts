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
  constructor(private http:HttpClient,private router:Router) { }

  private _listner = new Subject<any>();
  listen ():Observable<any>{
    return this._listner.asObservable()
  }
  filter(filterby:string){
    this._listner.next(filterby)
  }

  loginApi(data:any){
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
  createproject(data:any){
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
  getcount(data:any){

  }
  updatestatus(data:any){
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
