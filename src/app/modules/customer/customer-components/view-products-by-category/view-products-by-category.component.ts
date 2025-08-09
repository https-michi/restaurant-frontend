import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CustomerService} from "../../customer-services/customer.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-view-products-by-category',
  templateUrl: './view-products-by-category.component.html',
  styleUrls: ['./view-products-by-category.component.scss']
})
export class ViewProductsByCategoryComponent {
  categoryId: number = this.activatedRoute.snapshot.params['categoryId']
  Products = [];
  validateForm!: FormGroup;
  notificationMessage: string = '';

  constructor(private activatedRoute: ActivatedRoute, private customerService: CustomerService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]]
    });
    this.getProductsByCategory();
  }

  onSearch(): void {
    if (this.validateForm.invalid) return;
    const searchTerm = this.validateForm.get('title')?.value || '';
    this.customerService.getProductsByCategoryAndTitle(this.categoryId, searchTerm)
      .subscribe((res) => {
        this.Products = [];
        console.log(res);
        res.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
          this.Products.push(element);
        });
      });
  }

  private getProductsByCategory() {
    this.Products = [];
    this.customerService.getProductsByCategory(this.categoryId).subscribe((res) => {
      console.log(res);
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.Products.push(element);
      });
    });
  }

  clearSearch() {
    this.validateForm.reset();
    this.getProductsByCategory();
  }
}
