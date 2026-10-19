import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentService } from '../../agent.service';

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  tech: { name: string; colorClass: string }[];
  demoUrl: string;
  featured?: boolean;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('projectsSection') projectsSectionRef?: ElementRef<HTMLElement>;

  isVisible: boolean = false;
  private observer?: IntersectionObserver;

  projects: ProjectItem[] = [
    {
      id: 'product-suite',
      title: 'Product Sale Suite',
      category: 'E-Commerce Platform',
      image: '/imgs/product.png',
      description: 'Comprehensive high-performance product retail and sales engine featuring reactive catalog filtering, optimized checkout, and Firebase real-time integration.',
      tech: [
        { name: 'Angular 19', colorClass: 'text-rose-400 bg-rose-500/10' },
        { name: 'Firebase', colorClass: 'text-amber-400 bg-amber-500/10' },
        { name: 'Tailwind CSS', colorClass: 'text-cyan-400 bg-cyan-500/10' }
      ],
      demoUrl: 'https://product-66ae3.web.app/',
      featured: true
    },
    {
      id: 'messaging-hub',
      title: 'Messaging Hub',
      category: 'Real-Time Hybrid App',
      image: '/imgs/whatsapp.png',
      description: 'Cross-platform mobile messaging application replicating modern chat architecture with instant socket transmission, chat threads, and fluid gestures.',
      tech: [
        { name: 'Ionic Hybrid', colorClass: 'text-blue-400 bg-blue-500/10' },
        { name: 'Socket.io', colorClass: 'text-emerald-400 bg-emerald-500/10' },
        { name: 'TypeScript', colorClass: 'text-sky-400 bg-sky-500/10' }
      ],
      demoUrl: 'https://whatsapp-f646c.web.app/',
      featured: true
    },
    {
      id: 'culinary-portal',
      title: 'Culinary Portal',
      category: 'Consumer Lifestyle Web',
      image: '/imgs/recipes.png',
      description: 'Interactive culinary portal designed for recipe exploration, ingredient scaling, category filtration, and nutritional analytics with responsive layout.',
      tech: [
        { name: 'React Flow', colorClass: 'text-cyan-400 bg-cyan-500/10' },
        { name: 'Material UI', colorClass: 'text-purple-400 bg-purple-500/10' },
        { name: 'REST APIs', colorClass: 'text-pink-400 bg-pink-500/10' }
      ],
      demoUrl: 'https://recipes-7a3da.firebaseapp.com/'
    },
    {
      id: 'retail-cart-engine',
      title: 'Retail Cart Engine',
      category: 'High-Speed Modern Retail',
      image: '/imgs/Food cart.png',
      description: 'State-driven food cart application focused on real-time price computations, instant item dispatch, and optimized state synchronization with Redux.',
      tech: [
        { name: 'Redux Hub', colorClass: 'text-purple-400 bg-purple-500/10' },
        { name: 'JavaScript', colorClass: 'text-yellow-400 bg-yellow-500/10' },
        { name: 'Performance Focus', colorClass: 'text-emerald-400 bg-emerald-500/10' }
      ],
      demoUrl: 'https://prabukannan18.github.io/Food-cart/'
    }
  ];

  constructor(private agentService: AgentService) {}

  ngOnInit(): void {
    this.agentService.logAnalyticsEvent('screen_view', {
      screen_id: 'app-projects',
      screen_class: 'ProjectsComponent',
      screen_type: 'Page'
    });
  }

  ngAfterViewInit(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      this.isVisible = true;
      return;
    }

    const el = this.projectsSectionRef?.nativeElement;
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
      { threshold: 0.1 }
    );

    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
