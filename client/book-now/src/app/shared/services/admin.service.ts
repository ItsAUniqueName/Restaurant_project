import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from '../model/Restaurant';
import { Table } from '../model/Table';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  createTable(restaurantName: string, indoor: string, seets: string, date: string){
    const body = new URLSearchParams();
    body.set('restaurantName', restaurantName);
    body.set('indoor', indoor);
    body.set('seets', seets);
    body.set('date', date);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<Restaurant>('http://localhost:5000/app/createTable', body, {headers: headers, withCredentials: true});
  }

  deleteTable(id: string){
    const body = new URLSearchParams();
    body.set('id', id);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<Restaurant>('http://localhost:5000/app/deleteTable', body, {headers: headers, withCredentials: true});
  }

  getAllTableForRestaurant(name: string){
    const body = new URLSearchParams();
    body.set('name', name);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<Table[]>('http://localhost:5000/app/getAllTableByRestaurant', body, {headers: headers, withCredentials: true});
  }


  getAllTable(){
    return this.http.get<Table[]>('http://localhost:5000/app/getAllTable', {withCredentials: true});
  }


  getAllRestaurant(){
    return this.http.get<Restaurant[]>('http://localhost:5000/app/getAllRestaurant', {withCredentials: true});
  }


  createRestaurant(name: string, address: string, type: string){
    const body = new URLSearchParams();
    body.set('name', name);
    body.set('address', address);
    body.set('type', type);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<Restaurant>('http://localhost:5000/app/createRestaurant', body, {headers: headers, withCredentials: true});
  }
}
