import { Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { ListSuggestionComponent } from './core/list-suggestion/list-suggestion.component';
import { SuggestionFormComponent } from './features/suggestions/suggestion-form/suggestion-form.component';
import { NotfoundComponent } from './core/notfound/notfound.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'suggestions', component: ListSuggestionComponent },
  { path: 'suggestions/add', component: SuggestionFormComponent },
  { path: '**', component: NotfoundComponent }
];