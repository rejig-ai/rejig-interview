import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../../services/api.service";
import { Post } from "../../models/post.model";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  selectedStatus = "";
  loading = false;
  currentPage = 1;
  totalPosts = 0;
  limit = 10;

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading = true;
    this.apiService.getPosts(this.currentPage, this.selectedStatus).subscribe({
      next: (res: any) => {
        this.posts = res.data.posts;
        this.totalPosts = res.data.total;
        this.applyFilter();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  applyFilter(): void {
    if (!this.selectedStatus) {
      this.filteredPosts = this.posts;
      return;
    }
    this.filteredPosts = this.posts.filter(
      (p) => p.status !== this.selectedStatus,
    );
  }

  onStatusChange(): void {
    this.applyFilter();
  }

  get totalPages(): number {
    return Math.ceil(this.totalPosts / this.limit);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadPosts();
  }

  logout(): void {
    localStorage.removeItem("rejig_token");
    localStorage.removeItem("rejig_user");
    this.router.navigate(["/login"]);
  }

  getUserName(): string {
    try {
      const user = JSON.parse(localStorage.getItem("rejig_user") || "{}");
      return user.name || "User";
    } catch {
      return "User";
    }
  }
}
