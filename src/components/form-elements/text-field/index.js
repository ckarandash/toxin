import Inputmask from 'inputmask';

document.addEventListener('DOMContentLoaded', () => {
  const inputs = document.querySelectorAll('.text-field__input_masked');

  const im = new Inputmask({
    alias: 'datetime',
    inputFormat: 'dd.mm.yyyy',
    placeholder: 'ДД.ММ.ГГГГ',
  });

  inputs.forEach((i) => {
    im.mask(i);
  });
});
