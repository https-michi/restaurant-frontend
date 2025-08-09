import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StorageService} from "../../../auth-services/storage-service/storage.service";

const BASIC_URL = 'http://localhost:8080/'

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) {
  }

  postCategory(categoryDTO: any): Observable<any> {
    return this.http.post(BASIC_URL + 'api/admin/category', categoryDTO, {
      headers: this.createAuthorizationHeader()
    });
  }

  getAllCategories(): Observable<any> {
    console.log(this.createAuthorizationHeader())
    return this.http.get(BASIC_URL + 'api/admin/categories', {
      headers: this.createAuthorizationHeader()
    });
  }

  // getAllCategoriesTitle(title: string): Observable<any> {
  //   return this.http.get(`${BASIC_URL}api/admin/categories/${title}`, {
  //     headers: this.createAuthorizationHeader()
  //   });
  // }
  getAllCategoriesTitle(title: string): Observable<any> {
    const url = title ? `${BASIC_URL}api/admin/categories/${title}` : `${BASIC_URL}api/admin/categories`;
    return this.http.get(url, {
      headers: this.createAuthorizationHeader()
    });
  }

  postProduct(categoryId: number, productDTO: any): Observable<any> {
    return this.http.post<any>(`${BASIC_URL}api/admin/${categoryId}/product`, productDTO, {
      headers: this.createAuthorizationHeader()
    });
  }

  getProductsByCategory(categoryId: number): Observable<any> {
    return this.http.get<[]>(`${BASIC_URL}api/admin/${categoryId}/products`, {
      headers: this.createAuthorizationHeader()
    });
  }

  // getProductsByCategoryAndByTitle(categoryId: number, title: string): Observable<any> {
  //   const url = title ? `${BASIC_URL}api/admin/categories/${categoryId}/products?title=${title}` : `${BASIC_URL}api/admin/categories/${categoryId}/products`;
  //   return this.http.get(url, {
  //     headers: this.createAuthorizationHeader()
  //   });
  // }

  getProductsByCategoryAndByTitle(categoryId: number, title: string): Observable<any> {
    return this.http.get<[]>(`${BASIC_URL}api/admin/${categoryId}/product/${title}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete<[]>(`${BASIC_URL}api/admin/product/${productId}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  getProductById(productId: number): Observable<any> {
    return this.http.get<[]>(`${BASIC_URL}api/admin/product/${productId}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  updateProduct(productId: number, productDTO: any): Observable<any> {
    return this.http.put<[]>(`${BASIC_URL}api/admin/product/${productId}`, productDTO, {
      headers: this.createAuthorizationHeader()
    });
  }

  // updateProduct(productId: number, formData: FormData): Observable<any> {
  //   return this.http.put(`${BASIC_URL}api/admin/product/${productId}`, formData, {
  //     headers: this.createAuthorizationHeader()
  //   });
  // }

  getReservations(): Observable<any> {
    return this.http.get<[]>(`${BASIC_URL}api/admin/reservations`, {
      headers: this.createAuthorizationHeader()
    });
  }

  changeReservationStatus(reservationId: number, status: string): Observable<any> {
    return this.http.get<[]>(`${BASIC_URL}api/admin/reservation/${reservationId}/${status}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  private createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set("Authorization", "Bearer " + StorageService.getToken())
  }

}
