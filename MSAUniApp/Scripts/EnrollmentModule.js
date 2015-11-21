var EnrollmentModule = (function () {

    return {
        getEnrollments: function (callback) {
            $.ajax({
                type: "GET",
                dataType: "json",
                // API url here
                url: "http://doseruni.azurewebsites.net/api/Enrollments",
                success: function (data) {
                    console.log(data);
                    callback(data);
                }
            });
        },

        getEnrollmentById: function (id, callback) {

            $.ajax({
                type: "GET",
                dataType: "json",
                url: "http://doseruni.azurewebsites.net/api/Enrollments/" + id,
                success: function (data) {
                    console.log(data);
                    callback(data);
                }
            });

        },

        addEnrollment: function (Enrollment, callback) {

            $.ajax({
                url: "http://doseruni.azurewebsites.net/api/Enrollments/",
                type: "POST",
                data: Enrollment,
                success: function (data, textStatus, jqXHR) {
                    callback();
                }
            });

        },

        updateEnrollment: function (Enrollmentid, Enrollment, callback) {

            $.ajax({
                url: "http://doseruni.azurewebsites.net/api/Enrollments/" + Enrollmentid,
                type: "PUT",
                data: Enrollment,
                success: function (data, textStatus, jqXHR) {
                    callback();
                }
            });
        },

        deleteEnrollment: function (Enrollmentid, callback) {

            $.ajax({
                type: "DELETE",
                dataType: "json",
                url: "http://doseruni.azurewebsites.net/api/Enrollments/" + Enrollmentid,
                success: function (data) {
                    callback();
                }
            });
        }
    };

}());