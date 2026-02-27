import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Suggestion } from '../../models/suggestion';
import { SuggestionService } from '../services/suggestion.service';

@Component({
  selector: 'app-list-suggestion',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './list-suggestion.component.html',
  styleUrl: './list-suggestion.component.css'
})
export class ListSuggestionComponent implements OnInit {
  searchText: string = '';
  favorites: Suggestion[] = [];
  suggestions: Suggestion[] = [];

  constructor(private suggestionService: SuggestionService) {}

  ngOnInit(): void {
    this.loadSuggestions();
  }

  loadSuggestions(): void {
    this.suggestionService.getSuggestionsList().subscribe({
      next: (data) => {
        this.suggestions = data;
      },
      error: (err) => {
        console.error('Error loading suggestions:', err);
        alert('Erreur lors du chargement des suggestions');
      }
    });
  }

  likeSuggestion(suggestion: Suggestion): void {
    const newLikes = suggestion.nbLikes + 1;
    this.suggestionService.updateLikes(suggestion.id, newLikes).subscribe({
      next: () => {
        suggestion.nbLikes = newLikes;
      },
      error: (err) => {
        console.error('Error updating likes:', err);
      }
    });
  }

  deleteSuggestion(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette suggestion?')) {
      this.suggestionService.deleteSuggestion(id).subscribe({
        next: () => {
          alert('Suggestion supprimée avec succès!');
          this.loadSuggestions(); // Reload list
        },
        error: (err) => {
          console.error('Error deleting suggestion:', err);
          alert('Erreur lors de la suppression');
        }
      });
    }
  }

  addToFavorites(suggestion: Suggestion): void {
    if (!this.favorites.find(s => s.id === suggestion.id)) {
      this.favorites.push(suggestion);
      alert(`"${suggestion.title}" ajouté aux favoris!`);
    }
  }

  get filteredSuggestions(): Suggestion[] {
    if (!this.searchText) {
      return this.suggestions;
    }
    
    const search = this.searchText.toLowerCase();
    return this.suggestions.filter(s => 
      s.title.toLowerCase().includes(search) || 
      s.category.toLowerCase().includes(search)
    );
  }
}