using CustomerMaintenance.Models.Doa;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CustomerMaintenance.Models.Dto;
using CustomerMaintenance.Models.DataLayer;

namespace CustomerMaintenance.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<CustomerDto> GetCustomer()
        {
            return CustomerOperation.GetCustomer();

        }
        [HttpGet]
 
        public CustomerDto GetCustomerById(int id)
        {
            return CustomerOperation.GetCustomerById(id);
        }

        [HttpPost]
        public String AddCustomer(Customer value)
        {
            CustomerOperation.AddCustomer(value);
            return "Added Successfully";
            // return 
        }

        [HttpPut]
        // PUT api/values/5
        public String UpdateCustomer(int id, Customer value)
        {
            CustomerOperation.UpdateCustomer(id, value);
            return "Updated Successfully";
        }

        [HttpDelete]
        // DELETE api/values/5
        public String DeleteCustomer(int id)
        {
            CustomerOperation.DeleteCustomer(id);
            return "Successfully Deleted";

        }

        [HttpGet]
        public  Task<List<StateDto>> GetStates()
        {
            return  CustomerOperation.GetState();

        }

    }
}
