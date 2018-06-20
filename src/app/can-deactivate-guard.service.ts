import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable }    from 'rxjs';
import { CompanyDetailComponent } from './company-detail/company-detail.component';

export interface CanComponentDeactivate{
  canDeactivate:()=>Observable<boolean> | Promise<boolean>
}
@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuardService implements CanDeactivate<CompanyDetailComponent>{

  constructor() { }

  canDeactivate(component:CompanyDetailComponent){
    console.log("GOT IN");
      return component.canDeactivate ? component.canDeactivate():false;
  }
}
