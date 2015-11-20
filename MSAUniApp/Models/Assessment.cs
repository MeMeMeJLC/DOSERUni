using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace MSAUniApp.Models
{
    public class Assessment
    {

        public int assessmentID { get; set; }
        public string AssessmentName { get; set; }
        public string AssessmentType { get; set; }
        public DateTime DueDate { get; set; }
        public String Notes { get; set; }
        public int EnrollmentID { get; set; }


        [JsonIgnore]
        public virtual ICollection<Enrollment> Enrollments { get; set; }
    }
}