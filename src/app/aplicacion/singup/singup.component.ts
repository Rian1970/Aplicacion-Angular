import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { ConsumidorService } from '../../service/consumidor.service';
import { CommonModule } from "@angular/common";
import { LoginComponent } from '../login/login.component';

// Validador personalizado para la fecha de nacimiento
function fechaNacimientoValidator(control: AbstractControl): ValidationErrors | null {
  const regex = /^(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])-(19|20)\d{2}$/;
  return regex.test(control.value) ? null : { fechaNacimientoInvalida: true };
}

@Component({
  selector: 'app-singup',
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
  ],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.css'
})

export class SingupComponent {

  // Valores del formulario
  public registroForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    fecha_nacimiento: new FormControl('', [Validators.required, fechaNacimientoValidator]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  //Interfaz para logear al usuario creado
  usuarioRegistrado : any = {
    "email": "",
    "password": ""
  };

  // Para ocultar la contraseña
  hide: boolean;
  correoUsado: string;
  
  //Contructor crea instancias de consumidor para comunicarse con el API, router para navegar por la aplicacion y authService para almacenar la sesión
  constructor(private consumidorService: ConsumidorService, private login: LoginComponent) {
    this.hide = true;
    this.correoUsado = "";
  }

  //Método que obtiene los datos del formulario 
  public registar (usuario : any){

    this.consumidorService.registrarUsuario(usuario).subscribe(//Se envía la información al API para crear al usuario
      (response) => {
        this.loginRegistro(usuario)
      },
      (error)=> {
        this.correoUsado = error['error']['message']
      }
    );
  }

  //Método que logea al nuevo usuario automaticamente
  public loginRegistro(usuario: any) {

   this.usuarioRegistrado['email'] = usuario['email']
   this.usuarioRegistrado['password'] = usuario['password']

   this.login.login(this.usuarioRegistrado);

  }

}
