using Data;
using Data.DTOs;
using Infrastructure.Enums;
using Infrastructure.Services;
using Microsoft.EntityFrameworkCore;

namespace Background
{
    public class OrderCollector : BackgroundService
    {
        private readonly ILogger<OrderCollector> _logger;
        private ItemService itemService;

        public OrderCollector(ILogger<OrderCollector> logger)
        {
            _logger = logger;

            var optionsBuilder = new DbContextOptionsBuilder<DataContext>();
            optionsBuilder.UseSqlServer(Configuration.DatabaseConnectionString);
            itemService = new ItemService(new DataContext(optionsBuilder.Options));
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);

                var itemsPendingOrders = itemService.GetItemsPendingOrders();

                foreach (var itemPendingOrder in itemsPendingOrders)
                {
                    var itemHistory = itemService.GetHistory(itemPendingOrder.ID);

                    if (itemHistory.Count() > 0)
                    {
                        var lastBidding = itemHistory.OrderByDescending(x => x.BidAmount).FirstOrDefault()!;
                        var pendingOrder = new Order(lastBidding.UserID, itemPendingOrder.CreatedByID, (int)OrderStatuses.Pending, lastBidding.BidAmount);

                        itemService.CreateOrder(pendingOrder, itemPendingOrder);
                    }
                }

                var pendingOrders = itemService.GetPendingOrders();

                // notify seller and buyer for created order...

                await Task.Delay(1000, stoppingToken);
            }
        }
    }
}