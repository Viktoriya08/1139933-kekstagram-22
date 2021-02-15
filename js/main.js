const DESCRIPTION_PHOTOS = [
  'Сидим с котиком',
  'Играю с котиком',
  'Гуляю с котиком',
  'Глажу котика',
  'Целую котика',
  'Кормлю котика',
]

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
]

const NAMES = ['Ольга', 'Николай', 'Валентина', 'Илья', 'София', 'Мария']

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
 * Получаем уникалный номер id
 * @param {number} count - случайное число
 * @return {object} - объект уникальных id
 */
const getUnicIds = (count) => {
  const maxElement = count > 1 ? count - 1 : count;
  const ids = [];
  let id = getRandomIntInclusive(0, maxElement);

  while(ids.length !== count) {
    const isNotUnicId = ids.some((value) => value === id);

    if (isNotUnicId) {
      id = getRandomIntInclusive(0, maxElement);
    } else {
      ids.push(id);
    }

  }
  return ids;
}

/**
 * Функция генерирует случайный элемент массива
 * @param {Array} elements - массив
 * @return {string} -  случайный елемент из массива
 */
const getRandomArrayElement = (elements) => {
  return elements[getRandomIntInclusive(0, elements.length - 1)];
};

/**
 * Функция генерирует объект комментарий
 * @param {number} id - случ число
 * @return {object} -  объект — комментария, оставленных другими пользователями к этой фотографии.
 */
const createComment = (id) => {
  return {
    id: id,
    avatar: 'img/avatar-' + id + '.svg',
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  };
};

/**
 * Функция генерации одного фото пользователя
 * @param {number} id - число — идентификатор описания. Это число от 1 до 25. Идентификаторы не должны повторяться.
 * @return {object} - объект.
 */
const createPhoto = (id) => {
  const countComments = 6;
  const commentsList = getUnicIds(getRandomIntInclusive(1, countComments)).map((value) => createComment(value))
  return {
    id: id,
    url: 'photos/' + id + '.jpg',
    description: getRandomArrayElement(DESCRIPTION_PHOTOS),
    likes: getRandomIntInclusive(15, 200),
    comments: commentsList,
  };
};

/**
 * Функция генерации массива фото пользователей
 * @param {object} - объект фото пользователя
 * @return {Array} - массив из фото
 */
const photos = getUnicIds(25).map((value) => createPhoto(value))

