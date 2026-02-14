import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestion-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './suggestion-form.component.html',
  styleUrl: './suggestion-form.component.css'
})
export class SuggestionFormComponent implements OnInit {
  suggestionForm!: FormGroup;
  
  categories: string[] = [
    'Événements',
    'Technologie',
    'Ressources Humaines',
    'Infrastructure',
    'Formation'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.suggestionForm = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^[A-Z][a-zA-Z ]*$')
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(30)
      ]],
      category: ['', Validators.required],
      date: [{ value: new Date().toISOString().substring(0, 10), disabled: true }],
      status: [{ value: 'en_attente', disabled: true }]
    });
  }

  onSubmit(): void {
    if (this.suggestionForm.valid) {
      const formValue = this.suggestionForm.getRawValue();
      
      const newSuggestion: Suggestion = {
        id: this.generateId(),
        title: formValue.title,
        description: formValue.description,
        category: formValue.category,
        date: new Date(formValue.date),
        status: formValue.status,
        nbLikes: 0
      };

      // Here you would typically save to a service
      console.log('New Suggestion:', newSuggestion);
      
      // Save to localStorage for demonstration
      this.saveSuggestion(newSuggestion);
      
      alert('Suggestion ajoutée avec succès!');
      this.router.navigate(['/suggestions']);
    }
  }

  private generateId(): number {
    const suggestions = this.getSuggestions();
    return suggestions.length > 0 ? Math.max(...suggestions.map(s => s.id)) + 1 : 1;
  }

  private saveSuggestion(suggestion: Suggestion): void {
    const suggestions = this.getSuggestions();
    suggestions.push(suggestion);
    localStorage.setItem('suggestions', JSON.stringify(suggestions));
  }

  private getSuggestions(): Suggestion[] {
    const stored = localStorage.getItem('suggestions');
    return stored ? JSON.parse(stored) : [];
  }

  // Getter methods for form controls
  get title() {
    return this.suggestionForm.get('title');
  }

  get description() {
    return this.suggestionForm.get('description');
  }

  get category() {
    return this.suggestionForm.get('category');
  }
}