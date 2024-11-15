📦 Cómo Agregar una API a Angular
📌 1. Creación del Proyecto
Abre una terminal y ejecuta el siguiente comando para crear un nuevo proyecto en Angular:

bash
Copiar código
ng new nombreDelProyecto
Accede a la carpeta del proyecto con:

bash
Copiar código
cd nombreDelProyecto
Configura las opciones del proyecto según tus necesidades (colores, animaciones, renderización, etc.). Generalmente, puedes aceptar los valores por defecto.

Para agregar Material Design al proyecto:

bash
Copiar código
ng add @angular/material
Inicializa el servidor de desarrollo:

bash
Copiar código
ng serve
📌 2. Crear el Servicio para Consumir la API
Genera un servicio que se encargará de consumir la API:

bash
Copiar código
ng generate service services/user
Luego, configura el servicio en src/app/services/user.service.ts:

typescript
Copiar código
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/users'; // <- URL de tu API

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
📌 3. Configurar HttpClient
Para realizar consultas HTTP, configura HttpClient en src/app/app.config.ts:

typescript
Copiar código
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
    provideHttpClient(withFetch()), // <- Añade provideHttpClient con withFetch()
    provideAnimationsAsync()
  ]
};
📌 4. Crear el Componente de la Tabla de Usuarios
Genera un nuevo componente para mostrar los datos de la API:

bash
Copiar código
ng generate component components/user-list
Edita src/app/components/user-list.component.ts:

typescript
Copiar código
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
    MatPaginator, MatSort,
    MatTableModule, MatFormFieldModule,
    MatInputModule, MatToolbarModule,
    MatCardModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'password', 'role', 'avatar'];
  dataSource = new MatTableDataSource<any>([]);

  readonly paginator = viewChild.required(MatPaginator);
  readonly sort = viewChild.required(MatSort);

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data: any[]) => {
      this.dataSource.data = data;
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
📌 5. Crear la Vista para Mostrar los Datos en una Tabla
Edita src/app/components/user-list/user-list.component.html:

html
Copiar código
<div class="container">
  <mat-card class="user-card">
    <mat-toolbar color="primary">
      <span>User List</span>
    </mat-toolbar>

    <div class="filter-container">
      <mat-form-field appearance="outline">
        <mat-label>Filter</mat-label>
        <input matInput (input)="applyFilter($event)" placeholder="Search Users" />
      </mat-form-field>
    </div>

    <table mat-table [dataSource]="dataSource" matSort>
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef>ID</th>
        <td mat-cell *matCellDef="let user">{{ user.id }}</td>
      </ng-container>

      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Name</th>
        <td mat-cell *matCellDef="let user">{{ user.name }}</td>
      </ng-container>

      <ng-container matColumnDef="email">
        <th mat-header-cell *matHeaderCellDef>Email</th>
        <td mat-cell *matCellDef="let user">{{ user.email }}</td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>

    <mat-paginator [pageSize]="5" [pageSizeOptions]="[5, 10, 25]"></mat-paginator>
  </mat-card>
</div>
📌 Integrar el Componente en la Aplicación
Edita src/app/app.component.html para incluir el nuevo componente:

html
Copiar código
<app-user-list></app-user-list>
<router-outlet></router-outlet>
📊 Resultados
Este sería el resultado final, con Material Design aplicado:



❓ Preguntas Frecuentes
¿Qué hace el método getUsers en este servicio?
R: Realiza una solicitud HTTP GET para obtener datos desde la API externa.

¿Por qué es necesario importar HttpClientModule?
R: En Angular 18, HttpClientModule ha sido reemplazado por la nueva implementación con HttpClient usando provideHttpClient.

¿Qué función cumple el método ngOnInit en el componente UserListComponent?
R: Carga los datos iniciales al momento de crear el componente.

¿Para qué sirve el bucle *ngFor en Angular?
R: Repite el bloque de código para cada elemento en el arreglo.

¿Qué ventajas tiene el uso de servicios en Angular para el consumo de APIs?

Reutilización de código.
Facilidad de mantenimiento.
Mejora el rendimiento y facilita pruebas.
¿Por qué es importante separar la lógica de negocio de la lógica de presentación?

Mejora la escalabilidad.
Facilita el mantenimiento.
¿Qué otros tipos de datos o APIs podrías integrar en un proyecto como este?

Autenticación y automatización.
Notificaciones.
Almacenamiento de datos y datos en tiempo real.
Espero que este formato sea lo que necesitas. ¡Déjame saber si necesitas más ajustes! 🚀







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
