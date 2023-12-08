using Data.DTOs.Declarations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.DTOs
{
    [Table(nameof(Order))]
    public class Order : IdentityObject
    {
        public Order()
        {
            this.CreatedByID = 0; // system_generated
        }

        public Order(int buyerUserID, int sellerUserID, int status, decimal price) 
        {
            this.BuyerUserID = buyerUserID;
            this.SellerUserID = sellerUserID;
            this.Status = status;
            this.Price = price;
            this.CreatedByID = 0; // system_generated
        }

        public int BuyerUserID { get; set; }

        public int SellerUserID { get; set; }

        public int Status { get; set; }

        public decimal Price { get; set; }
    }
}
