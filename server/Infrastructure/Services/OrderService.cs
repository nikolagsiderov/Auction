using Data.DTOs;
using Data;
using Infrastructure.Services.Declarations;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly DataContext _dataContext;

        public OrderService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public IEnumerable<Order> GetCollection()
        {
            var result = _dataContext.Orders.ToList();
            return result;
        }

        public Order? GetEntityByID(long id)
        {
            return _dataContext.Orders.FirstOrDefault(x => x.ID == id);
        }
    }
}
