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
 * @param {sting} line - исходная строка
 * @param {number} long - максимальное количетсво символов
 * @return {boolean} - истина, если допустимое количесвто символов
 */
const checkCommentLength = function (line, long) {
  const checkLine = (line.length < long) ? true : false;
  return checkLine;
}

console.log(checkCommentLength('Пр', 5));




