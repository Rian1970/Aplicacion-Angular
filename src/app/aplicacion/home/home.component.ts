import { Component } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    MatListModule, 
    MatDividerModule,
    CommonModule,
    MatButtonModule
  ]
})
export class HomeComponent {

  aplicaciones: any

  constructor() {

  }
  
}
