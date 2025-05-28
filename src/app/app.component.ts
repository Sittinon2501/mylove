import { Component, AfterViewInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; // เพิ่มบรรทัดนี้
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterModule, CommonModule] // เพิ่มบรรทัดนี้
})
export class AppComponent implements AfterViewInit {
  isMuted = false;

  @ViewChild('bgm') bgmRef!: ElementRef<HTMLAudioElement>;

  toggleMute() {
    this.isMuted = !this.isMuted;
  }

  ngAfterViewInit() {
    if (this.bgmRef?.nativeElement) {
      this.bgmRef.nativeElement.volume = 0.18; // ปรับเสียงเบาๆ นุ่มๆ
    }
  }
}

