import { Component } from '@angular/core';

import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAction } from 'angularfire2/database/interfaces';
import { Geolocation } from '@ionic-native/geolocation';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { OnInit } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  public laS: any = 0;
  public loS: any = 0;
  public udid: any = 'id';  

  public intervalID;

  tasksRef: AngularFireList<any>;
  tasks: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public database: AngularFireDatabase,
    public geolocation: Geolocation,
    private uniqueDeviceID: UniqueDeviceID
    
  ) {
    this.tasksRef = this.database.list('tasks');
    this.tasks = this.tasksRef.snapshotChanges()
    .map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    
  }


  ngOnInit(){
    setInterval(() => {
      this.updateTask();
    }, 1000);
  }

  getLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {

     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      this.laS= data.coords.latitude
      this.loS= data.coords.longitude
     });
     console.log(this.laS +" "+ this.loS )
     return true;
  }

  getUDID(){
    this.uniqueDeviceID.get()
    .then((resp) => {
      this.udid;
      console.log(this.udid);
    })
    .catch((error: any) => console.log(error));
  }

  createTask(){
    
    this.getLocation();
    this.tasksRef.push({
      id: this.udid,
      latitud: this.laS,
      longitud: this.loS,
      done: false
    });
  }   
  
  updateTask (){    
    this.getLocation();
    this.tasksRef.update( this.udid, {
      id: this.udid,
      latitud: this.laS,
      longitud: this.loS,
      done: false
    });    
  }

}



