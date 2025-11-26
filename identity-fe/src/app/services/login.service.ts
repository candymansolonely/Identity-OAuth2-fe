import { inject, Injectable } from '@angular/core';
import { BaseService } from './base-service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {
  override url = '/account';
  private http = inject(HttpClient);

  login(data: any): Observable<any> {
    return this.httpClient.post(
      this.baseUrl + this.url + '/login',
      data,
      {
        withCredentials: true
      }
    );
  }
  getLoginURL(data: any, responseType: any): Observable<any> {
    return this.get(`${this.url}` + '/GetLoginUrl', data, responseType);
  }
}
