import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StorageService} from "../../../auth-services/storage-service/storage.service";
import {Observable} from "rxjs";

const BASIC_URL = 'http://localhost:8080/'

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) {
  }

  getAllCategories(): Observable<any> {
    return this.http.get(BASIC_URL + 'api/customer/categories', {
      headers: this.createAuthorizationHeader()
    });
  }

  getCategoriesByName(title: string): Observable<any> {
    return this.http.get(`${BASIC_URL}api/customer/categories/${title}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  getProductsByCategory(categoryId: number): Observable<any> {
    return this.http.get(`${BASIC_URL}api/customer/${categoryId}/products`, {
      headers: this.createAuthorizationHeader()
    });
  }

  getProductsByCategoryAndTitle(categoryId: number, title: string): Observable<any> {
    return this.http.get(`${BASIC_URL}api/customer/${categoryId}/product/${title}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  postReservation(reservationDTO: any): Observable<any> {
    reservationDTO.customerId = StorageService.getUserId();
    return this.http.post(`${BASIC_URL}api/customer/reservation`, reservationDTO, {
      headers: this.createAuthorizationHeader()
    });
  }


  getReservationsByUser(): Observable<any> {
    return this.http.get(`${BASIC_URL}api/customer/reservations/${StorageService.getUserId()}`, {
      headers: this.createAuthorizationHeader()
    });
  }


  private createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set("Authorization", "Bearer " + StorageService.getToken())
  }
}
