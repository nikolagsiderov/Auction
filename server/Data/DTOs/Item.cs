using Data.DTOs.Declarations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.DTOs
{
    [Table(nameof(Item))]
    public class Item : IdentityObject
    {
        public string Title { get; set; }

        public string? Description { get; set; }

        public decimal StartingPrice { get; set; }

        public decimal? BuyNowPrice { get; set; }

        public decimal? ReservedPrice { get; set; }

        public decimal? LastBidAmount { get; set; }

        public int? LastBidByID { get; set; }

        public DateTime? LastBidDate { get; set; }

        public DateTime EndDate { get; set; }

        public bool SnipingProtection { get; set; }

        public int? OrderID { get; set; }

        public int CategoryID { get; set; }
    }
}
