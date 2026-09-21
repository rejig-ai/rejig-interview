import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CreatePostRoutingModule } from './create-post-routing.module';
import { CreatePostComponent } from './create-post.component';

@NgModule({
  declarations: [CreatePostComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CreatePostRoutingModule
  ]
})
export class CreatePostModule {}
