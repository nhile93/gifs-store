import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GiphyService {
  
  commonParams = {
    api_key: 'TiJXJEZ1JV79IlACuZvOAkb1ZrmoOYT2',
    random_id: 'e826c9fc5c929e0d6c6d423841a282aa',
    bundle: 'messaging_non_clips',
  }
  constructor(private http: HttpClient) {}

  getTrending(limit?: any, offset?: any): Observable<any> {
    const addParams = {
      limit: limit || 20,
      offset: offset || 0,
    };
    const params = { ...this.commonParams, ...addParams };

    return this.http
      .get('http://api.giphy.com/v1/gifs/trending', { params: params })
      .pipe(
        map((res: any) => {
          return res.data;
        })
    );
  }

  search(query: string): Observable<any> {
    const addParams = {
      q: query
    };
    const params = { ...this.commonParams, ...addParams };
    return this.http
      .get('http://api.giphy.com/v1/gifs/search', { params: params })
      .pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }

}
