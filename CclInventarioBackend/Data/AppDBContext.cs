using CclInventarioBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace CclInventarioBackend.Data;

public class AppDbContext : DbContext {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Product> Productos { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        modelBuilder.Entity<Product>().ToTable("productos");
        modelBuilder.Entity<Product>().Property(p => p.Id).HasColumnName("id");
        modelBuilder.Entity<Product>().Property(p => p.Nombre).HasColumnName("nombre");
        modelBuilder.Entity<Product>().Property(p => p.Cantidad).HasColumnName("cantidad");
    }
}