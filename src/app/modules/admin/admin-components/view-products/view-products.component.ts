import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AdminService} from "../../admin-services/admin.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss']
})
export class ViewProductsComponent {
  categoryId: any = this.activatedroute.snapshot.params['categoryId'];
  Products: any = [];
  validateForm!: FormGroup;
  notificationMessage: string = '';


  constructor(
    private activatedroute: ActivatedRoute,
    private adminService: AdminService,
    private fb: FormBuilder
  ) {
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
    this.adminService.getProductsByCategoryAndByTitle(this.categoryId, searchTerm)
      .subscribe((res) => {
        this.Products = [];
        res.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
          this.Products.push(element);
        });
      });
  }

  private getProductsByCategory() {
    this.Products = [];
    this.adminService.getProductsByCategory(this.categoryId).subscribe((res) => {
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

  deleteProduct(productId: any) {
    this.adminService.deleteProduct(productId).subscribe({
      next: () => {
        this.getProductsByCategory();
        this.notificationMessage = 'Producto eliminado correctamente';
        this.clearNotificationMessage();
      },
      error: () => {
        this.notificationMessage = 'Hubo un error al eliminar el producto';
        this.clearNotificationMessage();
      }
    });
  }

  clearNotificationMessage() {
    setTimeout(() => {
      this.notificationMessage = '';
    }, 5000);
  }

}
