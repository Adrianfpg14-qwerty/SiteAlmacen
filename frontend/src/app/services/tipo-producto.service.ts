import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tipoProductoI } from '../models/tipoProducto';

@Injectable({
  providedIn: 'root',
})
export class TipoProductoService {
  api_uri_nodejs = 'http://localhost:3008';
  api_uri_django = 'http://localhost:8000';
  base_path = `${this.api_uri_django}/tipoProductos/`;
  constructor(private http: HttpClient) {}

  getAlltipoProducto(): Observable<{ tipoProductos: tipoProductoI[] }> {
    return this.http.get<{ tipoProductos: tipoProductoI[] }>(this.base_path);
  }

  getOnetipoProducto(id: number): Observable<{ tipoProducto: tipoProductoI[] }> {
    return this.http.get<{ tipoProducto: tipoProductoI[] }>(`${this.base_path}${id}`);
  }

  createtipoProducto(data: any): Observable<tipoProductoI> {
    return this.http.post<tipoProductoI>(this.base_path, data);
  }

  updatetipoProducto(id: number, data: any): Observable<tipoProductoI> {
    return this.http.put<tipoProductoI>(`${this.base_path}${id}`, data);
  }
  
  deletetipoProducto(id: number): Observable<tipoProductoI> {
    return this.http.delete<tipoProductoI>(`${this.base_path}${id}`);
  }
}
