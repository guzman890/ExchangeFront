import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private host = ""
  private headers = new HttpHeaders(
    { 
      'Content-Type'                  : 'application/json',
    }
  );
 
  constructor(
    private http: HttpClient
    ) { }

    getCurrency(){
      const url = `${this.host}/currency`;
      return this.http.get<any[]>(url, {headers: this.headers})
          .pipe(catchError(this.handleError));
    }
  
    getExchangerateByoriginIdAndforeignId( origin, foreign){
      const url = `${this.host}/exchangerate/`+origin+`/`+foreign;
      return this.http.get<any>(url, {headers: this.headers})
          .pipe(catchError(this.handleError));
    }

    getExchangerateById( id ){
      const url = `${this.host}/exchangerate/`+id;
      return this.http.get<any>(url, {headers: this.headers})
          .pipe(catchError(this.handleError));
    }

    postExchangerate( exchangerate){
      const url = `${this.host}/exchangerate`;
      return this.http.post<any[]>(url, exchangerate, {headers: this.headers})
          .pipe(catchError(this.handleError));
    }

    postExchange( exchange){
      const url = `${this.host}/exchange`;
      return this.http.post<any[]>(url, exchange, {headers: this.headers})
          .pipe(catchError(this.handleError));
    }

    postLogin( login ){
      const url = `${this.host}/auth/authenticate`;
      return this.http.post<any[]>(url, login, {headers: this.headers})
          .pipe(catchError(this.handleError));
    }

    private handleError(error: any): Observable<any> {
      console.log('error al conectarse con servidor');
      console.error('An error occurred', error || '');
      return throwError(error);
    }
}
