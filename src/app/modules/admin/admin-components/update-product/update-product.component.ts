import {Component, signal} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../../admin-services/admin.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent {
  productId: any = this.activatedroute.snapshot.params['productId']
  validateForm!: FormGroup;
  imgChanged = false;
  selectedFile: any;
  imagePreview: string | ArrayBuffer | null = null;
  existingImage: string | null = null;
  alertVisible: boolean = false;
  alertType: string = '';
  alertMessage: string = '';

  constructor(private adminService: AdminService,
              private router: Router,
              private fb: FormBuilder,
              private activatedroute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
    });
    this.getProductById()
  }

  getProductById() {
    this.adminService.getProductById(this.productId).subscribe((res) => {
      console.log(res);
      const productDTO = res;
      this.existingImage = 'data:image/jpeg;base64,' + res.returnedImg;
      this.validateForm.patchValue(productDTO);
    })
  }


  updateProduct() {
    if (this.validateForm.invalid) {
      this.showAlert('Por favor complete todos los campos.', 'danger');
      return;
    }

    const formData: FormData = new FormData();
    if (this.imgChanged && this.selectedFile) {
      formData.append('img', this.selectedFile);
    }
    formData.append('name', this.validateForm.get('name').value);
    formData.append('description', this.validateForm.get('description').value);
    formData.append('price', this.validateForm.get('price').value);
    console.log(formData)
    this.adminService.updateProduct(this.productId, formData).subscribe((res) => {
      if (res.id != null) {
        this.showAlert('Producto actualizado exitosamente', 'success');
        setTimeout(() => this.router.navigateByUrl('/admin/dashboard'), 5000);
      } else {
        this.showAlert('Error al actualizar el producto', 'danger');
      }
    })

  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.imgChanged = true;
    this.previewImage();
  }

  private previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile!);
  }

  resetImage() {
    this.selectedFile = null;
    this.imagePreview = null;
    this.imgChanged = false;
  }

  cancel() {
    // this.router.navigate(['/admin/products']);
  }

  private showAlert(message: string, type: string) {
    this.alertMessage = message;
    this.alertType = type;
    this.alertVisible = true;

    setTimeout(() => {
      this.alertVisible = false;
    }, 5000);
  }
}
