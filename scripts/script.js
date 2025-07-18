$(function () {
  // Proces animowany krok po kroku
  const $steps = $('#process > div');
  const $leftBtn = $('#process .process-btn').first();
  const $rightBtn = $('#process .process-btn').last();
  let current = 0;

  // Ukryj wszystkie kroki oprócz pierwszego
  $steps.hide().eq(0).show();

  function showStep(idx, direction = 1) {
    if (idx < 0) idx = $steps.length - 1;
    if (idx >= $steps.length) idx = 0;
    const $current = $steps.filter(':visible');
    const $next = $steps.eq(idx);

    // Animacja wyjścia
    $current
      .css('position', 'absolute')
      .animate(
        { opacity: 0, left: direction > 0 ? '-=60px' : '+=60px' },
        250,
        function () {
          $current.hide().css({ opacity: 1, left: 0, position: '' });
          // Animacja wejścia
          $next
            .css({ opacity: 0, left: direction > 0 ? '60px' : '-60px', position: 'relative', display: 'block' })
            .animate({ opacity: 1, left: 0 }, 350);
        }
      );
    current = idx;
  }

  $rightBtn.on('click', function () {
    showStep(current + 1, 1);
  });

  $leftBtn.on('click', function () {
    showStep(current - 1, -1);
  });

  // Swipe na urządzeniach mobilnych
  let touchStartX = null;
  $('#process').on('touchstart', function (e) {
    touchStartX = e.originalEvent.touches[0].clientX;
  });
  $('#process').on('touchend', function (e) {
    if (touchStartX === null) return;
    let touchEndX = e.originalEvent.changedTouches[0].clientX;
    if (touchEndX - touchStartX > 50) {
      showStep(current - 1, -1); // Swipe right
    } else if (touchStartX - touchEndX > 50) {
      showStep(current + 1, 1); // Swipe left
    }
    touchStartX = null;
  });

  // Sekcja cen: dynamiczne wyświetlanie odpowiedniej tabeli/oferty
  function showCenySection(type) {
    $('#wizytowka, #branding, #firmy, #blog, #influencer').hide();
    if (type === 'wizytowka') {
      $('#wizytowka').show();
    } else if (type === 'branding') {
      $('#branding').show();
    } else if (type === 'firmy') {
      $('#firmy').show();
    } else if (type === 'blog') {
      $('#blog').show();
    } else if (type === 'influencer') {
      $('#influencer').show();
    }
  }

  // Pokaż domyślnie pierwszą sekcję
  showCenySection($('#type').val());

  // Obsługa zmiany selecta
  $('#type').on('change', function () {
    showCenySection($(this).val());
  });

  // Przewijanie do formularza kontaktowego po kliknięciu dowolnego przycisku .Konsultacja
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
