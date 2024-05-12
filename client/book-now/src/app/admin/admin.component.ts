import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Table } from '../shared/model/Table';
import { AdminService } from '../shared/services/admin.service';
import { Restaurant } from '../shared/model/Restaurant';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  tables: Map<string, Table[]> = new Map<string, Table[]>();
  restaurants?: Restaurant[];

  constructor(private router: Router, private adminService: AdminService, private authService: AuthService) {}

  ngOnInit(){
    this.adminService.getAllRestaurant().subscribe({
      next: (data) => {
        this.restaurants = data;
        this.restaurants.forEach((restaurant) => {
          this.adminService.getAllTableForRestaurant(restaurant.name).subscribe({
            next: (data) => {
              this.tables.set(restaurant.name, data);
            },
            error: (err) => {
              this.tables.set(restaurant.name, []);
              console.log(err);
            }
          });
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  delete(id: string){
    this.adminService.deleteTable(id).subscribe({
      next:(data) =>{
        console.log(data);
        window.location.reload();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  logout(){
    this.authService.logout().subscribe({
      next: (data) =>{
        console.log(data);
        this.navigate("/");
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }
  redirectWithParams(to: string, name: string) {
    this.router.navigate([to, {name: name}]);
  }
}
