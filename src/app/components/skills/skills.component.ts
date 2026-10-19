import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentService } from '../../agent.service';

export interface SkillItem {
  name: string;
  category: 'frontend' | 'core' | 'styling' | 'backend';
  iconClass: string;
  iconType: 'fa' | 'text';
  textIcon?: string;
  color: string;
  bgColor: string;
  tag: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('skillsSection') skillsSectionRef?: ElementRef<HTMLElement>;

  isVisible: boolean = false;
  activeFilter: 'all' | 'frontend' | 'core' | 'styling' | 'backend' = 'all';
  private observer?: IntersectionObserver;

  skills: SkillItem[] = [
    // Frontend & Mobile
    { name: 'Angular 19', category: 'frontend', iconClass: 'fa-brands fa-angular', iconType: 'fa', color: '#DD0031', bgColor: 'rgba(221,0,49,0.1)', tag: 'Core Specialist' },
    { name: 'React', category: 'frontend', iconClass: 'fa-brands fa-react', iconType: 'fa', color: '#61DAFB', bgColor: 'rgba(97,218,251,0.1)', tag: 'Modern Web' },
    { name: 'Ionic', category: 'frontend', iconClass: 'fa-solid fa-mobile-screen-button', iconType: 'fa', color: '#3880FF', bgColor: 'rgba(56,128,255,0.1)', tag: 'Mobile Hybrid' },
    { name: 'Flutter', category: 'frontend', iconClass: 'fa-solid fa-dove', iconType: 'fa', color: '#02569B', bgColor: 'rgba(2,86,155,0.1)', tag: 'Cross-Platform' },
    { name: 'Next.js', category: 'frontend', iconClass: '', iconType: 'text', textIcon: 'N', color: '#ffffff', bgColor: 'rgba(255,255,255,0.1)', tag: 'Full-Stack' },
    { name: 'HTML5', category: 'frontend', iconClass: 'fa-brands fa-html5', iconType: 'fa', color: '#E34F26', bgColor: 'rgba(227,79,38,0.1)', tag: 'Semantic Web' },
    { name: 'CSS3', category: 'frontend', iconClass: 'fa-brands fa-css3-alt', iconType: 'fa', color: '#1572B6', bgColor: 'rgba(21,114,182,0.1)', tag: 'Responsive UI' },

    // Languages & Core
    { name: 'TypeScript', category: 'core', iconClass: '', iconType: 'text', textIcon: 'TS', color: '#3178C6', bgColor: 'rgba(49,120,198,0.1)', tag: 'Type-Safe' },
    { name: 'JavaScript', category: 'core', iconClass: 'fa-brands fa-js', iconType: 'fa', color: '#F7DF1E', bgColor: 'rgba(247,223,30,0.1)', tag: 'ES6+ Native' },
    { name: 'RxJS', category: 'core', iconClass: 'fa-solid fa-infinity', iconType: 'fa', color: '#B7178C', bgColor: 'rgba(183,23,140,0.1)', tag: 'Reactive Streams' },

    // Styling & UI
    { name: 'Tailwind CSS', category: 'styling', iconClass: 'fa-solid fa-droplet', iconType: 'fa', color: '#06B6D4', bgColor: 'rgba(6,182,212,0.1)', tag: 'Utility-First' },
    { name: 'Bootstrap', category: 'styling', iconClass: 'fa-brands fa-bootstrap', iconType: 'fa', color: '#7952B3', bgColor: 'rgba(121,82,179,0.1)', tag: 'Grid Systems' },
    { name: 'Shadcn UI', category: 'styling', iconClass: 'fa-solid fa-cube', iconType: 'fa', color: '#38BDF8', bgColor: 'rgba(56,189,248,0.1)', tag: 'Accessible UI' },

    // Backend & Cloud & Tools
    { name: 'Node.js', category: 'backend', iconClass: 'fa-brands fa-node-js', iconType: 'fa', color: '#339933', bgColor: 'rgba(51,153,51,0.1)', tag: 'Runtime' },
    { name: 'Spring Boot', category: 'backend', iconClass: 'fa-brands fa-java', iconType: 'fa', color: '#6DB33F', bgColor: 'rgba(109,179,63,0.1)', tag: 'Enterprise API' },
    { name: 'Firebase', category: 'backend', iconClass: 'fa-solid fa-fire', iconType: 'fa', color: '#FFCA28', bgColor: 'rgba(255,202,40,0.1)', tag: 'Auth & DB' },
    { name: 'Supabase', category: 'backend', iconClass: 'fa-solid fa-bolt', iconType: 'fa', color: '#3ECF8E', bgColor: 'rgba(62,207,142,0.1)', tag: 'BaaS Backend' },
    { name: 'PostgreSQL', category: 'backend', iconClass: 'fa-solid fa-database', iconType: 'fa', color: '#336791', bgColor: 'rgba(51,103,145,0.1)', tag: 'Relational DB' },
    { name: 'Git & GitHub', category: 'backend', iconClass: 'fa-brands fa-git-alt', iconType: 'fa', color: '#F05032', bgColor: 'rgba(240,80,50,0.1)', tag: 'Version Control' }
  ];

  constructor(private agentService: AgentService) {}

  ngOnInit(): void {
    this.agentService.logAnalyticsEvent('screen_view', {
      screen_id: 'app-skills',
      screen_class: 'SkillsComponent',
      screen_type: 'Page'
    });
  }

  ngAfterViewInit(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      this.isVisible = true;
      return;
    }

    const el = this.skillsSectionRef?.nativeElement;
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
      { threshold: 0.12 }
    );

    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  get filteredSkills(): SkillItem[] {
    if (this.activeFilter === 'all') {
      return this.skills;
    }
    return this.skills.filter(s => s.category === this.activeFilter);
  }

  setFilter(filter: 'all' | 'frontend' | 'core' | 'styling' | 'backend'): void {
    this.activeFilter = filter;
  }
}
