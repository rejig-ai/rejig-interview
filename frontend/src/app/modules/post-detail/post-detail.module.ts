import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PostDetailRoutingModule } from './post-detail-routing.module';
import { PostDetailComponent } from './post-detail.component';

@NgModule({
  declarations: [PostDetailComponent],
  imports: [
    CommonModule,
    RouterModule,
    PostDetailRoutingModule
  ]
})
export class PostDetailModule {}
