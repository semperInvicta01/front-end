import { Component, OnInit,AfterContentInit,AfterViewChecked,AfterViewInit,ViewChild,Input,NgZone, AfterContentChecked,OnChanges,HostListener,ElementRef} from '@angular/core';
import { GMapComponent } from '../g-map/g-map.component';
import { } from 'googlemaps';
import { AgmCoreModule,MarkerManager,MapsAPILoader } from '@agm/core';
import { FormControl,FormGroup,FormBuilder,Validators,FormArray, AbstractControl} from '@angular/forms';
import {companies} from '../data-model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

import { ScrollEvent } from 'ngx-scroll-event'; 
@Component({
  selector: 'app-sub-branch',
  templateUrl: './sub-branch.component.html',
  styleUrls: ['./sub-branch.component.css'],
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
  ]
})


export class SubBranchComponent implements OnInit,AfterViewChecked {
 
  public title: string = 'My first AGM project';
  public lat: number=39.8282;
  public lng: number=-98.5795;
  public iU:string = "C:/Users/ojt2/sign-up/src/assets/marker.png";
  public lab:string = "I";
  public bool:boolean = true;
  public state='inactive';
  public zoom:number;
  public tempBool;
  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    console.log("Processing beforeunload...");
    event.returnValue = false; 
 }
  
  constructor(private router:Router,private fb:FormBuilder,private user:UserService,private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { 

  }

  ngAfterViewChecked(){
    // this.state='active';
  }

  toggleState() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
  }

  companyDetailFormSB:FormGroup;
  items:any;

  removeBranch(index){ 
    this.items.removeAt(index);
    this.user.locationData.splice(index,1);
  }
 
  createItem():FormGroup{
    return this.fb.group({
      branchName:['',Validators.required],
      officeAddress:['',Validators.required],
      lat:[this.lat],
      lng:[this.lng],
      Main:[false],
      fullName:['',Validators.required],
      contactPersonNumber:[0,Validators.required],
      contactPersonEmailAd:['',Validators.required],
    });
  }

  get officeAddress(){ return this.companyDetailFormSB.get('officeAddress');}

  get Main(){return this.companyDetailFormSB.get('Main');}

  get fullName(){return this.companyDetailFormSB.get('fullName');}

  get contactPersonNumber(){return this.companyDetailFormSB.get('contactPersonNumber'); }

  get contactPersonEmailAd(){return this.companyDetailFormSB.get('contactPersonEmailAd');}

  get branchName(){return this.companyDetailFormSB.get('branchName');}
  
  addItems(iterations:number):void{
    this.items = this.companyDetailFormSB.get('items') as FormArray;
    let i=0;
    for(i=0;i<iterations;i++){
      // 
      this.items.push(this.createItem());
    }
    this.removeBranch(i-1);
  }
  
  
  ngOnInit() {
    // this.state='inactive';
    this.user.isMainBranchPage = false;
    this.companyDetailFormSB = this.fb.group({
      items:this.fb.array([this.createItem()])
    });

    this.addItems(this.user.numberOfBranches);

    this.zoom = 4;
    this.lat = 39.8282;
    this.lng = -98.5795;

    this.setCurrentPosition();

  }

  public handleScroll(event: ScrollEvent) {
    
    if (event.isReachingBottom) {
      this.state='active';
      console.log(`the user is reaching the bottom`);
    }else{
      this.state='inactive';
    }
    
  }

  setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        
        this.zoom = 12;
      });
    }
  }

  routeGuard():void{
    this.tempBool = confirm("Are you sure you want to go back? Work up to now will not be saved.");

    if(this.tempBool){
        this.router.navigate(['/branchQ']);
    }
  }

  onSubmit(){
	  console.log("EXECUTED IN ON SUBMIT");
    this.user.storeDataSB(this.companyDetailFormSB.value)
	  this.user.addCompany(companies).subscribe(
		res=>{
			console.log("HELLOOOOO");
		},
		err=>{
			console.log(err);
		}
	  );
  }  
}
