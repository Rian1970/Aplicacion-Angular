import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConsumidorService } from '../../service/consumidor.service';
import { CommonModule } from "@angular/common";
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' 
})

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule, 
    MatButtonModule, 
    MatSelectModule, 
    ReactiveFormsModule, 
    FormsModule,
    CommonModule
  ]
})

export class LoginComponent {

  // Valores del formulario
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  // Para ocultar la contraseña
  hide: boolean;

  //Contructor crea instancias de consumidor para comunicarse con el API, router para navegar por la aplicacion y authService para almacenar la sesión
  constructor(private consumidorService: ConsumidorService, private router: Router, private authService: AuthService) {
    this.hide = true;
  }

  //Método que obtiene los datos del formulario 
  public login (usuario : any){
    
    this.consumidorService.loginUsuario(usuario).subscribe( //Se envía la información al API para verificar su existencia
      (response) => {

        // Almacena el token después de la autenticación
        localStorage.setItem('token', response['accessToken']);
        // Almacena el rol después de la autenticación
        localStorage.setItem('rol', response['roles']);
        // Almacena el nombre después de la autenticación
        localStorage.setItem('nombre', response['nombre']);
        // Almacena el id de usuario después de la autenticación
        localStorage.setItem('idUsuario', response['id']);

        //Crea y almacena la sesión 
        this.authService.login();

        //Dependiendo el rol se le dirige a la ventana correspondiente
        switch(localStorage.getItem('rol')) {
          case 'ROLE_generador':
            this.router.navigate(['/Aplicaciones']);
            break;
          case 'ROLE_administrador':
            this.router.navigate(['/Preguntas']);
            break;
            case 'ROLE_publicador':
              this.router.navigate(['/Reportes']);
              break;
          default:
            // Lógica para manejar el caso en que el rol no coincida con ninguno de los casos anteriores
            break;
        }
    
      },
      (error)=> {
        alert("El usuario o contraseña no existen")
      }
    );
  }

}
