import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Table } from '../../shared/model/Table';
import { Restaurant } from '../../shared/model/Restaurant';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { Reservation } from '../../shared/model/Reservation';

@Component({
  selector: 'app-user-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-book.component.html',
  styleUrl: './user-book.component.css'
})
export class UserBookComponent {
  tables: Map<string, Table | null> = new Map<string, Table| null>();
  reservation?: Reservation[];
  email?: string | null;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {}

  ngOnInit(){
    this.route.paramMap.subscribe((params) => {
      this.email = params.get('name');
    });
    if(this.email == "" || this.email == null || this.email == undefined){
      this.navigate("/");
    }else{
      this.userService.getAllReservation(this.email).subscribe({
        next: (data) => {
          this.reservation = data;
          this.reservation.forEach((reservation) => {
            this.userService.getTableById(reservation.tableIdentifier).subscribe({
              next: (data) => {
                if(data !== undefined){
                  this.tables.set(reservation._id, data);
                }
              },
              error: (err) => {
                this.tables.set(reservation._id, null);
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
  }

  deleteBook(id:string){
    this.userService.deleteReservation(id).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(["/user", {email: this.email}]);
      },
      error: (err) => {
        console.log(err);
      }
    });
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
    this.router.navigate([to, {email: name}]);
  }

}
