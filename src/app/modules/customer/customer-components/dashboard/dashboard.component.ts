import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {distinctUntilChanged, Subject, switchMap} from "rxjs";
import {AdminService} from "../../../admin/admin-services/admin.service";
import {CustomerService} from "../../customer-services/customer.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  categories: any = [];
  validateForm!: FormGroup;
  private searchTerms = new Subject<string>();

  constructor(private customerService: CustomerService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]]
    });
    this.searchTerms.pipe(
      distinctUntilChanged(),
      switchMap((term: string) =>
        this.customerService.getCategoriesByName(term)
      )
    ).subscribe((res) => {
      this.categories = [];
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.categories.push(element);
      });
    });
    this.getAllCategories();
  }

  onSearch(): void {
    const searchTerm = this.validateForm.get('title')?.value || '';
    if (searchTerm.trim() === '') {
      this.getAllCategories();
    } else {
      this.searchTerms.next(searchTerm);
    }
  }

  private getAllCategories() {
    this.categories = [];
    this.customerService.getAllCategories().subscribe((res) => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.categories.push(element);
      });
    });
  }

  clearSearch() {
    this.validateForm.reset();
    this.getAllCategories();
  }
}
