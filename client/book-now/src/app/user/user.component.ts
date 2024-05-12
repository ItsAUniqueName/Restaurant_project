import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Table } from '../shared/model/Table';
import { Restaurant } from '../shared/model/Restaurant';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  tables: Map<string, Table[]> = new Map<string, Table[]>();
  restaurants?: Restaurant[];
  email?: string | null;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {}

  ngOnInit(){
    this.route.paramMap.subscribe((params) => {
      this.email = params.get('email');
    });
    this.userService.getAllRestaurant().subscribe({
      next: (data) => {
        this.restaurants = data;
        this.restaurants.forEach((restaurant) => {
          this.userService.getAllTableForRestaurant(restaurant.name).subscribe({
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

  book(id:string, email: string | null | undefined){
    if(email == "" || email == undefined){
      this.navigate("/");
    }else{
      this.userService.createReservation(id, email).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(["/user", {email: this.email}]);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  logout(){
    this.userService.logout().subscribe({
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
  redirectWithParams(to: string, name: string | null | undefined) {
    this.router.navigate([to, {name: name}]);
  }
}
