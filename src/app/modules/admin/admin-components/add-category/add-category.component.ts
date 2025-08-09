import {Component} from '@angular/core';
import {AdminService} from "../../admin-services/admin.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {

  categoryForm: FormGroup;
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;
  alertVisible: boolean = false;
  alertType: string = '';
  alertMessage: string = '';

  constructor(private service: AdminService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required]
    });
  }

  postCategory() {
    if (this.categoryForm.invalid) {
      this.showAlert('Por favor complete todos los campos.', 'danger');
      return;
    }
    console.log(this.categoryForm.value);
    const formData: FormData = new FormData();
    formData.append('name', this.categoryForm.get("name").value);
    formData.append('description', this.categoryForm.get("description").value);
    formData.append("img", this.selectedFile)
    console.log(formData);
    this.service.postCategory(formData).subscribe((res) => {
      console.log(res);
      if (res.id != null) {
        this.showAlert('Categoría agregada exitosamente', 'success');
        this.resetForm();
      } else if (res.id == null) {
        this.showAlert('Error al agregar la categoría', 'danger');
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
    reader.readAsDataURL(this.selectedFile);
  }

  private showAlert(message: string, type: string) {
    this.alertMessage = message;
    this.alertType = type;
    this.alertVisible = true;

    setTimeout(() => {
      this.alertVisible = false;
    }, 1000);
  }

  private resetForm() {
    this.categoryForm.reset();
    this.imagePreview = null;
    this.selectedFile = null;
  }
}

