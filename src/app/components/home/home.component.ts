import { Component } from '@angular/core';
import { AgentService } from '../../agent.service';
// import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private agentService: AgentService) { }

  ngOnInit() {
    this.agentService.logAnalyticsEvent('web_initialized', {
      screen_id: 'app-home',
      screen_class: 'AppHome',
      screen_type: 'Page'
    })
  }
}
