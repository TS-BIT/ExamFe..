import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IRecord } from 'src/app/models/Record';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  constructor(private _booksService: BooksService) {
  }

  books: IRecord[] = [];
  filteredBooks: IRecord[] = [];
  field: string = '';
  sortAsc: boolean = true;
  dataLoaded: boolean = false;
  total_records: number = 0;
  average_price: number = 0;
  recordsLoaded: boolean = false;
  stateError: any = undefined;


  @ViewChild('newBook') newBook!: NgForm;
  @ViewChild('title') title!: NgForm;
  @ViewChild('price') price!: NgForm;
  @ViewChild('discount_price') discount_price!: NgForm;
  @ViewChild('priceInput') priceInput!: NgForm;
  @ViewChild('discount_priceInput') discount_priceInput!: NgForm;
  @ViewChild('dateInput') dateInput!: NgForm;
  @ViewChild('checkInput') checkInput!: NgForm;

  ngOnInit(): void {
    if (this.stateError) {
      alert(`${this.stateError} Please choose book from a list.`);
    }
    this._booksService.getAllBooks().subscribe(
      (res) => {
        this.books = res;
        this.filteredBooks = this.books;
        this.dataLoaded = true;
      },
      (err) => {
        console.log(err);
        this.dataLoaded = true;
      }
    );
    this.getBooksSum();
    this.getAveragePrice();
  }

  onFilter($event: any): void {
    let inp = $event.target.value.toLocaleLowerCase();
    this.filteredBooks = this.books.filter(
      (pl) => pl.title.toLocaleLowerCase().indexOf(inp) != -1
    );
  }

  onSort(field: string): void {
    let fieldAsKey = field as keyof IRecord;
    this.field = field;
    if (this.sortAsc) {
      this.filteredBooks.sort((a, b) => {
        return a[fieldAsKey] < b[fieldAsKey] ? -1 : 0;
      });
      this.sortAsc = !this.sortAsc;
    } else {
      this.filteredBooks.sort((a, b) => {
        return a[fieldAsKey] > b[fieldAsKey] ? -1 : 0;
      });
      this.sortAsc = !this.sortAsc;
    }
  }

  addBook() {
    if (this.newBook.valid) {
      this._booksService
        .createBook({ sale: 0, ...this.newBook.value })
        .subscribe(
          (res) => {
            this.books.push(res);
            this.filteredBooks = this.books;
            alert(
              `Book with title ${this.title.value} successfuly added to DB!`
            );
            this.getBooksSum();
            this.getAveragePrice();
          },
          (err) => console.log(err)
        );
    }
  }

  onDelete(id: number): void {
    this._booksService.deleteBook(id).subscribe(
      (res) => {
        alert(
          `Book ${
            this.books.find((pl) => pl.id == id)?.id
          } successfuly deleted from DB!`
        );
        this.books = this.books.filter((pl) => pl.id !== id);
        this.filteredBooks = this.books;
        this.getBooksSum();
        this.getAveragePrice();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onUpdate(book: IRecord): void {
    console.log(book.price);
    console.log(book.discount_price);
    //book.price = book.price;
    //book.discount_price = book.discount_price;
    this._booksService.updateBook(book).subscribe(
      (res) => {
        alert(
          `Book ${
            this.books.find((pl) => pl.id == book.id)?.id
          } successfuly updated in DB!`
        );
        console.log(res);
        this.getBooksSum();
        this.getAveragePrice();
      },
      (err) => {
        alert(err.error.errors[0].msg);
      }
    );
  }

  getBooksSum() {
    this._booksService.getRecordsSum().subscribe(
      (res) => {
        this.total_records = res.total_books;
        this.recordsLoaded = true;
      },
      (err) => console.log(err)
    );
  }

  getAveragePrice() {
    this._booksService.getAveragePrice().subscribe(
      (res) => {
        this.average_price = res.average_price;
        this.recordsLoaded = true;
      },
      (err) => console.log(err)
    );
  }

}
