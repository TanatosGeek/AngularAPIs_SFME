# Como agregar una API a angular

##1.-Creacion del Proyecto

Abrimos una terminal o consola y ejecutamos el siguiente comando para crear un nuevo
proyecto en Angular:
```bash
ng new nombreDelProyecto
```

Entramos a la carpeta con el comando
```bash
cd nombreDelProyecto
```
Despues configuras las opciones del proyecto a tus necesidades desde colores, animaciones, renderizacion , etc. (Por lo general aceptas todo pero no esta de mas leer).

Agregaremos Material Design a nuestro proyecto con el comando
```bash
ng add @angular/material
```

##2.-Crear el Servicio para Consumir la API

Generaremos un servicio que se encargará de consumir la API. En la
terminal, escribiremos:

```bash
ng generate service services/user
```
Despues nos iremos al archivo `src/app/services/user.service.ts` para configurar el API que estaremos usando de la siguiente forma.

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://api.escuelajs.co/api/v1/users';  // <-Aqui va la url de tu API
  constructor(private http: HttpClient) { }
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
```

## 3.-Configurar HttpClient

Para poder realizar las consultas necesitaremos implementar HttpClient en el archivo `src/app/app.config.ts` el cual se configurara de la siguiente forma.

```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()), //<- Aquí se añade provideHttpClient con withFetch()
    provideAnimationsAsync()
  ]
};
```
## 4.-Crear el Componente de la Tabla de Usuarios
Para crear nuestro componente el cual nos servira para ver el contenido de nuestra API 
```bash
ng generate component components/user-list
```

Tras generar nuestro componente ingresaremos al archivo 
`src/app/components/user-list.component.ts` al cual se le dara el sigiente formato

```typescript
import { AfterViewInit, Component, OnInit, viewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from '../../services/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    MatPaginator,MatSort,
    MatTableModule,MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'password' , 'role', 'avatar']; // <- Aqui agregaremos lo que quieras sacar de tu API, asi que ve que es lo que te retorna tu API
  dataSource = new MatTableDataSource<any>([]); // Inicializa con un arreglo vacío

  readonly paginator = viewChild.required(MatPaginator);
  readonly sort = viewChild.required(MatSort);

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Llama al servicio para obtener los usuarios y asignarlos al dataSource
    this.userService.getUsers().subscribe((data: any[]) => {
      this.dataSource.data = data; // Asigna los datos obtenidos a dataSource
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator();
    this.dataSource.sort = this.sort();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
```










https://pandao.github.io/editor.md/en.html



# ProyectoEnAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.11.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
