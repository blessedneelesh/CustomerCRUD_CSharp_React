using CustomerMaintenance.Models.DataLayer;
using CustomerMaintenance.Models.Dto;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace CustomerMaintenance.Models.Doa
{
    public class CustomerOperation
    {
       static CustomerMAContext dbContext=new CustomerMAContext();
        public List<CustomerDto> GetCustomer()
        {
            //var lst = (from n in dbContext.customers.Include("zip1") select n).ToList();
            var lst = (from n in dbContext.Customers
                       select new CustomerDto
                       {
                           CustomerId = n.CustomerId,
                           Name = n.Name,
                           Address = n.Address,
                           City = n.City,
                           StateCode = n.StateCode,
                           ZipCode = n.ZipCode
                       }).ToList(); // query against conceptual model. 
            // you are using customers property of the object context as the data source for the query.
            // this property returns a collection of customer objects.

            // since Customer entity in mapped to Customers Table in the CarCompany database, this expression query
            // retrieves data from the table.
            return lst;
        }

        public void AddCustomer(Customer newCust)
        {
                dbContext.Customers.Add(newCust);
                dbContext.SaveChanges();
        
            
  
           /* var lst = (from n in dbContext.Customers
                       select new CustomerDto
                       {
                           CustomerId = n.CustomerId,
                           Name = n.Name,
                           Address = n.Address,
                           City = n.City,
                           StateCode = n.StateCode,
                           ZipCode = n.ZipCode
                       }).ToList().LastOrDefault();
            return lst;*/
        }

        public void DeleteCustomer(int deleteCustomer)
        {
            try
            {
                var selectedCust = (from customer in dbContext.Customers
                                    where customer.CustomerId == deleteCustomer
                                    select customer).Single();

                dbContext.Customers.Remove(selectedCust);
                dbContext.SaveChanges();
            }
            catch (Exception e)
            {
                throw new Exception("An error occured while deleting!");


            }

        }

        public CustomerDto GetCustomerById(int id)
        {
            var lst = (from n in dbContext.Customers
                       where n.CustomerId == id
                       select new CustomerDto
                       {
                           CustomerId = n.CustomerId,
                           Name = n.Name,
                           Address = n.Address,
                           City = n.City,
                           StateCode = n.StateCode,
                           ZipCode = n.ZipCode
                       }).SingleOrDefault();
            return lst;
        }

        public Customer UpdateCustomer(int id, Customer cust)
        {
           List<Customer> lst = (from n in dbContext.Customers
                                  where n.CustomerId == id
                                  select n).ToList();

            foreach (Customer c in lst)
            {
                //c.CustomerId = cust.CustomerId;
                c.Name = cust.Name;
                c.Address = cust.Address;
                c.City = cust.City;
                c.StateCode = cust.StateCode;
                c.ZipCode = cust.ZipCode;
            }

            dbContext.SaveChanges();
            return cust;
        }

        public async Task<List<StateDto>> GetState()
        {
            using (var myContext = new CustomerMAContext())
            {
                var lst = (from n in myContext.States
                           select new StateDto
                           {
                               StateCode = n.StateCode,
                               StateName = n.StateName,
                           }).ToListAsync();  // query against conceptual model. 
                return await lst;
            }
           
        }
    }
}

