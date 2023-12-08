using Data.DTOs;

namespace Infrastructure.Services.Declarations
{
    public interface IOrderService
    {
        IEnumerable<Order> GetCollection();
        Order? GetEntityByID(long id);
    }
}
