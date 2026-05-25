import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { InventarioService, Producto } from '../../services/inventario';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventario.html',
  styleUrl: './inventario.css'
})
export class InventarioComponent implements OnInit {
  // Inventario
  productos: Producto[] = [];
  cargando = true;
  errorInventario = '';

  // Movimiento
  productoId: number | null = null;
  tipo = '';
  cantidad: number | null = null;
  registrando = false;
  toast: { tipo: 'success' | 'error', mensaje: string } | null = null;

  constructor(
    private inventarioService: InventarioService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarInventario();
  }

  cargarInventario() {
    this.cargando = true;
    this.inventarioService.getInventario().subscribe({
      next: (data) => {
        this.productos = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorInventario = 'Error al cargar el inventario';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  registrar() {
    if (!this.productoId || !this.tipo || !this.cantidad || this.cantidad <= 0) {
      this.mostrarToast('error', 'Todos los campos son obligatorios y la cantidad debe ser mayor a 0');
      return;
    }

    this.registrando = true;

    this.inventarioService.registrarMovimiento({
      productoId: this.productoId,
      tipo: this.tipo,
      cantidad: this.cantidad
    }).subscribe({
      next: () => {
        this.mostrarToast('success', 'Movimiento registrado correctamente');
        this.productoId = null;
        this.tipo = '';
        this.cantidad = null;
        this.registrando = false;
        this.cargarInventario(); // refresca la tabla
      },
      error: (err) => {
        this.mostrarToast('error', err.error?.message || 'Error al registrar el movimiento');
        this.registrando = false;
      }
    });
  }

  mostrarToast(tipo: 'success' | 'error', mensaje: string) {
    this.toast = { tipo, mensaje };
    setTimeout(() => { this.toast = null; this.cdr.detectChanges(); }, 3500);
    this.cdr.detectChanges();
  }

  cerrarSesion() { this.authService.cerrarSesion(); }
}