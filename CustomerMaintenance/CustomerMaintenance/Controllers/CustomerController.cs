using CustomerMaintenance.Models.Doa;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CustomerMaintenance.Models.Dto;
using CustomerMaintenance.Models.DataLayer;
using System.IO;
using System;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Net;


namespace CustomerMaintenance.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly CustomerOperation _customerDao;
        public CustomerController() { 
            _customerDao = new CustomerOperation();
        }

        [HttpGet]
        public IEnumerable<CustomerDto> GetCustomer()
        {
            return _customerDao.GetCustomer();

        }
        [HttpGet]
 
        public ActionResult<CustomerDto> GetCustomerById(int id) //ActionResult gives flexibility to return NotFound()
        {
            var Customer= _customerDao.GetCustomerById(id);
            if(Customer == null)
            {
                return NotFound();
            }
            return Customer;
        }

        [HttpPost]
        public ActionResult<Customer> AddCustomer(Customer value)
        {
            try
            {
                _customerDao.AddCustomer(value);
                return CreatedAtAction(nameof(GetCustomer), new { custId = value.CustomerId }, value);
            }
            catch (DbUpdateException ex)
            {
                var sqlException = ex.GetBaseException() as SqlException;
                if (sqlException.Number == 547)
                {
                    Console.WriteLine("FK constraint");
                    return BadRequest("Foreign key violations!"+value.StateCode+" is not a FK.");
                }
                return BadRequest("Some errors!");
            }

            

/*            Executing the CreatedAtAction method from ControllerBase in
the action method's return statement will automatically add an HTTP location header
containing the path to get the resource as well adding HTTP status code 201 to the
response.*/
  
        }

        [HttpPut]
        // PUT api/values/5
        public ActionResult<Customer> UpdateCustomer(int id, Customer value)
        {
            CustomerDto cust = _customerDao.GetCustomerById(id);
            if (cust == null)
            {
                return NotFound();
            }
            var savedCust= _customerDao.UpdateCustomer(id, value);
            return savedCust;   //return updated customer. return with 200 status code
        }

        [HttpDelete]
        // DELETE api/values/5
        public ActionResult DeleteCustomer(int id)
        {
            var cust = _customerDao.GetCustomerById(id);
            if(cust == null)
            {
                return NotFound();
            }
            _customerDao.DeleteCustomer(id);
            return NoContent(); //No content returns 204 status code.

        }

        [HttpGet]
        public  Task<List<StateDto>> GetStates()
        {
            return _customerDao.GetState();

        }

    }
}
