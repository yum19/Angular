import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/services/suggestion.service';

@Component({
  selector: 'app-suggestion-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './suggestion-details.component.html',
  styleUrl: './suggestion-details.component.css'
})
export class SuggestionDetailsComponent implements OnInit {
  suggestion?: Suggestion;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private suggestionService: SuggestionService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);
    this.suggestionService.getSuggestionById(this.id).subscribe({
      next: (data) => {
        this.suggestion = data;
      },
      error: (err) => {
        console.error('Error loading suggestion:', err);
        alert('Suggestion non trouvée!');
        this.router.navigate(['/suggestions']);
      }
    });
  }

  updateSuggestion(): void {
    this.router.navigate(['/suggestions/edit', this.id]);
  }
}