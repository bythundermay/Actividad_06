import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IUser } from '../interfaces/iuser.interfaces';
import { Observable, lastValueFrom } from 'rxjs';
import { Idatos } from '../interfaces/idatos.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  httpClient = inject(HttpClient);
  baseUrl = 'https://peticiones.online/api/users'

  getUsersByPage(page: number): Observable<Idatos> {
    return this.httpClient.get<Idatos>(`${this.baseUrl}?page=${page}`)
  }

  // getUserById(id: string): Observable<IUser> {
  //   return this.httpClient.get<IUser>(`${this.baseUrl}/${id}`);

  // }

  getById(id: string) : Promise<IUser>{
    return lastValueFrom(this.httpClient.get<IUser>(`${this.baseUrl}/${id}`))
  } 

  delete(id: string): Promise<IUser>{
    return lastValueFrom(this.httpClient.delete<IUser>(`${this.baseUrl}/${id}`))
  }

  insert(formValue: IUser): Promise<IUser>{
    return lastValueFrom(this.httpClient.post<IUser>(this.baseUrl, formValue))
  } 

  update(formValue: IUser): Promise<IUser>{
    return lastValueFrom(this.httpClient.put<IUser>(`${this.baseUrl}/${formValue._id}`, formValue))
  }

  
}
