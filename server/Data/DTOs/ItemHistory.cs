using System.ComponentModel.DataAnnotations.Schema;

namespace Data.DTOs
{
    [Table(nameof(ItemHistory))]
    public class ItemHistory
    {
        public ItemHistory(int itemID, int userID, decimal bidAmount) 
        {
            this.ItemID = itemID;
            this.UserID = userID;
            this.BidAmount = bidAmount;
        }

        public int ID { get; set; }

        public int ItemID { get; set; }

        public int UserID { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public decimal BidAmount { get; set; }
    }
}
