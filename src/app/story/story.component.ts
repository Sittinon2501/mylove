import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-story',
  imports: [CommonModule,RouterLink],
  standalone: true,
  templateUrl: './story.component.html',
  styleUrl: './story.component.css'
})
export class StoryComponent {}
