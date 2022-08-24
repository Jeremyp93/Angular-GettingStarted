import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { Product } from "./product";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productUrl: string = 'api/products/products.json';

    constructor(private http: HttpClient) {}

    getProducts= (): Observable<Product[]> => {
        return this.http.get<Product[]>(this.productUrl).pipe(
            tap(data => console.log(`All: ${JSON.stringify(data)}`)),
            catchError(this.handleError)
        );
    }

    private handleError = (err: HttpErrorResponse) => {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occured: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(() => errorMessage);
    }
}