import { Component } from '@angular/core';
import { NavController, ActionSheetController, LoadingController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  srcImage: string;
  OCRAD: any;

  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    private camera: Camera,
    private http: Http,
    public restService : RestServiceProvider,
    private alertCtrl: AlertController
  ) { }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Galeriden Seç',
          handler: () => {
            this.getPicture(0); // 0 == Library
            //  var a = 'data:image/png;base64,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';
            // // this.callapi();
            // this.srcImage = a;
          }
        }, {
          text: 'Fotoğraf Çek',
          handler: () => {
             this.getPicture(1); // 1 == Camera
          }
        }, {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }


  getPicture(sourceType: number) {
    // You can check the values here:
    // https://github.com/driftyco/ionic-native/blob/master/src/plugins/camera.ts
    this.camera.getPicture({
      quality: 100,
      destinationType: 0, // DATA_URL
      sourceType,
      allowEdit: true,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      targetWidth: 1000,
      targetHeight: 1000,
    }).then((imageData) => {
      this.srcImage = `data:image/jpeg;base64,${imageData}`;
    }, (err) => {
      console.log(`ERROR -> ${JSON.stringify(err)}`);
    });
  }

  analyze() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present().then(() =>{
      this.restService.ocrService(this.srcImage,(resp)=>{
        loader.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Sonuç',
          subTitle: resp.replace(/\n/g, '<br/>'),
          buttons: ['Tamam']
        });
        alert.present();
      });
    });;
  }

  restart() {
    this.srcImage = '';
    this.presentActionSheet();
  }
  
}


