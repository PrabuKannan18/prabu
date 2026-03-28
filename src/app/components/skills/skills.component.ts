import { Component } from '@angular/core';
import { AgentService } from '../../agent.service';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {

  constructor(private agentService:AgentService) {}

 ionViewDidEnter() {
    this.agentService.logAnalyticsEvent('screen_view', {
      screen_id: 'app-skills',
      screen_class: 'SkillsComponent',
      screen_type: 'Page'
    })
  }
}
