$(document).ready(function() {
  // Hamburger Nav Toggle Display
  const $hamburger = $(".hamburger");
  const $menu = $("nav");
  const $menuList = $(".nav-links");
  const $menuItem = $(".nav-links > li");

  let showMenu = false;

  $hamburger.on("click", function toggleMenu() {
    if (showMenu === false) {
      $hamburger.addClass("close");
      $menu.addClass("show");
      $menuItem.addClass("show");
      $menuList.addClass("show");
      showMenu = true;
    } else {
      $hamburger.removeClass("close");
      $menu.removeClass("show");
      $menuItem.removeClass("show");
      $menuList.removeClass("show");
      showMenu = false;
    }
  });

  // API Call and Dynamic content
  var apiKey = "v7ZdwUQBtCE7hSPMv2gXAcronWNGEISv";
  var gifUrl = "http://api.giphy.com/v1/gifs/search";

  //When search button is clicked call api and return images
  $(".search-form-btn > button").on("click", function() {
    //prevent page reload
    event.preventDefault();

    //reset images when a new search happens
    $(".dynamic-section").empty();

    //set variable values
    var politician = $("#politician").val();
    var gifNumber = $("#gif-number").val();
    var $warning = $("#alert");

    function checkInput() {
      if (gifNumber > 30) {
        $warning.html("<p>Only 30 images can be shown at once.");
        $warning.removeClass("alert");
        $warning.addClass("show");
        return false;

        return true;
      } else if (politician === " " || gifNumber === " ") {
        $warning.html(
          "<p>You must enter a politcian's name and a number of gifs to show</p>"
        );
        $warning.removeClass("alert");
        $warning.addClass("show");
        return false;
      } else if (!politician.match(/^[0-9a-zA-Z]+$/)) {
        $warning.html("<p>Stop trying to hack my site please!</p>");
        $warning.removeClass("alert");
        $warning.addClass("show");
        return false;
      } else {
        $warning.removeClass("show");
        $warning.addClass("alert");
      }
    }

    checkInput();
    var checkIsGood = checkInput();

    if (checkIsGood !== false) {
      $.get(
        `${gifUrl}?q=${politician}&api_key=${apiKey}&limit=${gifNumber}`,
        function(data) {
          var dataArray = data.data;
          $("#politician").val("");
          $("#gif-number").val("");
          dataArray.forEach(i => {
            img = i.images.downsized.url;
            $(".dynamic-section").append(
              `<div class= "dynamic-content"><img class= "dynamic-image"  src=${img}></img></div>`
            );
          });
        }
      );
    }
  });

  $(".containimg img").on("click", function() {
    var politician = $(this).attr("alt");
    var gifNumber = 30;

    $.get(
      `${gifUrl}?q=${politician}&api_key=${apiKey}&limit=${gifNumber}`,
      function(data) {
        var dataArray = data.data;
        dataArray.forEach(i => {
          img = i.images.downsized.url;
          $(".dynamic-section").append(
            `<div class= "dynamic-content"><img class= "dynamic-image"  src=${img}></img></div>`
          );
        });
      }
    );
  });
});
