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
          {
            coordinates: [55.39718857, 43.83859450],
            price: 'от 800 руб',
            men: 'Размещение 3 человек',
            room: '1-комнатная квартира',
            address: 'ул. 50 лет ВЛКСМ, д. 38, этаж 4',
            link: '/50-let-38-4.html'
          },
          {
            coordinates: [55.39718857, 43.83859450],
            price: 'от 800 руб',
            men: 'Размещение 3 человек',
            room: '1-комнатная квартира',
            address: 'ул. 50 лет ВЛКСМ, д. 38, этаж 4',
            link: '/50-let-38-4.html'
          },
          {
            coordinates: [55.39683557, 43.82569450],
            price: 'от 900 руб',
            men: 'Размещение 3 человек',
            room: '1-комнатная квартира',
            address: 'ул. Карла Маркса, д. 60, этаж 2',
            link: '/karl-marks-60.html'
          },
          {
            coordinates: [55.39675457, 43.82665550],
            price: 'от 900 руб',
            men: 'Размещение 4 человек',
            room: '1-комнатная квартира',
            address: 'ул. Карла Маркса, д. 62, этаж 4',
            link: '/karl-marks-62.html'
          },
        ];
        // var pointer = [
        //   [55.39718857, 43.83859450], 50 лет ВЛКСМ
        //   [55.39683557, 43.82569450], К.Маркса 60 
        //   [55.39675457, 43.82665550], К.Маркса 62
        //   [55.40127307, 43.84588850], Матросова 6
        //   [55.40414328, 43.85370471], Мира 28а - 2 квартиры
        // [55.40408598710869,43.8536766513301]
        // [55.40431186805196,43.85392341455946]
        //   [55.39488257, 43.83443500], Шер 3
        //   [55.40426907, 43.81760950], Жуковского 13
        //   [55.39912656933899,43.81527400000001], Калинина 14
        //   [55.39854856933753,43.81631599999996], Калинина 16а
        //   [55.404923069324234,43.82017899999997] Жуковского 4 - 2 квартиры
        // [55.405194875667924,43.82013608465573] Жуковского 4
        // [55.40477074225374,43.82021374012698] Жуковского 4
        // [55.40423806932247,43.816469000000005] Жуковского 13/2
        // ];
      
        var myMap = new ymaps.Map("map-index", {
          center: [55.40021745, 43.83314585],
          zoom: 15
        }, {
          searchControlProvider: 'yandex#search'
      });

        // myMap.behaviors.disable('scrollZoom');
        
        for(i = 0; i < pointer.length; ++i) {
          place = new ymaps.Placemark(pointer[i].coordinates, {
            balloonContentHeader: "Стоимость: " + pointer[i].price,
            balloonContentBody: "<div><p style='margin: 5px 0'>" + pointer[i].men + "</p><p style='margin: 5px 0'>" + pointer[i].room + "</p><p style='margin: 5px 0'>" + pointer[i].address + "</p></div>",
            balloonContentFooter: "<a href='" + pointer[i].link +  "' target='_blank'>Перейти на страницу квартиры</a>"
          });
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
