import { Component, OnInit, OnChanges,AfterViewInit,HostListener,OnDestroy} from '@angular/core';
import { FormControl,FormGroup,FormBuilder,Validators,FormArray} from '@angular/forms';
import { company,companies } from '../data-model';
import { UserService } from '../user.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit,OnChanges,OnDestroy{

  companyForm:FormGroup;
  company:company;
  dS = new Date();
 
  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    console.log("Processing beforeunload...");
    event.returnValue = false; 
 }

 ngOnDestroy(){
  this.user.mainBranchLat = 10.308726;
  this.user.mainBranchLng = 123.89416699999992;
  this.user.mainBranchLocation = '';
 }
  constructor(private fb:FormBuilder,private user:UserService,public datepipe: DatePipe,public router:Router) {
    this.createForm();
  }

  ngOnInit() {
    this.rebuildForm();
  }
  
  createForm(){
    this.companyForm = this.fb.group({
      companyName: [companies.companyName,Validators.required],
      companyEmail:[companies.companyEmail,Validators.required],
      dateSubmitted:[this.datepipe.transform(this.dS,'yyyy-MM-dd').toString(),Validators.required],
      username:[companies.username,Validators.required]
    });
  }

  ngOnChanges(){
    this.rebuildForm();
  }

  save(){
    if(this.companyForm.invalid){
      this.validateForm();
    }else{
      this.company = this.prepareSaveCo();
      this.user.updateCompany(this.company).subscribe();
      this.rebuildForm();
      this.router.navigate(['/companyDetail']);
    }
  }
  
  prepareSaveCo():company{
     const formModel = this.companyForm.value;

     const saveCo:company = {
       id:companies.id,
       companyEmail:formModel.companyEmail as string,
       companyName:formModel.companyName as string,
       branches:companies.branches,
       dateSubmitted:this.datepipe.transform(this.dS,'yyyy-MM-dd').toString() as string,
       status:companies.status,
       username:formModel.username as string
     };

     return saveCo;
  }

  rebuildForm(){
     this.companyForm.reset({
       companyName:companies.companyName,
       companyEmail:companies.companyEmail,
       dateSubmitted:this.datepipe.transform(this.dS,'yyyy-MM-dd').toString(),
       username:companies.username,
     });
  }
  get companyName(){ return this.companyForm.get('companyName');}

  get companyEmail(){ return this.companyForm.get('companyEmail');}

  get username(){ return this.companyForm.get('username');}

  onSubmit(){
    this.save();
    // this.user.addCompany(companies).subscribe();
  }

  validateForm() {
    if (this.companyForm.invalid) {
      this.companyForm.get('companyName').markAsTouched();
      this.companyForm.get('companyEmail').markAsTouched();
      this.companyForm.get('username').markAsTouched();
    }
  }
    
}


