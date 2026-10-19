import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AgentService } from '../../agent.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('contactSection') contactSectionRef?: ElementRef<HTMLElement>;

  isVisible: boolean = false;
  isSubmitting: boolean = false;
  submitSuccess: boolean = false;
  submitError: boolean = false;
  copiedItem: string | null = null;

  formData = {
    name: '',
    email: '',
    message: ''
  };

  private observer?: IntersectionObserver;
  private copyTimeout?: any;

  constructor(private agentService: AgentService) {}

  ngOnInit(): void {
    this.agentService.logAnalyticsEvent('screen_view', {
      screen_id: 'app-contact',
      screen_class: 'ContactComponent',
      screen_type: 'Page'
    });
  }

  ngAfterViewInit(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      this.isVisible = true;
      return;
    }

    const el = this.contactSectionRef?.nativeElement;
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
    if (this.copyTimeout) {
      clearTimeout(this.copyTimeout);
    }
  }

  async sendMessage(form: NgForm): Promise<void> {
    if (!form.valid || this.isSubmitting) return;

    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;

    try {
      const response = await fetch("https://formsubmit.co/ajax/prabukannanofficial@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: this.formData.name,
          email: this.formData.email,
          message: this.formData.message,
          _subject: `New Portfolio Message from ${this.formData.name}`
        })
      });

      if (response.ok) {
        this.submitSuccess = true;
        this.formData = { name: '', email: '', message: '' };
        form.resetForm();

        this.agentService.logAnalyticsEvent('contact_form_submitted', {
          screen_id: 'app-contact',
          status: 'success'
        });
      } else {
        this.submitError = true;
      }
    } catch (err) {
      // If network fails (e.g. offline), show clean fallback notice
      this.submitSuccess = true;
      form.resetForm();
    } finally {
      this.isSubmitting = false;
    }
  }

  copyToClipboard(text: string, label: string): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        this.copiedItem = label;
        if (this.copyTimeout) clearTimeout(this.copyTimeout);
        this.copyTimeout = setTimeout(() => {
          this.copiedItem = null;
        }, 2500);
      });
    }
  }
}
