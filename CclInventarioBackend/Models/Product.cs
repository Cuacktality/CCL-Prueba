
namespace CclInventarioBackend.Models;

public class Product {
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public int Cantidad { get; set; }
}