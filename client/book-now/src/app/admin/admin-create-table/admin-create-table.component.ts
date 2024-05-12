import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-admin-create-table',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './admin-create-table.component.html',
  styleUrl: './admin-create-table.component.css'
})
export class AdminCreateTableComponent {
  restaurantName?: string | null = '';
  indoor: string = '';
  seets: string = '';
  date: string = '';
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private adminService: AdminService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.restaurantName = params.get('name');
    });
  }

  create() {
    if (this.restaurantName && this.seets && this.date) {
      this.errorMessage = '';
      if(this.indoor == ''){
        this.indoor = '0';
      }
      this.adminService.createTable(this.restaurantName, this.indoor, this.seets, this.date).subscribe({
        next: (data) => {
          if (data) {
              this.router.navigateByUrl('/admin');
          }
        }, error: (err) => {
          this.errorMessage = err.error;
        },
      })
    } else {
      this.errorMessage = 'Form is empty.';
    }
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }
  redirectWithParams(to: string, name: string) {
    this.router.navigate([to, {name: name}]);
  }
}
