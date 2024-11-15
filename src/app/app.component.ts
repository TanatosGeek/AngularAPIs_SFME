import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { UserService } from './services/user.service';

import { UserListComponent } from './components/user-list/user-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    UserListComponent
  ],
  providers: [UserService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'consumo-api-SFME';
}


