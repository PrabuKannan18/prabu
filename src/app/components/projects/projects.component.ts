import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AgentService } from '../../agent.service';

@Component({
  selector: 'app-projects',
  imports: [RouterLink],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  constructor(private agentService:AgentService) {}

 ionViewDidEnter() {
    this.agentService.logAnalyticsEvent('screen_view', {
      screen_id: 'app-projects',
      screen_class: 'ProjectsComponent',
      screen_type: 'Page'
    })
  }
}
