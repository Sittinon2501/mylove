import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-story',
  imports: [CommonModule,RouterLink],
  standalone: true,
  templateUrl: './story.component.html',
  styleUrl: './story.component.css'
})
export class StoryComponent implements AfterViewInit {
  ngAfterViewInit() {
    this.startLetterRain();
  }

  @HostListener('window:resize')
  onResize() {
    this.startLetterRain();
  }

  startLetterRain() {
    const canvas = document.getElementById('letterRain') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const sentences = [
      'Happy Birthday',
      'I Love You',
      'You are my sunshine',
      'My heart is yours',
      'Wishing you joy',
      'Best wishes',
      'You are special',
      'With all my love',
      'Have a magical day'
    ];
    const fontSize = 28;
    const rainCount = Math.floor(40 + Math.random() * 20);

    const rainData = Array.from({ length: rainCount }).map(() => {
      const sentence = sentences[Math.floor(Math.random() * sentences.length)];
      return {
        sentence,
        x: Math.random() * (canvas.width - 200),
        y: Math.random() * canvas.height,
        speed: 120 + Math.random() * 80,
        alpha: 0.7
      };
    });

    let lastTime = performance.now();

    function draw(now: number) {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = fontSize + "px 'Segoe UI', 'Kanit', sans-serif";
      ctx.fillStyle = '#ff69b4';

      for (let i = 0; i < rainData.length; i++) {
        const data = rainData[i];
        const fadeStart = canvas.height - 120;
        if (data.y > fadeStart) {
          data.alpha = Math.max(0, 0.7 * (canvas.height - data.y) / 120);
        } else {
          data.alpha = 0.7;
        }
        ctx.globalAlpha = data.alpha;
        ctx.fillText(data.sentence, data.x, data.y);
        data.y += data.speed * delta;
        if (data.y > canvas.height) {
          data.sentence = sentences[Math.floor(Math.random() * sentences.length)];
          data.x = Math.random() * (canvas.width - 200);
          data.y = -fontSize * 2 - Math.random() * 100;
          data.speed = 120 + Math.random() * 80;
          data.alpha = 0.7;
        }
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  }
}
