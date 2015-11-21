using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MSAUniApp.Controllers
{
    public class AssessmentController : ApiController
    {

        // GET: api/Assessment
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Assessment/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Assessment
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Assessment/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Assessment/5
        public void Delete(int id)
        {
        }
    }
}
