using CclInventarioBackend.Data;
using CclInventarioBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CclInventarioBackend.Controllers;

[ApiController]
[Route("productos")]
[Authorize]
public class ProductController : ControllerBase {
    private readonly AppDbContext _db;

    public ProductController(AppDbContext db) {
        _db = db;
    }

    [HttpGet("inventario")]
    public async Task<IActionResult> GetInventario() {
        var productos = await _db.Productos.ToListAsync();
        return Ok(productos);
    }

    [HttpPost("movimiento")]
    public async Task<IActionResult> RegistrarMovimiento([FromBody] MovimientoRequest request) {
        var producto = await _db.Productos.FindAsync(request.ProductoId);

        if (producto == null) return NotFound(new { message = "Producto no encontrado" });
        if (request.Tipo == "salida" && producto.Cantidad < request.Cantidad) 
            return BadRequest(new { message = "Stock Insuficiente. No se puede realizar la operación" });

        if (request.Tipo == "entrada") producto.Cantidad += request.Cantidad;
        else if (request.Tipo == "salida") producto.Cantidad -= request.Cantidad;
        else return BadRequest(new { message = "Tipo debe ser 'ENTRADA' o 'SALIDA'" });

        await _db.SaveChangesAsync();

        return Ok(new {
            message = $"Movimiento registrado correctamente",
            productoId = producto.Id,
            nombre = producto.Nombre,
            cantidadActual = producto.Cantidad
        });
    }
}

public record MovimientoRequest(int ProductoId, string Tipo, int Cantidad);