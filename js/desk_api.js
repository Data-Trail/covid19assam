(function($) {
  "use strict"; // Start of use strict

  $.getJSON( "https://api.covid19india.org/data.json", function(data) {
    //console.log(data.statewise[19]);

    $("#confirmed").html(data.statewise[21].confirmed)
    $("#activecases").html(data.statewise[21].active)
    $("#recoveredcases").html(data.statewise[21].recovered + "/" + data.statewise[21].active)
    $("#deathcount").html(data.statewise[21].deaths)
    $("#lastUpdated").html("Last updated on: " + data.statewise[21].lastupdatedtime)
    //update progres bar as per formula
    let percent = ((data.statewise[21].recovered)/(data.statewise[21].active)*100) + "%"
    $(".handle").css('width', percent)

  });

  /*$.getJSON( "https://api.covid19india.org/v2/state_district_wise.json", function(data){

    let mydata = data[28].districtData;
    
    $('#patientdata').DataTable( {
        data: mydata,
        columns: [
            { data: 'district' },
            { data: 'confirmed' }
        ]
    });
  });*/

  var responseText = "";
  $.ajax({
    type: "GET",  
    url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vSNuLjSasSC88I6nY9TzpAkCzE2AGozAb2dPoxyBkk7jA8_J6FZKhak-iAMxgr8_zQRczJGsSP-mIdQ/pub?gid=0&single=true&output=csv",
    dataType: "text",       
    success: function(response)
    {
      let mydata = $.csv.toObjects(response);

      for(let i = 0; i < mydata.length; i++){

        responseText += "<tr><td>" + mydata[i].district + "</td><td>" + mydata[i].confirmed + "</td><td>" + mydata[i].recovered + "</td><td>" + mydata[i].death + "</td></tr>"
      }

      $("#casestats").html(responseText);
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
