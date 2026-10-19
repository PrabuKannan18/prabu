import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMenuOpen: boolean = false;
  currentTheme: 'dark' | 'light' = 'dark';
  isScrolled: boolean = false;
  activeSection: string = 'home';

  private sections = ['home', 'about', 'skills', 'projects', 'contact'];

  ngOnInit(): void {
    this.initTheme();
    this.checkActiveSection();
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  initTheme(): void {
    if (typeof window === 'undefined') return;
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    this.currentTheme = savedTheme || 'dark';
    document.documentElement.setAttribute('data-theme', this.currentTheme);
  }

  toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', this.currentTheme);
      localStorage.setItem('theme', this.currentTheme);
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (typeof window === 'undefined') return;
    this.isScrolled = window.scrollY > 30;
    this.checkActiveSection();
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    this.isMenuOpen = false;
  }

  checkActiveSection(): void {
    if (typeof window === 'undefined') return;
    const scrollPosition = window.scrollY + 200;

    for (const sectionId of this.sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const top = element.offsetTop;
        const height = element.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          this.activeSection = sectionId;
          break;
        }
      }
    }
  }

  scrollTo(sectionId: string): void {
    this.activeSection = sectionId;
    this.isMenuOpen = false;
    if (typeof window !== 'undefined') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
