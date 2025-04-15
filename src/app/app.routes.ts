import { Routes } from '@angular/router';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SkillsComponent } from './components/skills/skills.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, 
    { path: 'about', component: AboutMeComponent },
    { path: 'skills', component: SkillsComponent },
    {path: 'projects', component: ProjectsComponent},
    {path: 'contact', component: ContactComponent}
];
