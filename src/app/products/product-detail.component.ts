import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product: Product | undefined;
  sub!: Subscription;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.sub = this.productService.getProducts().subscribe({
      next: products => this.product = products.find(x => x.productId === productId),
      error: error =>this.errorMessage = error
    });
  }

  onBack = (): void => { this.router.navigate(['/products']); }

}
