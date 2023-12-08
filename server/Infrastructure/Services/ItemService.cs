using AutoMapper;
using Data;
using Data.DTOs;
using Infrastructure.Enums;
using Infrastructure.Models.Item;
using Infrastructure.Models.ItemHistory;
using Infrastructure.Services.Declarations;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services
{
    public class ItemService : IItemService
    {
        private readonly DataContext _dataContext;

        public ItemService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public int Create(CreateItem model, User user)
        {
            var item = model.ToDTO();
            item.CreatedByID = user.ID;

            _dataContext.Items.Add(item);
            _dataContext.SaveChanges();

            return item.ID;
        }

        public void Bid(ItemBid model, User user)
        {
            var item = _dataContext.Items.FirstOrDefault(x => x.ID == model.ItemID)!;

            if (item.LastBidByID != null)
            {
                var lastBidderTillNow = _dataContext.Users.FirstOrDefault(x => x.ID.Equals(item.LastBidByID));
                // notificationService.NotifyOutBidded(lastBidderTillNow.EmailAddress);
            }

            // Creator of item cannot bid
            // Last bidder in history also cannot outbid himself
            if (item.CreatedByID.Equals(user.ID) || (item.LastBidByID != null && item.LastBidByID.Equals(user.ID)))
            {
                return;
            }

            var itemHistory = new ItemHistory(item.ID, user.ID, model.BidAmount);
            item.LastBidAmount = model.BidAmount;
            item.LastBidByID = user.ID;
            item.LastBidDate = DateTime.Now;

            _dataContext.Items.Attach(item);
            _dataContext.Entry(item).State = EntityState.Modified;
            _dataContext.ItemsHistory.Add(itemHistory);
            _dataContext.SaveChanges();

            if (item.SnipingProtection)
                ProtectFromSniping(item);
        }

        public void BuyNow(ItemBuyNow model, User user)
        {
            var item = _dataContext.Items.FirstOrDefault(x => x.ID == model.ItemID)!;

            // Creator of item cannot buy
            // Item needs to have a 'BuyNow' price assigned
            if (item.CreatedByID.Equals(user.ID) && item.BuyNowPrice == null)
            {
                return;
            }

            var order = new Order(user.ID, item.CreatedByID, (int)OrderStatuses.Pending, (decimal)item.BuyNowPrice!);
            CreateOrder(order, item);
        }

        public IEnumerable<ItemDisplay> GetCollection()
        {
            var result = new List<ItemDisplay>();
            var items = _dataContext.Items.ToList();

            foreach (var item in items)
            {
                var config = new MapperConfiguration(cfg =>
                    cfg.CreateMap<Item, ItemDisplay>()
                );

                var mapper = new Mapper(config);

                var itemModel = mapper.Map<ItemDisplay>(item);

                PopulateMetadata(itemModel, item.ID);

                result.Add(itemModel);
            }

            return result;
        }

        public ItemDisplay? GetEntityByID(long id)
        {
            var item = _dataContext.Items.FirstOrDefault(x => x.ID == id);

            if (item == null)
                return null;

            var config = new MapperConfiguration(cfg =>
                cfg.CreateMap<Item, ItemDisplay>()
            );

            var mapper = new Mapper(config);

            var result = mapper.Map<ItemDisplay>(item);

            PopulateMetadata(result, item.ID);

            return result;
        }

        public void ProtectFromSniping(Item item)
        {
            if (item.LastBidDate.HasValue)
            {
                var timeLeft = item.EndDate.Subtract(item.LastBidDate.Value);
                var lessThanAnHour = timeLeft.TotalMinutes <= 60;

                if (lessThanAnHour)
                {
                    item.EndDate.AddHours(1);
                    _dataContext.Items.Attach(item);
                    _dataContext.Entry(item).State = EntityState.Modified;
                    _dataContext.SaveChanges();

                    // notificationService.NotifySnipingAttempt(all);
                }
            }
        }

        public IEnumerable<Item> GetItemsPendingOrders()
        {
            return
                _dataContext
                .Items
                .Where(x => x.OrderID == null && x.LastBidAmount != null && x.EndDate < DateTime.Now)
                .ToList();
        }

        public IEnumerable<ItemHistory> GetHistory(long itemID)
        {
            return
                _dataContext
                .ItemsHistory
                .Where(x => x.ItemID == itemID)
                .ToList();
        }

        public void CreateOrder(Order order, Item item)
        {
            _dataContext.Orders.Add(order);
            _dataContext.SaveChanges();

            item.OrderID = order.ID;
            _dataContext.Items.Attach(item);
            _dataContext.Entry(item).State = EntityState.Modified;
            _dataContext.SaveChanges();
        }

        public IEnumerable<Order> GetPendingOrders()
        {
            return
                _dataContext
                .Orders
                .Where(x => x.Status == (int)OrderStatuses.Pending)
                .ToList();
        }

        private void PopulateMetadata(ItemDisplay model, long itemID)
        {
            PopulateBiddingHistory(model, itemID);
            PopulateImages(model, itemID);
        }

        private void PopulateBiddingHistory(ItemDisplay model, long itemID)
        {
            if (_dataContext.ItemsHistory.Any(x => x.ItemID == itemID))
            {
                var itemHistory = _dataContext.ItemsHistory.Where(x => x.ItemID == itemID).ToList();

                foreach (var itemHistoryObj in itemHistory)
                {
                    var historyModel = new ItemHistoryDisplay(itemHistoryObj.ItemID, itemHistoryObj.UserID, itemHistoryObj.BidAmount);
                    historyModel.UserEmailAddress = _dataContext.Users.FirstOrDefault(x => x.ID == itemHistoryObj.UserID)!.Email;
                    model.History.Add(historyModel);
                }
            }
        }

        private void PopulateImages(ItemDisplay model, long itemID)
        {
            if (_dataContext.Images.Any(x => x.HostID == itemID))
            {
                var images = _dataContext.Images.Where(x => x.HostID == itemID).ToList();
                model.Images.AddRange(images);
            }
        }
    }
}
