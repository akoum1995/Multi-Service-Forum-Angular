
import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import 'rxjs/add/operator/map';
@Injectable()
export class DataService {

  constructor(private http: Http) {}

  public getAll(url) {
    return this.http.get(url).map(response=>response.json());
  }

  public Create(url,data,options) {
   return this.http.post(url,data,options).map(response=>response.json());
  }

  public update(url,data,options) {
    return this.http.put(url,data,options).map(response=>response.json());
  }

  public delete(url,options) {
    return this.http.delete(url,options).map(response=>response.json());
  }
}
