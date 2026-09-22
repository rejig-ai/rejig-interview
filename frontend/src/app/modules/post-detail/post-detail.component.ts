import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "../../services/api.service";
import { Post } from "../../models/post.model";

@Component({
  selector: "app-post-detail",
  templateUrl: "./post-detail.component.html",
  styleUrls: ["./post-detail.component.scss"],
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null;
  loading = false;
  updating = false;
  error = "";

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.loadPost(id);
    }
  }

  loadPost(id: string): void {
    this.loading = true;
    this.error = "";

    this.apiService.getPostById(id).subscribe({
      next: (res: any) => {
        this.post = res.data;
        this.loading = false;
      },
      error: () => {
        this.error = "Post not found";
        this.loading = false;
      },
    });
  }

  toggleStatus(): void {
    if (!this.post) return;

    const newStatus = this.post.status === "draft" ? "published" : "draft";
    this.updating = true;

    this.apiService.updatePostStatus(this.post._id, newStatus).subscribe({
      next: (res: any) => {
        this.post = res.data;
        this.updating = false;
      },
      error: () => {
        this.updating = false;
      },
    });
  }
}
