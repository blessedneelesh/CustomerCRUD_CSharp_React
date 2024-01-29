using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace CustomerMaintenance.Models.DataLayer
{
    [Table("Customer")]
    public partial class Customer
    {
        [StringLength(255)]
        [Unicode(false)]
        public string? Name { get; set; }
        [StringLength(255)]
        [Unicode(false)]
        public string? Address { get; set; }
        [StringLength(255)]
        [Unicode(false)]
        public string? City { get; set; }
        [StringLength(255)]
        [Unicode(false)]
        public string? StateCode { get; set; }
        [StringLength(255)]
        [Unicode(false)]
        public string? ZipCode { get; set; }
        [Key]
        public int CustomerId { get; set; }

        [ForeignKey("StateCode")]
        [InverseProperty("Customers")]
        public virtual State? StateCodeNavigation { get; set; }
    }
}
