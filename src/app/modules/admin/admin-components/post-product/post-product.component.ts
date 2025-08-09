import {Component} from '@angular/core';
import {AdminService} from "../../admin-services/admin.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss']
})
export class PostProductComponent {

  categoryId: number = this.activatedroute.snapshot.params['categoryId'];
  validateForm!: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  alertVisible: boolean = false;
  alertType: string = '';
  alertMessage: string = '';

  constructor(private fb: FormBuilder,
              private router: Router,
              private activatedroute: ActivatedRoute,
              private adminService: AdminService) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
    });
  }

  postProduct() {
    if (this.validateForm.invalid) {
      this.showAlert('Por favor complete todos los campos.', 'danger');
      return;
    }
    console.log(this.validateForm.value);
    const formData: FormData = new FormData();
    formData.append('name', this.validateForm.get("name").value);
    formData.append('description', this.validateForm.get("description").value);
    formData.append('price', this.validateForm.get("price").value);
    formData.append('img', this.selectedFile);
    console.log(formData);
    this.adminService.postProduct(this.categoryId, formData).subscribe((res) => {
      if (res.id != null) {
        this.showAlert('Producto agregado exitosamente', 'success');
        this.resetForm();
        setTimeout(() => this.router.navigateByUrl('/admin/dashboard'), 1000);
      } else {
        this.showAlert('Error al agregar el producto', 'danger');
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  private previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile!);
  }

  private showAlert(message: string, type: string) {
    this.alertMessage = message;
    this.alertType = type;
    this.alertVisible = true;

    setTimeout(() => {
      this.alertVisible = false;
    }, 5000);
  }

  private resetForm() {
    this.validateForm.reset();
    this.imagePreview = null;
    this.selectedFile = null;
  }
}
