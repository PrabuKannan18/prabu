import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentService } from '../../agent.service';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})
export class AboutMeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('aboutSection') aboutSectionRef?: ElementRef<HTMLElement>;
  
  isVisible: boolean = false;
  private observer?: IntersectionObserver;

  constructor(private agentService: AgentService) {}

  ngOnInit(): void {
    // Log standard Angular analytics event
    this.agentService.logAnalyticsEvent('screen_view', {
      screen_id: 'app-about-me',
      screen_class: 'AboutMeComponent',
      screen_type: 'Page'
    });
  }

  ngAfterViewInit(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      this.isVisible = true;
      return;
    }

    const el = this.aboutSectionRef?.nativeElement;
    if (!el) {
      this.isVisible = true;
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isVisible = true;
          }
        });
      },
      { threshold: 0.15 }
    );

    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
