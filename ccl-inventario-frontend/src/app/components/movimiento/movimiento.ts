import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InventarioService, Producto } from '../../services/inventario';

@Component({
  selector: 'app-movimiento',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './movimiento.html',
  styleUrl: './movimiento.css'
})
export class MovimientoComponent implements OnInit {
  productos: Producto[] = [];
  productoId: number | null = null;
  tipo = '';
  cantidad: number | null = null;
  mensaje = '';
  error = '';
  cargando = false;

  constructor(private inventarioService: InventarioService, private router: Router) {}

  ngOnInit() {
    this.inventarioService.getInventario().subscribe({
      next: (data) => this.productos = data
    });
  }

  registrar() {
    if (!this.productoId || !this.tipo || !this.cantidad || this.cantidad <= 0) {
      this.error = 'Todos los campos son obligatorios y la cantidad debe ser mayor a 0';
      return;
    }

    this.cargando = true;
    this.error = '';
    this.mensaje = '';

    this.inventarioService.registrarMovimiento({
      productoId: this.productoId,
      tipo: this.tipo,
      cantidad: this.cantidad
    }).subscribe({
      next: () => {
        this.mensaje = 'Movimiento registrado correctamente';
        this.cargando = false;
        this.productoId = null;
        this.tipo = '';
        this.cantidad = null;
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al registrar el movimiento';
        this.cargando = false;
      }
    });
  }

  irAInventario() { this.router.navigate(['/inventario']); }
}