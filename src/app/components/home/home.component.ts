import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentService } from '../../agent.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('heroSection') heroSectionRef?: ElementRef<HTMLElement>;
  @ViewChild('cardVisual') cardVisualRef?: ElementRef<HTMLElement>;

  // Animated counters
  yearsExp: number = 0;
  projectsCount: number = 0;
  awardsCount: number = 0;

  // Parallax tilt values (degrees)
  tiltX: number = 0;
  tiltY: number = 0;

  private observer?: IntersectionObserver;
  private animFrameId?: number;
  private hasAnimatedCounters: boolean = false;
  private isDestroyed: boolean = false;

  // Background floating ambient particles
  particles = [
    { top: '15%', left: '8%', size: '3px', delay: '0s', duration: '7s' },
    { top: '28%', left: '45%', size: '2px', delay: '1.5s', duration: '9s' },
    { top: '65%', left: '12%', size: '3px', delay: '3s', duration: '8s' },
    { top: '78%', left: '38%', size: '2px', delay: '0.8s', duration: '6.5s' },
    { top: '22%', left: '88%', size: '3px', delay: '2s', duration: '8.5s' },
    { top: '55%', left: '72%', size: '2px', delay: '4s', duration: '7.5s' },
    { top: '82%', left: '84%', size: '3px', delay: '1.2s', duration: '9.5s' }
  ];

  constructor(
    private agentService: AgentService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.agentService.logAnalyticsEvent('web_initialized', {
      screen_id: 'app-home',
      screen_class: 'AppHome',
      screen_type: 'Page'
    });
  }

  ngAfterViewInit(): void {
    this.initIntersectionObserver();
  }

  ngOnDestroy(): void {
    this.isDestroyed = true;
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }
  }

  private initIntersectionObserver(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      this.runCounters();
      return;
    }

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      this.yearsExp = 2;
      this.projectsCount = 15;
      this.awardsCount = 5;
      return;
    }

    const element = this.heroSectionRef?.nativeElement;
    if (!element) {
      this.runCounters();
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.hasAnimatedCounters) {
            this.hasAnimatedCounters = true;
            this.runCounters();
          }
        });
      },
      { threshold: 0.2 }
    );

    this.observer.observe(element);
  }

  private runCounters(): void {
    const duration = 1800; // ms
    const startTime = performance.now();

    const targetYears = 2;
    const targetProjects = 15;
    const targetAwards = 5;

    const animate = (currentTime: number) => {
      if (this.isDestroyed) return;

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      this.yearsExp = Math.round(targetYears * easeProgress);
      this.projectsCount = Math.round(targetProjects * easeProgress);
      this.awardsCount = Math.round(targetAwards * easeProgress);

      if (progress < 1) {
        this.animFrameId = requestAnimationFrame(animate);
      }
    };

    this.ngZone.runOutsideAngular(() => {
      this.animFrameId = requestAnimationFrame((time) => {
        this.ngZone.run(() => animate(time));
      });
    });
  }

  // Mouse Parallax for profile card
  onMouseMove(event: MouseEvent): void {
    if (typeof window === 'undefined') return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || reducedMotion) return;

    const target = this.heroSectionRef?.nativeElement;
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Soft tilt range: max ±8 degrees
    this.tiltY = Number((((x - centerX) / centerX) * 8).toFixed(2));
    this.tiltX = Number((((centerY - y) / centerY) * 8).toFixed(2));
  }

  onMouseLeave(): void {
    // Reset tilt smoothly
    this.tiltX = 0;
    this.tiltY = 0;
  }

  // Format counters with leading zero
  formatNumber(val: number): string {
    return val < 10 ? `0${val}` : `${val}`;
  }
}

