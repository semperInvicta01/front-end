import { Component, OnInit,HostListener,OnDestroy} from '@angular/core';
import { UserService } from '../user.service';
@Component({
  selector: 'app-confirm-add',
  templateUrl: './confirm-add.component.html',
  styleUrls: ['./confirm-add.component.css']
})
export class ConfirmAddComponent implements OnInit,OnDestroy{

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    console.log("Processing beforeunload...");
    event.returnValue = false; 
  }

  constructor(public user:UserService) { }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.user.reset();
    this.user.mainBranchLat = 10.308726;
    this.user.mainBranchLng = 123.89416699999992;
    this.user.mainBranchLocation = '';
  }
}
