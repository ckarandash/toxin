const wordsWithDeclensions = [
  {
    word: 'спальня',
    declensions: {
      one: 'спальня', two: 'спальни', five: 'спален',
    },
  },
  {
    word: 'кровать',
    declensions: {
      one: 'кровать', two: 'кровати', five: 'кроватей',
    },
  },
  {
    word: 'ванная комната',
    declensions: {
      one: 'ванная комната', two: 'ванные комнаты', five: 'ванных комнат',
    },
  },
  {
    word: 'взрослый',
    declensions: {
      one: 'взрослый', two: 'взрослых', five: 'взрослых',
    },
  },
  {
    word: 'ребенок',
    declensions: {
      one: 'ребенок', two: 'ребенка', five: 'детей',
    },
  },
  {
    word: 'младенец',
    declensions: {
      one: 'младенец', two: 'младенца', five: 'младенцев',
    },
  },
];

function getDeclensionOnCount(count, one, two, five) {
  const absoluteCount = Math.abs(count);
  const of100 = absoluteCount % 100;

  if (of100 >= 5 && of100 <= 20) {
    return five;
  }

  const of10 = of100 % 10;
  if (of10 === 1) {
    return one;
  }
  if (of10 >= 2 && of10 <= 4) {
    return two;
  }

  return five;
}

function getCountOfWordString(count, word) {
  const targetWordWithDeclensions = wordsWithDeclensions.find((item) => item.word === word);

  if (targetWordWithDeclensions === undefined) {
    throw new Error('Unknown word');
  }

  const { declensions } = targetWordWithDeclensions;
  const wordWithProperDeclension = getDeclensionOnCount(
    count,
    declensions.one,
    declensions.two,
    declensions.five,
  );

  const countOfWordString = `${count} ${wordWithProperDeclension}`;
  return countOfWordString;
}

export default getCountOfWordString;
