$( document ).ready(function() {
  (function() {
    $('.nav__btn').on('click', function() {
      $('header .nav').addClass('active');
      $('body').css('overflow', 'hidden');
    });

    $('.nav__close').on('click', function() {
      $('header .nav').removeClass('active');
      $('body').removeAttr('style');
    });

    $('.nav__item--full span').on('click', function() {
      $('meta[name="viewport"]').attr('content', 'width=1300')
      $('header .nav').removeClass('active');
      $('body').removeAttr('style');
    });

    $('.call-us__common').on('click', function() {
      $(this).closest('.call-us').toggleClass('active');
    })
  })();

  if($('.map-section').length) {
    (function () {
      ymaps.ready(init); 
      var myMap;
      
      function init() {  
        var i;
        var place;
        var pointer = [
          [55.39718857, 43.83859450], 
          [55.39683557, 43.82569450], 
          [55.39675457, 43.82665550], 
          [55.40127307, 43.84588850],
          [55.40414328, 43.85370471],
          [55.39488257, 43.83443500],
          [55.40426907, 43.81760950],
          [55.39912656933899,43.81527400000001],
          [55.39854856933753,43.81631599999996],
          [55.404923069324234,43.82017899999997]
        ];
      
        var myMap = new ymaps.Map("map-index", {
          center: [55.40021745, 43.83314585],
          zoom: 15
        }, {
          searchControlProvider: 'yandex#search'
      });

        // myMap.behaviors.disable('scrollZoom');
        
        for(i = 0; i < pointer.length; ++i) {
          place = new ymaps.Placemark(pointer[i]);
          myMap.geoObjects.add(place);
        }
      }; 
    })();
  }

  
  if ($('.gid__slider').length) {
    (function () {
      $('.gid__slider').slick({
        slidesToShow: 3,
        dots: false,
        arrows: true,
        prevArrow: '.apart__gallery-arrows-left',
        nextArrow: '.apart__gallery-arrows-right',
        autoplay: true,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              arrows: false
            }
          },
          {
            breakpoint: 520,
            settings: {
              slidesToShow: 1,
            }
          }
        ]
      });
    })();
  }

  $('.apart__gallery-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    asNavFor: '.apart__gallery-nav',
    prevArrow: '.apart__gallery-arrows-left',
    nextArrow: '.apart__gallery-arrows-right'
  });

  $('.apart__gallery-nav').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.apart__gallery-for',
    dots: true,
    appendDots: '.apart__gallery-dots',
    dotsClass: 'apart__gallery-dots',
    // centerMode: true,
    focusOnSelect: true,
    arrows: false
  });

  $('.nav__link_scroll').on('click', function(e) {
    e.preventDefault();

    $('body').removeAttr('style');
    $('header .nav').removeClass('active');
    

    var id = $(this).attr('href');
    var idOffset = $(id).offset().top;

    $('body,html').animate({
      scrollTop: idOffset
    }, 300);
    
    
  });


});
$(document).ready(function(){

  $('.fill-message').fadeOut();
  $('#form').on('submit', function(e) {
    e.preventDefault()
    
    if ($('.apart__address').length) {
      var address = $('.apart__address').html();
    } else {
      var address = 'Заявка отправлена с главной страницы'
    }
    var formData = $(this).serialize()+'&address=' + address;

    $.ajax({
      type: "POST",
      url: "/assets/php/form.php",
      data: formData,
      success: function() {
        $('#form').trigger('reset');

        $('.fill-message').fadeIn(500);
        var timerId = setTimeout(function() {
          $('.fill-message').fadeOut(500);
        }, 5000);
        
      },
      error: function (xhr,status,error) {
        console.log(status);
        console.log(error);
      }
    });

  });
});
