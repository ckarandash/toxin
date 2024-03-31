document.addEventListener('DOMContentLoaded', () => {
  const roomCardElements = document.querySelectorAll('.room-card');

  Array.from(roomCardElements).forEach((roomCardElement) => {
    const picturesCount = roomCardElement.querySelectorAll('.js-room-card__image').length;
    const onePictureOffsetInPercents = 100 / picturesCount;
    let currentPictureNumber = 1;

    const picturesCarousel = roomCardElement.querySelector('.js-room-card__pictures-carousel');
    const prevPictureButton = roomCardElement.querySelector('.js-room-card__prev-picture-btn');
    const nextPictureButton = roomCardElement.querySelector('.js-room-card__next-picture-btn');
    const roomCardButtons = roomCardElement.querySelectorAll('.js-room-card__picture-button');
    const pictureButtonActiveClass = 'room-card__picture-button_active';
    roomCardButtons[0].classList.add(pictureButtonActiveClass);

    const renderCarouselOffset = () => {
      const carouselOffsetInPercents = onePictureOffsetInPercents * (currentPictureNumber - 1);
      picturesCarousel.style.transform = `translateX(-${carouselOffsetInPercents}%)`;
    };

    const renderPictureButtons = () => {
      roomCardButtons.forEach((el) => {
        if (el.classList.contains(pictureButtonActiveClass)) {
          el.classList.remove(pictureButtonActiveClass);
        }
      });

      roomCardButtons[currentPictureNumber - 1].classList.add(pictureButtonActiveClass);
    };

    const renderCarousel = () => {
      renderCarouselOffset();
      renderPictureButtons();
    };

    prevPictureButton.addEventListener('click', () => {
      const mustJumpToLastPicture = currentPictureNumber - 1 <= 0;
      currentPictureNumber = mustJumpToLastPicture
        ? picturesCount : currentPictureNumber - 1;

      renderCarousel();
    });

    nextPictureButton.addEventListener('click', () => {
      const mustJumpToFirstPicture = currentPictureNumber + 1 > picturesCount;
      currentPictureNumber = mustJumpToFirstPicture ? 1 : currentPictureNumber + 1;

      renderCarousel();
    });

    Array.from(roomCardButtons).forEach((buttonElement, buttonIndex) => {
      buttonElement.addEventListener('click', () => {
        currentPictureNumber = buttonIndex + 1;
        renderCarousel();
      });
    });
  });
});
