var CourseModule = (function () {

    return {
        getCourses: function (callback) {
            $.ajax({
                type: "GET",
                dataType: "json",
                // API url here
                url: "http://doseruni.azurewebsites.net/api/Courses",
                success: function (data) {
                    console.log(data);
                    callback(data);
                }
            });
        },

        getCourseById: function (id, callback) {

            $.ajax({
                type: "GET",
                dataType: "json",
                url: "http://doseruni.azurewebsites.net/api/Courses/" + id,
                success: function (data) {
                    console.log(data);
                    callback(data);
                }
            });

        },

        addCourse: function (Course, callback) {

            $.ajax({
                url: "http://doseruni.azurewebsites.net/api/Courses/",
                type: "POST",
                data: Course,
                success: function (data, textStatus, jqXHR) {
                    callback();
                }
            });

        },

        updateCourse: function (Courseid, Course, callback) {

            $.ajax({
                url: "http://doseruni.azurewebsites.net/api/Courses/" + Courseid,
                type: "PUT",
                data: Course,
                success: function (data, textStatus, jqXHR) {
                    callback();
                }
            });
        },

        deleteCourse: function (Courseid, callback) {

            $.ajax({
                type: "DELETE",
                dataType: "json",
                url: "http://doseruni.azurewebsites.net/api/Courses/" + Courseid,
                success: function (data) {
                    callback();
                }
            });
        }
    };

}());