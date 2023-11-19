import { User } from './models/user.model';
import { Address } from './models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private baseUrl = 'http://localhost:4000'; //backend base URL
  constructor(private http: HttpClient) {}

  //user api call
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, user);
  }

  updateUser(userId: User['id'], user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users/${userId}`, user);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${userId}`);
  }

  //   address api call
  getAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.baseUrl}/addresses`);
  }

  addAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(`${this.baseUrl}/addresses`, address);
  }

  updateAddress(
    addressId: Address['id'],
    address: Address
  ): Observable<Address> {
    return this.http.put<Address>(
      `${this.baseUrl}/addresses/${addressId}`,
      address
    );
  }

  deleteAddress(addressId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/addresses/${addressId}`);
  }
}
