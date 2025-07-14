$(window).on('scroll', function() {
  if ($(window).scrollTop() === 0) {
    $('header').addClass('transparent');
  } else {
    $('header').removeClass('transparent');
  }
});

$(function() {
  if ($(window).scrollTop() === 0) {
    $('header').addClass('transparent');
  }

  // Animacja kroków w #process
  const $steps = $('#process').children('div');
  let current = 0;
  let intervalId;
  let animating = false;
  $steps.hide().eq(0).show();

  function showStep(idx, direction = 1) {
    if (idx === current || animating) return;
    animating = true;
    const $current = $steps.eq(current);
    const $next = $steps.eq(idx);

    // Kierunek animacji (1 = w prawo, -1 = w lewo)
    const outLeft = direction > 0 ? '-80px' : '80px';
    const inLeft = direction > 0 ? '80px' : '-80px';

    // Nowoczesna animacja z rozmyciem i skalą
    $current
      .css({zIndex: 1})
      .animate(
        {opacity: 0, left: outLeft, filter: "blur(8px) brightness(0.8)", scale: 0.97},
        {
          duration: 350,
          step: function(now, fx) {
            if (fx.prop === "opacity") {
              $(this).css("transform", `scale(${0.97 + 0.03 * now})`);
            }
          },
          complete: function() {
            $(this).hide().css({opacity: 1, left: 0, zIndex: '', filter: '', transform: ''});
          }
        }
      );

    $next
      .css({display: 'block', opacity: 0, left: inLeft, zIndex: 2, filter: "blur(8px) brightness(1.2)", transform: "scale(1.06)"})
      .animate(
        {opacity: 1, left: 0, filter: "blur(0px) brightness(1)", scale: 1},
        {
          duration: 500,
          step: function(now, fx) {
            if (fx.prop === "opacity") {
              $(this).css("transform", `scale(${1.06 - 0.06 * (1-now)})`);
            }
          },
          complete: function() {
            $(this).css({zIndex: '', filter: '', transform: ''});
            animating = false;
          }
        }
      );

    current = idx;
  }

  function showNextStep() {
    let next = (current + 1) % $steps.length;
    showStep(next, 1);
  }

  function showPrevStep() {
    let prev = (current - 1 + $steps.length) % $steps.length;
    showStep(prev, -1);
  }

  function startInterval() {
    intervalId = setInterval(showNextStep, 5000);
  }

  function stopInterval() {
    clearInterval(intervalId);
  }

  // Start animacji
  startInterval();

  // Zatrzymywanie animacji po najechaniu myszką na dowolny krok
  $steps.on('mouseenter', stopInterval);
  $steps.on('mouseleave', startInterval);

  // Obsługa strzałek
  $('.process-btn').eq(0).on('click', function() {
    stopInterval();
    showPrevStep();
    startInterval();
  });
  $('.process-btn').eq(1).on('click', function() {
    stopInterval();
    showNextStep();
    startInterval();
  });

  // Skrypt do sekcji cen
  function showCenyDiv(selected) {
    // Ukryj wszystkie divy z ofertami
    $('#wizytowka, #branding, #firmy, #blog, #influencer').hide();
    // Pokaż wybrany div
    $('#' + selected).fadeIn(200);
  }

  // Domyślnie pokaż pierwszy (branding)
  showCenyDiv($('#type').val());

  $('#type').on('change', function() {
    showCenyDiv($(this).val());
  });



  // Przewijanie do formularza kontaktowego po kliknięciu przycisku "Konsultacja"
  $('.Konsultacja').on('click', function(e) {
    e.preventDefault();
    const $target = $('#kontakt');
    if ($target.length) {
      // Jeśli header jest fixed, odejmij jego wysokość
      const headerHeight = $('header').outerHeight() || 0;
      $('html, body').animate({
        scrollTop: $target.offset().top - headerHeight - 12
      }, 600);
    }
  });
});