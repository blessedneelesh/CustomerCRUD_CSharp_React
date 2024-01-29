using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace CustomerMaintenance.Models.DataLayer
{
    [Table("State")]
    public partial class State
    {
        public State()
        {
            Customers = new HashSet<Customer>();
        }

        [Key]
        [StringLength(255)]
        [Unicode(false)]
        public string StateCode { get; set; } = null!;
        [StringLength(255)]
        [Unicode(false)]
        public string? StateName { get; set; }

        [InverseProperty("StateCodeNavigation")]
        public virtual ICollection<Customer> Customers { get; set; }
    }
}
