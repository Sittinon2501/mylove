import { Component, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  title = 'mylove';

  wishPopupVisible = false;

  showWishPopup() {
    this.wishPopupVisible = true;
    setTimeout(() => this.launchConfetti(), 50);
  }

  closeWishPopup() {
    this.wishPopupVisible = false;
  }

  launchConfetti() {
    const confettiColors = ['#ff69b4', '#ffd966', '#7ed6df', '#f7b2ad', '#ffb347', '#fff0f6'];
    const confettiContainer = document.getElementById('confetti-container');
    if (!confettiContainer) return;
    confettiContainer.innerHTML = '';
    for (let i = 0; i < 32; i++) {
      const div = document.createElement('div');
      div.className = 'confetti-piece';
      div.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      div.style.left = Math.random() * 95 + '%';
      div.style.top = (Math.random() * 10 - 10) + 'px';
      div.style.transform = `rotate(${Math.random() * 360}deg)`;
      div.style.animationDelay = (Math.random() * 0.7) + 's';
      confettiContainer.appendChild(div);
    }
    setTimeout(() => {
      if (confettiContainer) confettiContainer.innerHTML = '';
    }, 2200);
  }

  ngAfterViewInit() {
    this.startLetterRain();
    this.startHeartRain();
  }

  @HostListener('window:resize')
  onResize() {
    this.startLetterRain();
    this.startHeartRain();
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
    const rainCount = Math.floor(40 + Math.random() * 20); // 40-60 ประโยค

    // สุ่มตำแหน่ง x/y อิสระ
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

        // คำนวณ alpha ให้จางเมื่อใกล้พื้น
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
          data.y = -fontSize * 2 - Math.random() * 100; // สุ่มจุดเริ่มต้น y ด้านบน
          data.speed = 120 + Math.random() * 80;
          data.alpha = 0.7;
        }
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  }

  startHeartRain() {
    const canvas = document.getElementById('heartRain') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const heartCount = 22;
    const hearts = Array.from({ length: heartCount }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 18 + Math.random() * 18,
      speed: 40 + Math.random() * 40,
      alpha: 0.5 + Math.random() * 0.4,
      drift: (Math.random() - 0.5) * 0.7,
      color: ['#ff69b4', '#ffd966', '#f7b2ad', '#7ed6df'][Math.floor(Math.random() * 4)]
    }));

    let lastTime = performance.now();

    function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, alpha: number) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.moveTo(x, y + size * 0.3);
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + size * 0.3);
      ctx.bezierCurveTo(x - size / 2, y + size * 0.6, x, y + size * 0.9, x, y + size);
      ctx.bezierCurveTo(x, y + 0.9 * size, x + size / 2, y + 0.6 * size, x + size / 2, y + size * 0.3);
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size * 0.3);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    }

    function animate(now: number) {
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const h of hearts) {
        drawHeart(ctx, h.x, h.y, h.size, h.color, h.alpha);
        h.y += h.speed * delta;
        h.x += h.drift;
        if (h.y > canvas.height + h.size) {
          h.y = -h.size * 2;
          h.x = Math.random() * canvas.width;
        }
        if (h.x < -h.size) h.x = canvas.width + h.size;
        if (h.x > canvas.width + h.size) h.x = -h.size;
      }
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }
}