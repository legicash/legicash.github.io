$(function () {

	/*SMOOTH SCROLL TO ANCHOR START*/
	$('.header__menu__item,.mmenu__menu__item').on('click', 'a[href^="#"]', function (event) {
		event.preventDefault();
		let scrollSpeed = 1500;
		setTimeout(() => {
			$(this).blur();
		}, scrollSpeed);
		let scrollTo = $($.attr(this, 'href')).offset().top - $('.header').height()
		$('html, body').animate({
			scrollTop: scrollTo
		}, scrollSpeed);
	});

	/*SMOOTH SCROLL TO ANCHOR END*/

	/*MMENU HANDLER*/
	$('.burger').click(openMmenu);
	$('.mmenu__menu__item,.burger__close').click(closeMmenu)

	function openMmenu() {
		$('.header').fadeOut('slow')
		setTimeout(() => {
			$('.mmenu').slideDown(1000)
		}, 300);
		$('.burger__close').fadeIn('slow')
		setTimeout(() => {
			$('.legicash-page').on('click', closeMmenu)
		}, 10);

	}

	function closeMmenu() {
		$('.mmenu').slideUp('slow')
		$('.burger__close').fadeOut('slow')
		$('.legicash-page').off('click', closeMmenu)
		setTimeout(() => {
			$('.header').fadeIn(800)
		}, 700);

	}

	// POPUP HANDLING
	$('.advisors__photo').on('click', popup)
	$('.popup').on('click', (e)=>{e.stopPropagation();})
	$('.popup__container,.popup__close').on('click', closePopup)


	function popup() {
		$('.popup__container').show()
		$('.popup').animate({
			opacity: '1'
		}, 500)
	}

	function closePopup(e) {
		e.stopPropagation();
		$('.popup').animate({
			opacity: '0'
		}, 500)

		$('.popup__container').hide(500)
	}
	// POPUP HANDLING END
});