import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Producto {
  id: number;
  nombre: string;
  cantidad: number;
}

export interface MovimientoRequest {
  productoId: number;
  tipo: string;
  cantidad: number;
}

@Injectable({ providedIn: 'root' })
export class InventarioService {
  private apiUrl = 'http://localhost:5144/productos';

  constructor(private http: HttpClient) {}

  getInventario() {
    return this.http.get<Producto[]>(`${this.apiUrl}/inventario`);
  }

  registrarMovimiento(movimiento: MovimientoRequest) {
    return this.http.post(`${this.apiUrl}/movimiento`, movimiento);
  }
}