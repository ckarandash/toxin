document.addEventListener('DOMContentLoaded', () => {
  const checkboxLists = document.querySelectorAll('.checkbox-list');

  Array.from(checkboxLists).forEach((checkboxList) => {
    const labelElement = checkboxList.querySelector('.checkbox-list__label');

    labelElement.addEventListener('click', () => {
      const listOpened = checkboxList.classList.contains('checkbox-list_opened');

      if (listOpened) {
        checkboxList.classList.remove('checkbox-list_opened');
      } else {
        checkboxList.classList.add('checkbox-list_opened');
      }
    });
  });
});
