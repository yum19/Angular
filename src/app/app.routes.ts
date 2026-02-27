import { Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { ListSuggestionComponent } from './core/list-suggestion/list-suggestion.component';
import { SuggestionFormComponent } from './features/suggestions/suggestion-form/suggestion-form.component';
import { SuggestionDetailsComponent } from './features/suggestions/suggestion-details/suggestion-details.component';
import { NotfoundComponent } from './core/notfound/notfound.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'suggestions', component: ListSuggestionComponent },
  { path: 'suggestions/add', component: SuggestionFormComponent },
  { path: 'suggestions/edit/:id', component: SuggestionFormComponent },
  { path: 'suggestions/:id', component: SuggestionDetailsComponent },
  { path: '**', component: NotfoundComponent }
];