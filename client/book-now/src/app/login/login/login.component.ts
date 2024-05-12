import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) { }
  
  login() {
    if (this.email && this.password) {
      this.errorMessage = '';
      this.authService.login(this.email, this.password).subscribe({
        next: (data) => {
          if (data) {
            if(this.email == "admin@admin.hu")
              {
                this.router.navigateByUrl('/admin');
              }else{
                this.router.navigate(['/user', {email: this.email}]);
              }
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
