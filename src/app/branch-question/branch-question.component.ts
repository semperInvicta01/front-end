import { Component, OnInit,OnChanges } from '@angular/core';
import { UserService } from '../user.service';
import {Router} from '@angular/router';
import {company,companies,branchCompany} from '../data-model';

@Component({
  selector: 'app-branch-question',
  templateUrl: './branch-question.component.html',
  styleUrls: ['./branch-question.component.css']
})
export class BranchQuestionComponent implements OnInit {

  constructor(private user:UserService,private router:Router) { }
  
  model = new branchNumber(0);
  tempBool;
  ngOnInit() {
    
  }
 
  storeNum(){
    if(this.model.numOfBranches != 0){
      this.user.numberOfBranches = this.model.numOfBranches;
      console.log(this.user.numberOfBranches);
      this.router.navigate(['/sub']);
    }else{
      this.router.navigate(['/confirm']);
      this.user.addCompany(companies);
    }  
  }

  routeGuard():void{
    this.tempBool = confirm("Are you sure you want to go back? Work up to now will not be saved.");

    if(this.tempBool){
        this.router.navigate(['/companyDetail']);
    }
  }
   
}
export class branchNumber{

  constructor(public numOfBranches: number){
    
  }
  
}