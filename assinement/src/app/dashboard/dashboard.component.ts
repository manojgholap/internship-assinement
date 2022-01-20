import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios'
import { Router } from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public editorOptions: JsonEditorOptions;
  @ViewChild(JsonEditorComponent, { static: false })
  data: any;
  paramForm: FormGroup;
  bodyForm: FormGroup;
  formdataForm: FormGroup;
  headerForm: FormGroup; 
  listData: any;
  jsondata: any;
  url: any;
  type:string='';
  method: any;
  testCases: any;
  username: any;
  // Apiurl = 'https://agile-oasis-83321.herokuapp.com/';
  Apiurl = "http://localhost:8100/"
  resData: any
  resBody: any
  resHeaders: any
  resStatus: any
  paramkey: any;
  paramvalue: any;
  params: any = {};
  body: any = {};
  headers: any = {"Content-Type":"application/x-www-form-urlencoded"};

  toggleDiv: any = "d-block";
  toggleDiv1: any = "d-none";

  // request body div
  toggleDivBody: any = "d-block";
  toggleDivParams: any = "d-none";
  toggleDivTests: any = "d-none"
  toggleDivHeaders: any = "d-none"


  toggleStatus: any = "t-active";
  toggleStatus1: any = "inactive";

  // request body buttons
  toggleStatusBody: any = "p-active";
  toggleStatusParams: any = "inactive";
  toggleStatusTests: any = "inactive"
  toggleStatusHeaders: any = "inactive"

  // body buttons and div
  formdata: any = "inactive";
  urlencoded: any = "d-active";
  raw: any = "inactive";
  binary: any = "inactive"

  formDataDiv: any = "d-none";
  urlEncodedDiv: any = "d-block";
  rawDiv: any = "d-none";
  binaryDiv = "d-none";




  // response body div
  DivBody: any = "d-block";
  DivHeader: any = "d-none";
  DivTestResult: any = "d-none"

  // response body button
  StatusBody: any = "p-active";
  StatusHeader: any = "inactive";
  StatusTestResult: any = "inactive"

  textarea: any;
  paramData: any;
  bodyData: any;
  formdataData: any;
  headerData: any;



  constructor(private ApiService: ApiService, private router: Router, private fb: FormBuilder, public http: HttpClient, public iziToast: Ng2IzitoastService) {
    this.isLoggedIn();
    this.editorOptions = new JsonEditorOptions()
    this.editorOptions.mode = 'text';
    this.editorOptions.mainMenuBar = false
    this.paramData = [];
    this.bodyData = [];
    this.headerData = [];
    this.formdataData = []
    this.paramForm = this.fb.group({
      key: ['', Validators.required],
      value: ['', Validators.required],
    })
    this.bodyForm = this.fb.group({
      key: ['', Validators.required],
      value: ['', Validators.required],
    })
    this.headerForm = this.fb.group({
      key: ['', Validators.required],
      value: ['', Validators.required],
    })
    this.formdataForm = this.fb.group({
      key: ['', Validators.required],
     value:['', Validators.required]
    })
  }

  // check user is previously logged in or not
  isLoggedIn() {
    const userId = localStorage.getItem("userId");
    if (userId) {
      console.log("user is logged in this system", userId);
      this.getAll();
      this.getUserInfo();
    }
    else {
      console.log("no user find");
      // window.alert("You are not logged in please log in")
      window.open("/login", "_self");
    }
  }
  // get current user information
  getUserInfo() {
    const userId = window.localStorage.getItem("userId");
    this.http.post(this.Apiurl + "getUserById", { userId }).subscribe((res: any) => {
      const userInfo = res.userInfo;
      this.username = userInfo.name;
    })
  }

  // logout the user
  logout() {
    var confirm = window.confirm("Are u sure want to Log Out");
    if (confirm == true) {
      const isUserIdDeleted = localStorage.removeItem("userId");
      console.log(isUserIdDeleted);
      this.router.navigate(["/login"]);
    } else {
      console.log("aborted by user");
    }
  }
  // param form
  addParamItem() {
    this.paramData.push(this.paramForm.value);
    var key = this.paramForm.value.key;
    var value = this.paramForm.value.value
    this.params[key] = value;
    this.paramForm.reset();
  }
  paramReset() {
    this.paramForm.reset()
  }
  removeParamItem(element: any) {
    this.paramData.forEach((value: any, index: any) => {
      if (value == element) {
        delete this.params[`${value.key}`]
        console.log(this.params);
        this.paramData.splice(index, 1);
      }
    })
  }
  // body form
  addBodyItem() {
    this.bodyData.push(this.bodyForm.value);
    var key = this.bodyForm.value.key;
    var value = this.bodyForm.value.value
    this.body[key] = value;
    this.bodyForm.reset();
  }
  bodyReset() {
    this.bodyForm.reset()
  }
  removeBodyItem(element: any) {
    this.bodyData.forEach((value: any, index: any) => {
      if (value == element) {
        delete this.body[`${value.key}`]
        console.log(this.body);
        this.bodyData.splice(index, 1);
      }
    })
  }
  // headers form
  addHeaderItem() {
    this.headerData.push(this.headerForm.value);
    var key = this.headerForm.value.key;
    var value = this.headerForm.value.value
    this.headers[key] = value;
    this.headerForm.reset();
  }
  headerReset() {
    this.headerForm.reset()
  }
  removeHeaderItem(element: any) {
    console.log(this.headerData);
    
    this.headerData.forEach((value: any, index: any) => {
      if (value == element) {
        delete this.headers[`${value.key}`]
        console.log(this.headers);
        this.headerData.splice(index, 1);
      }
    })
  }

  // form data functions
  addFormdataItem() {
    this.bodyData.push(this.formdataForm.value);
    var key = this.formdataForm.value.key;
    var value = this.formdataForm.value.value
    this.body[key] = value;
    this.formdataForm.reset();
  }
  formdataReset() {
    this.formdataForm.reset()
  }
  removefromdataItem(element: any) {
    this.formdataData.forEach((value: any, index: any) => {
      if (value == element) {
        delete this.body[`${value.key}`]
        console.log(this.headers);
        this.bodyData.splice(index, 1);
      }
    })
  }

  public async getAll() {
    const id = window.localStorage.getItem("userId")
    this.http.post(this.Apiurl + "getAll",{id}).subscribe((res) => {
      this.data = res;
      this.data = this.data.userDetails
      console.log(this.data);
    })
  }
  public ngOnInit(): void {

  }
  public jsonData(): void {
    console.log(this.jsondata)
    this.body = this.jsondata
    console.log(this.body);
  }

  public async SetValue(item: any) {
    console.log(item);

    this.url = item.data.url
    this.method = item.data.method;
    // this.bodyData =[]= item.data.body;
    // this.headerData =[]= item.data.headers;
    // this.paramData= []=item.data.params;
  }

  public async deleteAll() {
    var confirm = window.confirm("are u sure want to delete all history");
    var data = {
      id:window.localStorage.getItem("userId")
    }
    if (confirm == true) {
      this.http.post(this.Apiurl + "deleteAll", data).subscribe((res) => {
        console.log(res)
        this.getAll()
      })
    }
    else {
      console.log("cancelled");
    }
  }
  public async deleteOne(id: String) {
    var data = {
      id: id
    }
    this.http.post(this.Apiurl + "deleteOne", data).subscribe((res) => {
      console.log(res)
      this.getAll()
    })
  }
  public async History() {
    this.toggleDiv1 = "d-none";
    this.toggleDiv = "d-block";
    this.toggleStatus = "t-active";
    this.toggleStatus1 = "inactive";
  }

  public async Collection() {
    this.toggleDiv = "d-none";
    this.toggleDiv1 = "d-block";
    this.toggleStatus = "inactive";
    this.toggleStatus1 = "t-active";

  }
  //  request body functions
  public showBodyDiv() {
    this.toggleDivParams = "d-none";
    this.toggleDivTests = "d-none"
    this.toggleDivBody = "d-block";
    this.toggleStatusBody = "p-active";
    this.toggleStatusParams = "inactive";
    this.toggleStatusTests = "inactive";
    this.toggleStatusHeaders = "inactive";
    this.toggleDivHeaders = "d-none";
    if (this.method.match(/get/gi)) {
      this.toggleStatusBody = "d-none"
      this.toggleDivBody = "d-none"
    }
  }
  public showHeadersDiv() {
    this.toggleDivParams = "d-none";
    this.toggleDivTests = "d-none"
    this.toggleDivBody = "d-none";
    this.toggleStatusBody = "inactive";
    this.toggleStatusParams = "inactive";
    this.toggleStatusTests = "inactive";
    this.toggleStatusHeaders = "p-active";
    this.toggleDivHeaders = "d-block";
    if (this.method.match(/get/gi)) {
      this.toggleStatusBody = "d-none"
      this.toggleDivBody = "d-none"
    }
  }
  public showParamsDiv() {
    this.toggleDivTests = "d-none";
    this.toggleDivBody = "d-none";
    this.toggleDivParams = "d-block";
    this.toggleStatusBody = "inactive";
    this.toggleStatusParams = "p-active";
    this.toggleStatusTests = "inactive"
    this.toggleStatusHeaders = "inactive";
    this.toggleDivHeaders = "d-none";
    if (this.method.match(/get/gi)) {
      this.toggleStatusBody = "d-none"
      this.toggleDivBody = "d-none"
    }
  }
  public showTestsDiv() {
    this.toggleDivTests = "d-block";
    this.toggleDivBody = "d-none";
    this.toggleDivParams = "d-none";
    this.toggleStatusBody = "inactive";
    this.toggleStatusParams = "inactive";
    this.toggleStatusTests = "p-active"
    this.toggleStatusHeaders = "inactive";
    this.toggleDivHeaders = "d-none";
    if (this.method.match(/get/gi)) {
      this.toggleStatusBody = "d-none"
      this.toggleDivBody = "d-none"
    }
  }

  // body options
  formData() {
    this.formDataDiv = "d-block";
    this.formdata = "d-active";
    this.urlEncodedDiv = "d-none";
    this.urlencoded = "inactive";
    this.rawDiv = "d-none";
    this.raw = "inactive";
    this.binaryDiv = "d-none";
    this.binary = "inactive";
    this.bodyData = [];
    var key = "Content-Type";
    var value = "multipart/form-data"
    this.headers[key] = value;
  }
  urlEncoded() {
    this.formDataDiv = "d-none";
    this.formdata = "inactive";
    this.urlEncodedDiv = "d-block";
    this.urlencoded = "d-active";
    this.rawDiv = "d-none";
    this.raw = "inactive";
    this.binaryDiv = "d-none";
    this.binary = "inactive";
    this.bodyData = [];
    var key = "Content-Type";
    var value = "application/x-www-form-urlencoded"
    this.headers[key] = value;
  }
  Raw() {
    this.formDataDiv = "d-none";
    this.formdata = "inactive";
    this.urlEncodedDiv = "d-none";
    this.urlencoded = "inactive";
    this.rawDiv = "d-block";
    this.raw = "d-active";
    this.binaryDiv = "d-none";
    this.binary = "inactive";
    this.bodyData = [];
    var key = "Content-Type";
    var value = "application/json"
    this.headers[key] = value;
  }
  Binary() {
    this.formDataDiv = "d-none";
    this.formdata = "inactive";
    this.urlEncodedDiv = "d-none";
    this.urlencoded = "inactive";
    this.rawDiv = "d-none";
    this.raw = "inactive";
    this.binaryDiv = "d-block";
    this.binary = "d-active";
    this.bodyData = [];
  }


  // response body functions

  public showResBodyDiv() {
    this.DivHeader = "d-none";
    this.DivTestResult = "d-none"
    this.DivBody = "d-block";
    this.StatusBody = "p-active";
    this.StatusHeader = "inactive";
    this.StatusTestResult = "inactive"
  }
  public showResHeaderDiv() {
    this.DivHeader = "d-block";
    this.DivTestResult = "d-none"
    this.DivBody = "d-none";
    this.StatusBody = "inactive";
    this.StatusHeader = "p-active";
    this.StatusTestResult = "inactive"
  }
  public showResTestResultDiv() {
    this.DivHeader = "d-none";
    this.DivTestResult = "d-block"
    this.DivBody = "d-none";
    this.StatusBody = "inactive";
    this.StatusHeader = "inactive";
    this.StatusTestResult = "p-active"
  }

  public async send() {

    if (!this.url) {
      this.iziToast.show({ title: "please enter your api endpoint", position: "topRight" });
    }
    else if (!this.method) {
      this.iziToast.show({ title: "please select request method", position: "topRight" });
    }
    else {
      axios({
        method: this.method,
        url: this.url,
        data:this.body,
        params:this.params,
        headers:this.headers,
      }).then((res) => {
        console.log(res);
        this.resData = res;
        // this.resData = JSON.parse(this.resData.data);
        console.log(this.resData);
        this.resBody = this.resData.data;
        this.resHeaders = this.resData.headers;
        this.resStatus = this.resData.status
      }).catch((err) => {
        console.log(err);
        this.resBody = this.resData.message;
        this.resHeaders = this.resData.config.headers;
        this.resStatus = this.resData.status;
      })
      const userId = window.localStorage.getItem("userId")
      console.log(userId);
      let data = {
        url: this.url,
        method: this.method,
        params: this.params,
        body: this.body,
        headers: this.headers,
        userId:userId
      }
      this.http.post(this.Apiurl + "request", data).subscribe((res) => {
        this.resData = res;
        console.log(this.resData);
        this.getAll()
      })
    }
  }

  checkRequestMethodType(method: any) {
    console.log(method);
    
    if (method.match(/get/gi)) {
      this.toggleStatusBody = "d-none"
      this.toggleDivBody = "d-none"
    } else {
      this.toggleDivBody = "d-block"
      this.toggleStatusBody = "p-active"
    }
  }
  checkFormDataType(type:any){
    console.log(type);
  }
}
