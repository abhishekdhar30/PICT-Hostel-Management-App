$(document).ready(function () {
  $("#menu").click(function () {
    $(this).toggleClass("fa-times");
    $(".navbarr").toggleClass("nav-toggle");
  });

  $(window).on("scroll load", function () {
    $("#menu").removeClass("fa-times");
    $(".navbarr").removeClass("nav-toggle");

    $("section").each(function () {
      let top = $(window).scrollTop();
      let height = $(this).height();
      let offset = $(this).offset().top - 200;
      let id = $(this).attr("id");

      if (top >= offset && top < offset + height) {
        $(".navbarr ul li a").removeClass("active");
        $(".navbarr").find(`[href="#${id}"]`).addClass("active");
      }
    });
  });

  $(".accordion-heading").click(function () {
    $(".accordion .accordion-content").slideUp();

    $(this).next(".accordion-content").slideDown();
  });
});
