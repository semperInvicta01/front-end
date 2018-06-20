import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';  // <-- #1 import module
import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { CompanyComponent } from './company/company.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GMapComponent } from './g-map/g-map.component';
// import { } from 'googlemaps';
import { UserService } from './user.service';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmAddComponent } from './confirm-add/confirm-add.component';
import { BranchQuestionComponent } from './branch-question/branch-question.component';
import { SubBranchComponent } from './sub-branch/sub-branch.component';
import {MatDialogModule, MatSnackBarModule,MatBadgeModule,MatToolbarModule,MatProgressSpinnerModule} from '@angular/material';
import { TestComponent } from './test/test.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule,MatTooltipModule,MatCardModule} from '@angular/material';
import {MatFormFieldModule,MatInputModule} from '@angular/material';
import { ScrollEventModule } from 'ngx-scroll-event';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { CanDeactivateGuardService } from './can-deactivate-guard.service';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

const appRoutes:Routes = [
  //  {path: 'compose',component: ComposeMessageComponent,outlet: 'popup'},
   {path:'company',component: CompanyComponent},
   {path:'companyDetail',component: CompanyDetailComponent},
   {path:'confirm',component:ConfirmAddComponent},
   {path:'branchQ',component:BranchQuestionComponent},
   {path:'sub',component:SubBranchComponent},
   {path:'',redirectTo:'/company',pathMatch:'full'},
   {path:'**',component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    CompanyDetailComponent,
    PageNotFoundComponent,
    GMapComponent,
    ConfirmAddComponent,
    BranchQuestionComponent,
    SubBranchComponent,
    TestComponent,
  ],  
  entryComponents: [TestComponent],
  imports: [
    SlimLoadingBarModule.forRoot(),
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    ScrollEventModule,
    BrowserModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatTooltipModule,
    RouterModule.forRoot(
      appRoutes
    ),
    AgmSnazzyInfoWindowModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyDuycwgz1qNSV7u5F4cldAYUTTyDrojfP0',
      libraries:['places']
    }),
    MatSnackBarModule
  ],
  providers: [UserService,DatePipe,CanDeactivateGuardService],
  bootstrap: [AppComponent],
  exports:[
    AgmCoreModule,
    HttpClientModule,
    CompanyDetailComponent,
    MatDialogModule,
   
  ]
})
export class AppModule { }
