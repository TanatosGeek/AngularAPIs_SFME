import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,      
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  remail: string = '';
  rpassword: string = '';
  rconfirmPassword: string = '';

  constructor(private router: Router) {}

  iniciarPagina() {
    // Aquí puedes agregar la lógica de validación
    if (this.email && this.password) {
      this.router.navigate(['/dashboard']);
    } else {
      // Puedes mostrar un mensaje de error si es necesario
      console.log('Por favor complete los campos');
    }
  }
}
