import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-story',
  imports: [CommonModule, RouterLink],
  standalone: true,
  templateUrl: './story.component.html',
  styleUrl: './story.component.css',
})
export class StoryComponent implements AfterViewInit {
  gallery = [
    {
      type: 'image',
      src: 'https://plus.unsplash.com/premium_photo-1748152778956-c4accfc55249?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'ความทรงจำ 1',
    },
    {
      type: 'image',
      src: 'https://plus.unsplash.com/premium_photo-1748152778956-c4accfc55249?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'ความทรงจำ 2',
    },
    { type: 'video', src: 'Repo.mp4', alt: 'วีดีโอความทรงจำ 1' },
    {
      type: 'image',
      src: 'https://plus.unsplash.com/premium_photo-1748152778956-c4accfc55249?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'ความทรงจำ 3',
    },
    // เพิ่ม media ได้ตามต้องการ
  ];
  modalOpen = false;
  modalIndex = 0;

  ngAfterViewInit() {
    this.startLetterRain();
    this.startHeartRain();
    this.startZigzagRain(); // เพิ่มเรียก zigzag rain
  }

  @HostListener('window:resize')
  onResize() {
    this.startLetterRain();
    this.startHeartRain();
    this.startZigzagRain(); // เพิ่มเรียก zigzag rain
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
      'Have a magical day',
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
        alpha: 0.7,
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
          data.alpha = Math.max(0, (0.7 * (canvas.height - data.y)) / 120);
        } else {
          data.alpha = 0.7;
        }
        ctx.globalAlpha = data.alpha;
        ctx.fillText(data.sentence, data.x, data.y);
        data.y += data.speed * delta;
        if (data.y > canvas.height) {
          data.sentence =
            sentences[Math.floor(Math.random() * sentences.length)];
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
      color: [
        '#ff69b4',
        '#ffd966',
        '#f7b2ad',
        '#7ed6df',
      ][Math.floor(Math.random() * 4)],
    }));

    let lastTime = performance.now();

    function drawHeart(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      alpha: number
    ) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.moveTo(x, y + size * 0.3);
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + size * 0.3);
      ctx.bezierCurveTo(
        x - size / 2,
        y + size * 0.6,
        x,
        y + size * 0.9,
        x,
        y + size
      );
      ctx.bezierCurveTo(
        x,
        y + 0.9 * size,
        x + size / 2,
        y + 0.6 * size,
        x + size / 2,
        y + size * 0.3
      );
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

  startZigzagRain() {
    const canvas = document.getElementById('zigzagRain') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const rainCount = Math.floor(16 + Math.random() * 8); // ลดจำนวนเส้น
    const rains = Array.from({ length: rainCount }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: 90 + Math.random() * 70,
      speed: 120 + Math.random() * 90,
      amplitude: 10 + Math.random() * 10,
      freq: 0.12 + Math.random() * 0.08,
      color: [
        '#7ed6df',
        '#ffd966',
        '#ff69b4',
        '#a64ca6'
      ][Math.floor(Math.random() * 4)],
      alpha: 0.32 + Math.random() * 0.22,
      phase: Math.random() * Math.PI * 2,
    }));

    let lastTime = performance.now();

    function draw(now: number) {
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const r of rains) {
        ctx.save();
        ctx.globalAlpha = r.alpha;
        ctx.strokeStyle = r.color;
        ctx.lineWidth = 2.1;

        ctx.beginPath();
        ctx.moveTo(r.x, r.y);
        for (let t = 0; t <= r.length; t += 4) {
          const x = r.x + Math.sin(r.phase + t * r.freq) * r.amplitude;
          const y = r.y + t;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.restore();

        r.y += r.speed * delta;
        r.phase += delta * 2.5;

        if (r.y > canvas.height + r.length) {
          r.x = Math.random() * canvas.width;
          r.y = -r.length;
          r.length = 90 + Math.random() * 70;
          r.speed = 120 + Math.random() * 90;
          r.amplitude = 10 + Math.random() * 10;
          r.freq = 0.12 + Math.random() * 0.08;
          r.color = [
            '#7ed6df',
            '#ffd966',
            '#ff69b4',
            '#a64ca6'
          ][Math.floor(Math.random() * 4)];
          r.alpha = 0.32 + Math.random() * 0.22;
          r.phase = Math.random() * Math.PI * 2;
        }
      }
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  }

  openMedia(idx: number) {
    this.modalIndex = idx;
    this.modalOpen = true;
  }
  closeMedia() {
    this.modalOpen = false;
  }
  prevMedia(event: Event) {
    event.stopPropagation();
    this.modalIndex =
      (this.modalIndex - 1 + this.gallery.length) % this.gallery.length;
  }
  nextMedia(event: Event) {
    event.stopPropagation();
    this.modalIndex = (this.modalIndex + 1) % this.gallery.length;
  }
}
