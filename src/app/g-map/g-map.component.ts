import { AgmCoreModule,MarkerManager,MapsAPILoader } from '@agm/core';
import { NgModule,OnInit,OnDestroy,ViewChild,ElementRef,NgZone,Component,ApplicationRef} from '@angular/core';
import { } from 'googlemaps';
import { ReactiveFormsModule,FormControl, FormsModule,FormBuilder,FormGroup } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { UserService} from '../user.service';

@Component({
  selector: 'app-g-map',
  templateUrl: './g-map.component.html',
  styleUrls: ['./g-map.component.css']
})
export class GMapComponent implements OnInit{

  
  public title: string = 'My first AGM project';
  public lat: number=39.8282;
  public lng: number=-98.5795;
  public iU:string = "C:/Users/ojt2/sign-up/src/assets/marker.png";
  public lab:string = "I";
  public bool:boolean = true;
  
  public zoom:number;

  
  
  @ViewChild('search')
  public searchElementRef:ElementRef;
 
  gmapForm:FormGroup;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private fb:FormBuilder,
    private user:UserService
  ){
   
    this.gmapForm = this.fb.group({
      searchControl:this.user.mainBranchLocation,
    });
  }
  
  
  ngOnInit(){
    
    this.zoom = 4;
    this.lat = this.user.mainBranchLat;
    this.lng = this.user.mainBranchLng;

   

    this.setCurrentPosition();

    this.mapsAPILoader.load().then(()=>{
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement,{
        types:[]
       
      });
      autocomplete.addListener("place_changed",()=>{
       
        this.ngZone.run(()=>{
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if(place.geometry === undefined || place.geometry === null){
            return;
          }
        
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();

          if(this.user.isMainBranchPage){
            
            this.user.mainBranchLocation = place.formatted_address;
            this.user.mainBranchLat = this.lat;
            this.user.mainBranchLng = this.lng;
          
            this.user.tempLat = this.user.mainBranchLat;
            this.user.tempLng = this.user.mainBranchLng;
          }else{
            this.user.tempLat = this.lat;
            this.user.tempLng = this.lng;
          }
          
          
          console.log(this.user.tempLng,this.user.tempLat);
          this.zoom = 12;
        });
      });
    });
  }

  // ngOnDestroy(){
  //   this.mapsAPILoader.load().then(()=>{
  //     let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement,{
  //       types:[]
       
  //     });
  //   });
  // }

   setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
  
}
