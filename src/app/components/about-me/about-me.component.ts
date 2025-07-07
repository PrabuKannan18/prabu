import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AgentService } from '../../agent.service';

@Component({
  selector: 'app-about-me',
  imports: [RouterLink],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})
export class AboutMeComponent {
  constructor(private agentService: AgentService) { }

  ionViewDidEnter() {
    this.agentService.logAnalyticsEvent('screen_view', {
      screen_id: 'app-about-me',
      screen_class: 'AboutMeComponent',
      screen_type: 'Page'
    })
  }
}
