    /****************************/
    /********MAP SECTION********/
    /**************************/
    //basemaps
    var OpenStreetMap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

        
    ///// Configuration     
    var map = L.map('mapid', {
        center:[26.257870, 92.967752], 
        zoom:7, 
        zoomControl:true, 
        minZoom: 4,
        maxZoom: 18,
        attributionControl:true,
        fullscreenControl: true
    });

    ctlAttribute = L.control.attribution({position:'bottomleft'}).addTo(map);
    ctlAttribute.addAttribution('OSM');
    ctlAttribute.addAttribution('&copy; <a>COVID 19 Assam</a>');
    OpenStreetMap.addTo(map);


    /****************************/
    /****DATA HANDLER SECTION***/
    /**************************/
    (function($) {
      "use strict"; // Start of use strict

        let responseText = "";
        $.ajax({
            type: "GET",  
            url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQAyNePBi1epH_ziBr4k95k3I5lWgq7pJHAwSV4CUTXhtl3K0ob1xCIcD9uIzJExQW6DA9U3MfDqnR2/pub?gid=2046583516&single=true&output=csv",
            dataType: "text",       
            success: function(response)
            {
                let data = $.csv.toObjects(response);
                //console.log(data);

                for(let i = 0; i < data.length; i++){

                    let lat = data[i].lat;
                    let lon = data[i].lon;
                    let name = data[i].Name;

                    L.marker([lat, lon]).bindPopup(name).openPopup().addTo(map);

                    responseText += "<tr><td>" + name + "</td><td>" + data[i].City + "</td><td>" + data[i].Ownership + "</td><td>" + data[i].Category + "</td><td>" +  data[i].Contact + "</td><td><a href=\"" + data[i].Website + "\">" + data[i].Website + "</a></td></tr>"

                }

                $("#data-table").html(responseText);
            }
        });


      // Close any open menu accordions when window is resized below 768px
      $(window).resize(function() {
        if ($(window).width() < 768) {
          $('.sidebar .collapse').collapse('hide');
        };
      });

      // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
      $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
        if ($(window).width() > 768) {
          var e0 = e.originalEvent,
            delta = e0.wheelDelta || -e0.detail;
          this.scrollTop += (delta < 0 ? 1 : -1) * 30;
          e.preventDefault();
        }
      });

      // Scroll to top button appear
      $(document).on('scroll', function() {
        var scrollDistance = $(this).scrollTop();
        if (scrollDistance > 100) {
          $('.scroll-to-top').fadeIn();
        } else {
          $('.scroll-to-top').fadeOut();
        }
      });

      // Smooth scrolling using jQuery easing
      $(document).on('click', 'a.scroll-to-top', function(e) {
        var $anchor = $(this);
        $('html, body').stop().animate({
          scrollTop: ($($anchor.attr('href')).offset().top)
        }, 1000, 'easeInOutExpo');
        e.preventDefault();
      });
      document.addEventListener('contextmenu', event => event.preventDefault());

    })(jQuery); // End of use strict

  