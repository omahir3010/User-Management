import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http : HttpClient) {}

  apiUrl = 'http://localhost:3000/user';

  getAllData():Observable<any>
  {
    return this.http.get(`${this.apiUrl}`);
  }

  updateData(data:any,id:any):Observable<any>{
    let ids = id;
    return this.http.put(`http://localhost:3000/user/${ids}`,data)
  }
  //C=> CREATE DATA
  createData(data:any):Observable<any>{
    console.log(data,'createApi=>');
    return this.http.post(`${this.apiUrl}`,data);
  }

  deleteData(id:any):Observable<any>{
    let ids = id;
    return this.http.delete(`${this.apiUrl}/${ids}`);
  }



  getSingleData(id:any):Observable<any>{
    let ids = id;
    return this.http.get(`${this.apiUrl}/${ids}`)
  }

}
