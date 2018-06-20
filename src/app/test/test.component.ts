import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatButtonModule} from '@angular/material';
import { UserService } from '../user.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  constructor(
    
    public dialogRef: MatDialogRef<TestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  ngOnInit(){

  }
  closeDialog():void{
    this.dialogRef.close();
    
  }
}
