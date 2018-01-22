import { Injectable } from '@angular/core';
import { Http,RequestOptions,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the RestServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestServiceProvider {
  data: any;
  private headers: Headers;
  constructor(public http: Http) {
    const self=this;
    self.headers = new Headers();
    self.headers.set('Content-Type', 'application/json');
  }

  ocrService(imagedata :any,callbackFunc:any) {
    const self=this;
    var data = {
      Base64Str:imagedata
    }
    const url = 'http://mustafakorkmaz-001-site16.ftempurl.com/api/GetText';
    return this.http.post(url, data,
    {
      headers: self.headers
    })
    .subscribe(response => {
      const data = (<any>response)._body
      callbackFunc(data);
    });
  }
}
