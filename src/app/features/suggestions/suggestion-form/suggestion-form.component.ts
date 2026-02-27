import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/services/suggestion.service';

@Component({
  selector: 'app-suggestion-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './suggestion-form.component.html',
  styleUrl: './suggestion-form.component.css'
})
export class SuggestionFormComponent implements OnInit {
  suggestionForm!: FormGroup;
  isEditMode = false;
  suggestionId?: number;
  
  categories: string[] = [
    'Événements',
    'Technologie',
    'Ressources Humaines',
    'Infrastructure',
    'Formation'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private suggestionService: SuggestionService
  ) {}

  ngOnInit(): void {
    this.initForm();
    
    // Check if we're in edit mode
    this.suggestionId = Number(this.route.snapshot.params['id']);
    if (this.suggestionId) {
      this.isEditMode = true;
      this.loadSuggestion(this.suggestionId);
    }
  }

  initForm(): void {
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

  loadSuggestion(id: number): void {
    this.suggestionService.getSuggestionById(id).subscribe({
      next: (data) => {
        this.suggestionForm.patchValue({
          title: data.title,
          description: data.description,
          category: data.category,
          date: new Date(data.date).toISOString().substring(0, 10),
          status: data.status
        });
      },
      error: (err) => {
        console.error('Error loading suggestion:', err);
        alert('Erreur lors du chargement de la suggestion');
        this.router.navigate(['/suggestions']);
      }
    });
  }

  onSubmit(): void {
    if (this.suggestionForm.valid) {
      const formValue = this.suggestionForm.getRawValue();
      
      const suggestion: any = {
        title: formValue.title,
        description: formValue.description,
        category: formValue.category,
        date: new Date(formValue.date),
        status: formValue.status,
        nbLikes: 0
      };

      if (this.isEditMode && this.suggestionId) {
        // Update existing suggestion
        this.suggestionService.updateSuggestion(this.suggestionId, suggestion).subscribe({
          next: () => {
            alert('Suggestion mise à jour avec succès!');
            this.router.navigate(['/suggestions']);
          },
          error: (err) => {
            console.error('Error updating suggestion:', err);
            alert('Erreur lors de la mise à jour');
          }
        });
      } else {
        // Add new suggestion
        this.suggestionService.addSuggestion(suggestion).subscribe({
          next: () => {
            alert('Suggestion ajoutée avec succès!');
            this.router.navigate(['/suggestions']);
          },
          error: (err) => {
            console.error('Error adding suggestion:', err);
            alert('Erreur lors de l\'ajout');
          }
        });
      }
    }
  }

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