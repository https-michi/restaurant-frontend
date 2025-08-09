import {Component} from '@angular/core';
import {AdminService} from "../../admin-services/admin.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {debounceTime, distinctUntilChanged, Subject, switchMap} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  categories: any = [];
  validateForm!: FormGroup;
  private searchTerms = new Subject<string>();

  constructor(private adminService: AdminService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]]
    });
    this.searchTerms.pipe(
      distinctUntilChanged(),
      switchMap((term: string) =>
        this.adminService.getAllCategoriesTitle(term)
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
    this.searchTerms.next(searchTerm);
  }

  private getAllCategories() {
    this.categories = [];
    this.adminService.getAllCategories().subscribe((res) => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.categories.push(element);
      });
    });
  }

  clearSearch() {
    this.validateForm.reset();
    this.searchTerms.next('');
    this.getAllCategories();
  }
}

