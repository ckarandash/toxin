document.addEventListener('DOMContentLoaded', () => {
  const likeButtons = document.querySelectorAll('.js-like-btn');

  Array.from(likeButtons).forEach((likeButton) => {
    likeButton.addEventListener('click', () => {
      const buttonClicked = likeButton.classList.contains('like-btn_clicked');
      const likesCountElement = likeButton.querySelector('.js-like-btn-count');
      const likesCountValue = +likesCountElement.textContent;

      if (buttonClicked) {
        likeButton.classList.remove('like-btn_clicked');
        likesCountElement.textContent = likesCountValue - 1;
      } else {
        likeButton.classList.add('like-btn_clicked');
        likesCountElement.textContent = likesCountValue + 1;
      }
    });
  });
});
