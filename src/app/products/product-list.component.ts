import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Product } from "./product";
import { ProductService } from "./product.service";

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  constructor(private productService: ProductService) {}

  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  errorMessage: string = '';
  sub!: Subscription;

  private _listfilter = "";
  get listFilter(): string {
    return this._listfilter;
  }
  set listFilter(value: string) {
    this._listfilter = value;
    this.filteredProducts = this.preformFilter(value);
  }

  toggleImage = (): void => {
    this.showImage = !this.showImage;
  }

  preformFilter = (filterBy: string): Product[] => {
    filterBy = filterBy.toLocaleLowerCase();
    console.log(filterBy);
    return this.products.filter(x => x.productName.toLocaleLowerCase().includes(filterBy))
  }

  ngOnInit(): void {
    // this.products = [...data];
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: error =>this.errorMessage = error
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onRatingClicked = (message: string): void => {
    this.pageTitle = `Product List: ${message}`;
  }
}
