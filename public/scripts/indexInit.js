/* Script to support single page app for Ayurvedic Massage and Services
 * Author: HartCode programmer
 * Date: 08/23/2019
 */
"Use Strict";
/* window onload/ready function to load page with categories and assign event for other service functions. 
 * @param: None 
 * Calls: loadCategories(), showHome() and showServices() 
 */
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
            errorMsg = "Failure to get categories, please refresh the page"
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
    $("#headerDiv").show();
    $("#home").attr("class", "active");
    // Hide the Services information section
    $("#featureContainer").hide();
    $("#services").attr("class", "inactive");
    // Remove the footer to display at bottom always, as home page has content
    $("#footerDiv").removeClass("fixed-bottom");
}

/* function is to show the respective services information sections view upon clicking on Services from the navigation bar 
 * @param:  None
 * Calls: None
 */
function showServices() {
    // Hide Home section to hold the logo, brief note and enable the view categories button
    $("#homeSection").hide();
    $("#home").attr("class", "inactive");
    $("#headerDiv").hide();

    // Show the view categories section
    $("#services").attr("class", "active");
    $("#categoryContainer").show();
    $("#featureContainer").show();

    //Add fixed-bottom to show the footer at the bottom during service section launch
    $("#footerDiv").addClass("fixed-bottom");

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
                // prevent all default action and do as we direct
                e.preventDefault();
                // Remove the fixed bottom class, as data is loaded and it needs to be responsive now
                $("#footerDiv").removeClass("fixed-bottom");
                // Identify all previous active items and set their background as "Not selected" and set bg-info for selected one
                $("a").removeClass("bg-info");
                $(this).addClass("bg-info");
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
            errorMsg = "Failure to get all services under selected category, please retry"
            $("#errorMsgId").html(errorMsg);
            $("#errorMsgId").addClass("badInput");
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
                .attr("class", "list-group-item list-group-item-action border-info")
                .on("click", function(e) {
                    e.preventDefault();
                    let b = $("#servicesList li");
                    // Remove all active items and set active attribute for the selected list item
                    $("#servicesList li").removeClass("active bg-info");
                    $(this).addClass("active bg-info");
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
            errorMsg = "Failure to get service item details under selected service, please retry"
            $("#errorMsgId").html(errorMsg);
            $("#errorMsgId").addClass("badInput");
        });
}

/* function is to update service card from the server returned service object 
 * @param serviceItem (javastring object) - contains selected service object details
 * calls: None
 */
function loadService(serviceItem) {
    //first 3 characters of serviceID will match the image name to populate the images
    let imgName = serviceItem.ServiceID.substr(0, 3) + ".jpg";
    $("#cardImg").attr("src", "images/" + imgName);
    //service ID has been set as alt text for any future enhancments
    $("#cardImg").attr("alt", serviceItem.ServiceID);
    $("#cardImg").attr("class", "hideimage");
    //Populate the below details for user information
    $("#serviceName").html(serviceItem.ServiceName);
    $("#serviceDescription").html(serviceItem.Description);
    $("#servicePrice").html("$" + serviceItem.Price);
    $("#serviceDuration").html(serviceItem.Minutes + "\t" + "Mins");
    //Show the service card upon successful loading of service info
    $("#serviceCard").show();
}