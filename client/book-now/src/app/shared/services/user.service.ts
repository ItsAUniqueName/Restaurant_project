import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../model/Reservation';
import { Restaurant } from '../model/Restaurant';
import { Table } from '../model/Table';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createReservation(id: string, email: string){
    let restaurantName: string = "";
    this.getTableById(id).subscribe({
      next: (table) => {
        restaurantName = table.restaurantName;
      }
    });
    const body = new URLSearchParams();
    body.set('restaurantName', restaurantName);
    body.set('id', id);
    body.set('email', email);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<Reservation>('http://localhost:5000/app/createReservation', body, {headers: headers, withCredentials: true});
  }

  deleteReservation(id: string){
    const body = new URLSearchParams();
    body.set('id', id);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<Reservation>('http://localhost:5000/app/deleteReservation', body, {headers: headers, withCredentials: true});
  }

  getAllTableForRestaurant(name: string){
    const body = new URLSearchParams();
    body.set('name', name);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<Table[]>('http://localhost:5000/app/getAllTableByRestaurantForReservation', body, {headers: headers, withCredentials: true});
  }

  getAllRestaurant(){
    return this.http.get<Restaurant[]>('http://localhost:5000/app/getAllRestaurant', {withCredentials: true});
  }

  getAllReservation(email: string){
    const body = new URLSearchParams();
    body.set('email', email);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<Reservation[]>('http://localhost:5000/app/getAllReservationByEmail', body, {headers: headers, withCredentials: true});
  }

  getTableById(id: string){
    const body = new URLSearchParams();
    body.set('id', id);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<Table>('http://localhost:5000/app/getTableById', body, {headers: headers, withCredentials: true});
  }

  logout() {
    return this.http.post('http://localhost:5000/app/logout', {}, {withCredentials: true, responseType: 'text'});
  }

}
