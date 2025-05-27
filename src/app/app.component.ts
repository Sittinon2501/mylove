import { Component, AfterViewInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; // เพิ่มบรรทัดนี้

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterModule] // เพิ่มบรรทัดนี้
})
export class AppComponent {}

