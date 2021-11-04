import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecord } from '../models/Record';



@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/books');
  }

  getOneBook(id: any): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/books/${id}`);
  }

  deleteBook(id: number) {
    return this.http.delete(`http://localhost:3000/books/${id}`);
  }

  createBook(book: IRecord): Observable<IRecord> {
    return this.http.post<IRecord>(`http://localhost:3000/books`, book);
  }

  updateBook(book: any): Observable<any> {
    return this.http.put<any>(
      `http://localhost:3000/books/${book.id}`,
      book
    );
  }

  getRecordsSum(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/total`);
  }

  getAveragePrice(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/average_price`);
  }

}
