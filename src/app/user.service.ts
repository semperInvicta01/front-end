import { Injectable} from '@angular/core';
import {company,companies,branchCompany} from './data-model';
import { Observable ,  of ,Subject, asapScheduler, pipe, from, interval, merge, fromEvent } from 'rxjs';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { SubBranchComponent } from './sub-branch/sub-branch.component';
import { MatDialog } from '@angular/material/dialog';
import { TestComponent } from './test/test.component';


@Injectable()
export class UserService {

  http:HttpClient;
  delayMs = 500;
  numberOfBranches = 0;
  public mainBranchLat:number=39.8282;
  public mainBranchLng:number=-98.5795;
  index:number=0;
 
  public mainBranchLocation:String = '';
  public isMainBranchPage:boolean = false;
  constructor(http:HttpClient,public dialog:MatDialog){
      this.http = http;
      
  }

  
  tempLat:number=0;
  tempLng:number=0;
  public isShown:boolean = true;
  public ndx:number = 0;

  locationData:{lat:number,lng:number,ndx:number}[]=[];

  

  storeLocation(index:number){
    this.ndx = index;
     console.log(index);
     this.isShown = false;
     this.locationData.push({"lat":this.tempLat,"lng":this.tempLng,'ndx':index});
     this.openDialog();
  }
 

  updateCompany(co:company):Observable<company>{
        const oldCo = companies;
        const newCo = Object.assign(companies,co);
        return of(newCo);
  }

  tempMemory:branchCompany;
  
  storeData(branch:branchCompany){
    
    this.tempMemory = branch; 
    this.tempMemory.lat = this.mainBranchLat;
    this.tempMemory.lng = this.mainBranchLng;
    let varjson = JSON.stringify(this.tempMemory);
    
    let comp = JSON.stringify(companies);
    let obj = JSON.parse(varjson);
    
    let obj2 = JSON.parse(comp);
    
    obj2['branches'][0] = obj;
    varjson = JSON.stringify(obj2);
    this.updateCompany(JSON.parse(varjson));
    console.log(companies);
  }

  storeDataSB(branch:branchCompany){
    
    this.locationData.forEach((value)=>{
      branch['items'][value.ndx].lat = value.lat;
      branch['items'][value.ndx].lng = value.lng;
    });
    let comp = JSON.stringify(companies);
    let obj2 = JSON.parse(comp);

    for(let i=0;i<branch['items'].length;i++){
      obj2['branches'].push(branch['items'][i]);
    }
    
    let varjson = JSON.stringify(obj2);
    this.updateCompany(JSON.parse(varjson));
    console.log(companies);
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  userUrl = 'http://localhost:8012/api/outlet/signup';
  addCompany(co:company):Observable<company>{
    return this.http.post<company>(this.userUrl,co,this.httpOptions);
  }
  
  /////////////////////////WORK ON THISSSSSS
  close(){
    this.isShown=true;
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(TestComponent, {
      width: '250px',
      height:'350',
      data:{ndx:+(this.ndx)+ 1}
    });
  }

  reset():void{
    console.log(companies['branches']);
    companies['branches'] = [
      {branchName:'',officeAddress:'',lat:0,lng:0,branchType:true,fullName:'',contactPersonNumber:0,contactPersonEmailAd:''}
    ];
    companies['companyName']='';
    companies['companyEmail']='';
    companies['dateSubmitted']='';
    companies['username']='';
    companies['status']='';
    console.log(companies);
  }
}
