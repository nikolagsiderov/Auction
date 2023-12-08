using Data.DTOs;
using Infrastructure.Models.ItemHistory;

namespace Infrastructure.Models.Item
{
    public class ItemDisplay : Data.DTOs.Item
    {
        public List<ItemHistoryDisplay> History { get; set; } = new List<ItemHistoryDisplay>();

        public List<Image> Images { get; set; } = new List<Image>();
    }
}
