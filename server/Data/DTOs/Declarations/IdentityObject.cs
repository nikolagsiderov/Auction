namespace Data.DTOs.Declarations
{
    public abstract class IdentityObject
    {
        public int ID { get; set; }

        public int CreatedByID { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}
