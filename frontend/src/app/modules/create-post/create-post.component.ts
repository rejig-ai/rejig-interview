import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  postForm!: FormGroup;
  submitting = false;
  error = '';
  success = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      caption: ['', Validators.required],
      platform: ['', Validators.required],
      scheduled_date: ['']
    });
  }

  onSubmit(): void {
    if (this.postForm.invalid) return;

    this.submitting = true;
    this.error = '';

    this.apiService.createPost(this.postForm.value).subscribe({
      next: () => {
        this.success = true;
        setTimeout(() => this.router.navigate(['/dashboard']), 1500);
      },
      error: (err: any) => {
        this.error = err?.error?.message || 'Failed to create post';
        this.submitting = false;
      },
      complete: () => {
        this.submitting = false;
      }
    });
  }
}
