import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CONSTANTS } from '../config/constants';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = CONSTANTS.API.BASE_URL;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, { email, password });
  }

  getPosts(page = 1, status = ''): Observable<any> {
    let params = new HttpParams().set('page', page.toString());
    if (status) {
      params = params.set('status', status);
    }
    return this.http.get<any>(`${this.baseUrl}/posts`, { params });
  }

  // BUG 4: fetches the list endpoint instead of the single-post endpoint.
  // The /${id} segment is missing, so this always returns the paginated list.
  // Fix: return this.http.get<any>(`${this.baseUrl}/posts/${id}`);
  getPostById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/posts`); // BUG 4
  }

  createPost(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/posts`, data);
  }

  updatePostStatus(id: string, status: string): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/posts/${id}/status`, { status });
  }
}
