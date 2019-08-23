/* Script to support single page app for Ayurvedic Massage and Services
 * Author: HartCode programmer
 * Date: 08/23/2019
 */
"Use Strict";
/* window onload/ready function to load page with categories and assign event for other service functions. */
$(function() {

    let errorMsgIdField = $("#errorMsgId");
    // Store the JSON data in javaScript objects (Pull categories for the offered Ayurvedic services).  
    $.getJSON("/api/categories/", function(data) {
            categories = data;
        })
        .done(function() {
            // upon successful AJAX call perform the below
            loadCategories(categories);
            $("#categoryContainer").hide();
        })
        .fail(function() {
            // upon failure response, send message to user
            errorMsg = "Failure to get server data, please refresh the page"
            errorMsgIdField.html(errorMsg);
            errorMsgIdField.addClass("badInput");
        });
    //Show Home as default by setting $ hide/show 
    showHome();

    // Event handler for Services from navbar
    $("#servicesAnchor").on("click", function() {
        showServices();
    })

    // Event handler for Services button from Home page section
    $("#serviceBtn").on("click", function() {
        showServices();
    })

    // Event handler for Home from navbar
    $("#homeAnchor").on("click", function() {
        showHome();
    })

    // Event handler for sitelogo from navbar
    $("#logoAnchor").on("click", function() {
        showHome();
    })
})

/* function is to show the respective home sections view upon clicking on Home from the navigation bar 
 * @param: None
 * Calls: None
 */
function showHome() {
    // Show Home section to hold the logo and brief note
    $("#homeSection").show();
    $("#home").attr("class", "active");
    // Hide the Services information section
    $("#featureContainer").hide();
    $("#services").attr("class", "inactive");
}

/* function is to show the respective services information sections view upon clicking on Services from the navigation bar 
 * @param:  None
 * Calls: None
 */
function showServices() {
    // Hide Home section to hold the logo, brief note and enable the view categories button
    $("#homeSection").hide();
    $("#home").attr("class", "inactive");

    // Show the view categories section
    $("#services").attr("class", "active");
    $("#categoryContainer").show();
    $("#featureContainer").show();

    // Hide Services information and service card details
    $("#servicesDiv").hide();
    $("#serviceCard").hide();
}

/* function is to load services under selected category upon category selection anchor 
 * @param categories (javastring object) - contains selected course detail
 * calls: getServices() 
 */
function loadCategories(categories) {
    $("#servicesList").empty();
    $.each(categories, function(key, value) {
        $("#categoryList").append($("<a/>")
            .text(value.Category)
            .attr("href", "#")
            .attr("class", "dropdown-item")
            .on("click", function(e) {
                e.preventDefault();
                $("#servicesList").empty();
                $("#categoryName").text(value.Category);
                getServices(value.Value);
            }))
    })
}

/* function is to list of services under selected category
 * @param category (javastring object) - contains selected category
 * calls: loadServices() 
 */
function getServices(category) {
    //Hides the Service card during category selection
    $("#serviceCard").hide();
    $.getJSON("/api/services/bycategory/" + category, function(data) {
            services = data;
        })
        .done(function() {
            // upon successful AJAX call perform the below
            loadServices(services);
        })
        .fail(function() {
            // upon failure response, send message to user
            errorMsg = "Failure to get server data, please refresh the page"
            $("errorMsgId").html(errorMsg);
            $("errorMsgId").addClass("badInput");
        });
}

/* function is to service details under selected Service  
 * @param services (javastring object) - contains selected Service object
 * calls: None
 */
function loadServices(services) {
    $.each(services, function(key, value) {
            $("#servicesList").append($("<li/>")
                .text(value.ServiceName)
                .attr("class", "list-group-item list-group-item-action flex-column align-items-start ml-0")
                .on("click", function(e) {
                    e.preventDefault();
                    getService(value.ServiceID);
                    $("#serviceCard").show();
                }))
        })
        // Shows the service card div to show the details of the selected service
    $("#servicesDiv").show();
}

/* function is to get Selected Service details from server by making Ajax call 
 * @param service (javastring object) - contains selected service object
 * calls: loadService()
 */
function getService(service) {
    $.getJSON("/api/services/" + service, function(data) {
            serviceItem = data;
        })
        .done(function() {
            // upon successful AJAX call perform the below
            loadService(serviceItem);
        })
        .fail(function() {
            // upon failure response, send message to user
            errorMsg = "Failure to get server data, please refresh the page"
            $("errorMsgId").html(errorMsg);
            $("errorMsgId").addClass("badInput");
        });
}

/* function is to update service card from the server returned service object 
 * @param serviceItem (javastring object) - contains selected service object details
 * calls: None
 */
function loadService(serviceItem) {
    $("#cardImg").attr("src", "images/Acupuncture.jpg");
    $("#cardImg").attr("alt", serviceItem.ServiceID);
    $("#serviceName").html(serviceItem.ServiceName);
    $("#serviceDescription").html(serviceItem.Description);
    $("#servicePrice").html("$" + serviceItem.Price);
    $("#serviceDuration").html(serviceItem.Minutes + "\t" + "Mins")
    $("#serviceCard").show();
}