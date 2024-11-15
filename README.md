
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

Configuras las opciones del proyecto a tus necesidades desde colores, animaciones, renderizacion , etc.

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
Des pues nos iremos al archivo

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
##3.-









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
