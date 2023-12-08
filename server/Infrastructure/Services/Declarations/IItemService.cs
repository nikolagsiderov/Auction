using Data.DTOs;
using Infrastructure.Models.Item;

namespace Infrastructure.Services.Declarations
{
    public interface IItemService
    {
        IEnumerable<ItemDisplay> GetCollection();
        ItemDisplay? GetEntityByID(long id);
        int Create(CreateItem model, User user);
        void Bid(ItemBid model, User user);
        void BuyNow(ItemBuyNow model, User user);
    }
}
