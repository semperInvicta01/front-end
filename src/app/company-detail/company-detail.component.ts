import { Component, OnInit,AfterViewInit,ViewChild,Input,NgZone, AfterContentChecked,OnChanges,HostListener,ElementRef} from '@angular/core';
import { GMapComponent } from '../g-map/g-map.component';
// import { } from 'googlemaps';
import { AgmCoreModule,MarkerManager,MapsAPILoader } from '@agm/core';
import { FormControl,FormGroup,FormBuilder,Validators,FormArray} from '@angular/forms';
import {companies} from '../data-model';
import { UserService } from '../user.service';
import {ScrollEvent} from 'ngx-scroll-event';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { keyframes} from '@angular/animations';


@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css'],
  animations:[
    trigger('aState',[
      state('inactive',style({
        transform:'translateX(-500px)'
      })),
      state('active',style({
        transform:'translateX(10px)'
      })),
      transition('inactive => active',[
        animate(300,keyframes([
          style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
          style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
        ]))
      ]),
      transition('active => inactive',[
        animate(300,keyframes([
          style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
          style({opacity: 1, transform: 'translateX(-15px)', offset: 0.7}),
          style({opacity: 0, transform: 'translateX(100%)',  offset: 1.0})
        ]))
      ])
    ]),

  ],

})
export class CompanyDetailComponent implements OnInit,OnChanges {

  
  public title: string = 'My first AGM project';
  public lat: number=39.8282;
  public lng: number=-98.5795;
  public iU:string = "C:/Users/ojt2/sign-up/src/assets/marker.png";
  public lab:string = "I";
  public bool:boolean = true;
  public state = 'active';
  public zoom:number;
  public num1:number = 10;
  public num2:number = 10;
  public tempBool:boolean = false;
  
  @ViewChild('search')
  public searchElementRef:ElementRef;

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    console.log("Processing beforeunload...");
    event.returnValue = false; 
 }

//  @HostListener('window:popstate', ['$event'])
//  onPopState(event) {
//   //  this.router.navigate(['/company']);
//  } 

  companyDetailForm:FormGroup;
  constructor(private fb:FormBuilder,private user:UserService,private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,private router:Router) { 
      
      
  this.companyDetailForm = this.fb.group({
    branchName:[companies.branches[0].branchName,Validators.required],
    officeAddress:[companies.branches[0].officeAddress,Validators.required],
    lat:[this.lat],
    lng:[this.lng],
    Main:[true],
    fullName:[companies.branches[0].fullName,Validators.required],
    contactPersonNumber:[companies.branches[0].contactPersonNumber,Validators.required],
    contactPersonEmailAd:[companies.branches[0].contactPersonEmailAd,Validators.required],
    // gmap:['',Validators.required]
  });
   
  }
 
 

  ngOnChanges(){
    this.rebuildForm();
  }

  rebuildForm(){
    this.companyDetailForm.reset({
      branchName:'',
      officeAddress:'',
      lat:this.lat,
      lng:this.lng,
      Main:true,
      fullName:'',
      contactPersonNumber:'',
      contactPersonEmailAd:'',
      gmap:''
    });
  }
  
  get officeAddress(){ return this.companyDetailForm.get('officeAddress');}

  get Main(){return this.companyDetailForm.get('Main');}

  get fullName(){return this.companyDetailForm.get('fullName');}

  get contactPersonNumber(){return this.companyDetailForm.get('contactPersonNumber'); }

  get contactPersonEmailAd(){return this.companyDetailForm.get('contactPersonEmailAd');}

  get branchName(){return this.companyDetailForm.get('branchName');}

  // get gmap(){return this.companyDetailForm.get('gmap');}
  
  public handleScroll(event:ScrollEvent){

    if(event.isReachingBottom){
      this.toggleState();
    }
    if(event.isReachingTop){
      this.toggleState();
    }
  }
  
  public toggleState(){
    this.state = this.state === 'active' ? 'inactive' : 'active';
  }
  ngOnInit() {
    this.user.isMainBranchPage = true;
    console.log("SET TO TRUE:"+this.user.isMainBranchPage);
  }
 
  routeGuard():void{
    this.tempBool = confirm("Are you sure you want to go back? Work up to now will not be saved.");

    if(this.tempBool){
        this.router.navigate(['/company']);
    }
  }

  canDeactivate():Observable<boolean> | boolean{
    
       return confirm("Data will not be saved when you nagivate to another page,is it OK");
  }

  validateForm(){
    
    if(this.companyDetailForm.invalid){
      console.log("GOT IN");
      this.companyDetailForm.get('branchName').markAsTouched();
      this.companyDetailForm.get('officeAddress').markAsTouched();
      this.companyDetailForm.get('fullName').markAsTouched();
      this.companyDetailForm.get('contactPersonNumber').markAsTouched();
      this.companyDetailForm.get('contactPersonEmailAd').markAsTouched();
     
    }else{
      this.user.storeData(this.companyDetailForm.value);
      this.router.navigate(['/branchQ']);
    }
  }
  

}
