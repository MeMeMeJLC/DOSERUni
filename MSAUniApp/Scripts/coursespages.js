document.addEventListener("DOMContentLoaded", function () {

    loadCoursesTable();


});

function loadCoursesTable() {

    var CoursesTable = document.getElementById("tblCoursecontent");

    CourseModule.getCourses(function (CoursesList) {
        setupCoursesTable(CoursesList);
    });

    function setupCoursesTable(Courses) {

        // Loop through list of Courses
        for (i = 0; i < Courses.length; i++) {

            // Create row
            var row = document.createElement('tr');
            row.setAttribute("data-id", Courses[i].ID);

            // Create columns
            var lastnamecol = document.createElement('td');
            lastnamecol.innerHTML = Courses[i].LastName;
            row.appendChild(lastnamecol);

            var firstnamecol = document.createElement('td');
            firstnamecol.innerHTML = Courses[i].FirstMidName;
            row.appendChild(firstnamecol);

            var enrollmentdatecol = document.createElement('td');
            enrollmentdatecol.innerHTML = Courses[i].EnrollmentDate;
            row.appendChild(enrollmentdatecol);

            // Create edit and delete buttons
            var editcol = document.createElement('td');
            var editbtn = document.createElement('button');
            editbtn.className = "btn btn-default";
            editbtn.innerHTML = "Edit";

            // You can set your own attributes to elements. This is pretty handy
            // for idenitfying them without using the id tag, or keeping context
            // between different pages (see the 'detail' page event handler down)
            editbtn.setAttribute("data-id", Courses[i].ID);
            editbtn.setAttribute("data-btntype", "edit");

            editcol.appendChild(editbtn);
            row.appendChild(editcol);

            var deletecol = document.createElement('td');
            var deletebtn = document.createElement('button');
            deletebtn.className = "btn btn-default";
            deletebtn.innerHTML = "Delete";
            deletebtn.setAttribute("data-id", Courses[i].ID);
            deletebtn.setAttribute("data-btntype", "delete");

            deletecol.appendChild(deletebtn);
            row.appendChild(deletecol);

            // Add newly created row to the table
            CoursesTable.appendChild(row);
        }

        // Show table after it's all loaded
        // The "hidden" class is part of bootstrap
        document.getElementById("tblCourse").classList.remove("hidden");
        document.getElementById("loadingmsg").style.display = "none";

        // This basically navigates you to more details, edit or delete on the front page respective to the Course you clicked
        // For more info, search "Event Delegation" online and have a read
        CoursesTable.addEventListener('click', function (e) {
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
                    CourseModule.deleteCourse(target.getAttribute("data-id"), function () {
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


