import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-admin-create',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './admin-create.component.html',
  styleUrl: './admin-create.component.css'
})
export class AdminCreateComponent {
  name: string = '';
  address: string = '';
  type: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private adminService: AdminService) { }

  create() {
    if (this.name && this.address && this.type) {
      this.errorMessage = '';
      this.adminService.createRestaurant(this.name, this.address, this.type).subscribe({
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
}
