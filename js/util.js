/**
 * Получение случайного числа из интервала
 * @param {number} min - минимальное число интервала
 * @param {number} max - максимальное число интервала
 * @return {number} - случайное число
 */
const getRandomIntInclusive = function (min, max) {
  const minValid = (min < 0) ? 0 : Math.ceil(min);
  const maxValid = (max < 0) ? 0 : Math.floor(max);
  if (maxValid <= minValid) {
    console.log('Ошибка передаваемых параметров');
    return;
  }
  const randomNumber = Math.random() * (maxValid - minValid + 1);
  return Math.floor(randomNumber) + minValid;
}

/**
 * Проверяем длинну комментрия на допустимое число
 * @param {sting} line - исходная строка
 * @param {number} long - максимальное количетсво символов
 * @return {boolean} - истина, если допустимое количесвто символов
 */
const checkCommentLength = function (line, long) {
  return line.length < long;
}

/**
 * Проверка нажатой клавиши Esc
 * @param {boolean} evt - истина, если нажата клавиша Esc или Escape
 */
const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

/**
 * Проверка нажатой клавиши Enter
 * @param {boolean} evt - истина, если нажата клавиша Enter
 */
const isEnterEvent = (evt) => {
  return evt.key === 'Enter';
};

/**
 * Получаем уникальный номер id
 * @param {number} count - случайное число
 * @return {object} - объект уникальных id
 */
const getUniqueIds = (count) => {
  const maxElement = count;
  const ids = [];
  let id = getRandomIntInclusive(1, maxElement);

  while(ids.length !== count) {
    const isNotUniqueId = ids.some((value) => value === id);

    if (isNotUniqueId) {
      id = getRandomIntInclusive(1, maxElement);
    } else {
      ids.push(id);
    }

  }
  return ids;
}

export {getRandomIntInclusive, isEscEvent, isEnterEvent, checkCommentLength, getUniqueIds};
