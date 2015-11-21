﻿document.addEventListener("DOMContentLoaded", function () {

    loadEnrollmentsTable();

});

function loadEnrollmentsTable() {

    var EnrollmentsTable = document.getElementById("tblenrollmentcontent");

    EnrollmentModule.getEnrollments(function (EnrollmentsList) {
        setupEnrollmentsTable(EnrollmentsList);
    });

    getStudentById: function (i, callback){
            
        $.ajax({ 
            type: "GET",
            dataType: "json",
            url: "http://doseruni.azurewebsites.net/api/Students/" + id,
            success: function(data){        
                console.log(data);
                callback(data);
            }
        });

    },

    function setupEnrollmentsTable(Enrollments) {

        // Loop through list of Enrollments
        for (i = 0; i < Enrollments.length; i++) {
            console.log(Enrollments[i].StudentID);
            // Create row
            var row = document.createElement('tr');
            row.setAttribute("data-id", Enrollments[i].ID);

            // Create columns
            var lastnamecol = document.createElement('td');
            lastnamecol.innerHTML = Enrollments[i].LastName;
            row.appendChild(lastnamecol);

            var firstnamecol = document.createElement('td');
            firstnamecol.innerHTML = Enrollments[i].FirstMidName;
            row.appendChild(firstnamecol);

            var enrollmentdatecol = document.createElement('td');
            enrollmentdatecol.innerHTML = Enrollments[i].EnrollmentDate;
            row.appendChild(enrollmentdatecol);

            // Create edit and delete buttons
            var editcol = document.createElement('td');
            var editbtn = document.createElement('button');
            editbtn.className = "btn btn-default";
            editbtn.innerHTML = "Edit";

            // You can set your own attributes to elements. This is pretty handy
            // for idenitfying them without using the id tag, or keeping context
            // between different pages (see the 'detail' page event handler down)
            editbtn.setAttribute("data-id", Enrollments[i].ID);
            editbtn.setAttribute("data-btntype", "edit");

            editcol.appendChild(editbtn);
            row.appendChild(editcol);

            var deletecol = document.createElement('td');
            var deletebtn = document.createElement('button');
            deletebtn.className = "btn btn-default";
            deletebtn.innerHTML = "Delete";
            deletebtn.setAttribute("data-id", Enrollments[i].ID);
            deletebtn.setAttribute("data-btntype", "delete");

            deletecol.appendChild(deletebtn);
            row.appendChild(deletecol);

            // Add newly created row to the table
            EnrollmentsTable.appendChild(row);
        }

        // Show table after it's all loaded
        // The "hidden" class is part of bootstrap
        document.getElementById("tblEnrollment").classList.remove("hidden");
        document.getElementById("loadingmsg").style.display = "none";

        // This basically navigates you to more details, edit or delete on the front page respective to the Enrollment you clicked
        // For more info, search "Event Delegation" online and have a read
        EnrollmentsTable.addEventListener('click', function (e) {
            var target = e.target;

            // Bubble up to tbody - need to bubble the event up because the click occurs in 
            // the td cells but the data-id attribute is in the row (for going to more detail page)
            while (target.nodeName.toLowerCase() !== "tbody") {

                // For all these cases we use the data-id stored in either the cell or the row to keep context
                // between seperate pages

                // Edit
                if (target.getAttribute("data-btntype") === "edit") {
                    window.location.href = 'edit.html' + '?id=' + target.getAttribute("data-id");
                    return;

                    // Delete
                } else if (target.getAttribute("data-btntype") === "delete") {
                    EnrollmentModule.deleteEnrollment(target.getAttribute("data-id"), function () {
                        window.location.reload(true);
                    });
                    return;

                    // Detail - this is true if clicked anywhere within the row
                } else if (target.nodeName.toLowerCase() === "tr") {
                    window.location.href = 'detail.html' + '?id=' + target.getAttribute("data-id");
                    return;
                }

                // Keep bubbling the event up through the DOM
                target = target.parentNode;
            }
        });
    }

};

