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
  return line.length < long;
}


/**
 * @param {object} photos - объект массива - фото пользователя. Состоит из:
 *
 *   @param {number} id - число — идентификатор описания. Это число от 1 до 25. Идентификаторы не должны повторяться.
 *   @param {string} url - строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
 *   @param {string} description - строка — описание фотографии. Описание придумайте самостоятельно.
 *   @param {number} likes число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
 *   @param {Array} comments -  массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Сосит из:
 *      @param {number} id - случайное число
 *      @param {string} avatar - это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg.
 *      @param {string} message - Всё отлично!
                                В целом всё неплохо. Но не всё.
                                Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
                                Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
                                Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
                                Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!
      @param {string} name - Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами.

 * @return {Array} - массива из 25 сгенерированных объектов.
 */

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
 * @param {number} id - случ число
 * @param {sting} avatar - img/avatar-{{случайное число от 1 до 6}}.svg.
 * @param {sting} message - случайное сообщение
 * @param {sting} name - случайное имя
 * @return {object} - собрать объект случайного комментария
 */
const createComment = (id) => {
  return {
    id: id,
    avatar: 'img/avatar-' + id + '.svg',
    message: MESSAGES[id],
    name: NAMES[getRandomIntInclusive(0, NAMES.length - 1)],
  };
};

/**
 *  @param {number} id - случайное число
 *  @param {string} avatar - это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg.
 *  @param {string} message - Всё отлично!
                                В целом всё неплохо. Но не всё.
                                Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
                                Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
                                Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
                                Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!
    @param {string} name - Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами.

 *  @return {Array} comments -  массив объектов — список комментариев, оставленных другими пользователями к этой фотографии.
 */
const createPhoto = (id) => {
  const countComments = 6;
  const commentsList = getUnicIds(getRandomIntInclusive(1, countComments)).map((value) => createComment(value))
  return {
    id: id,
    url: 'photos/' + id + '.jpg',
    description: DESCRIPTION_PHOTOS[getRandomIntInclusive(0, DESCRIPTION_PHOTOS.length - 1)],
    likes: getRandomIntInclusive(15, 200),
    comments: commentsList,
  };
};

const photos = getUnicIds(25).map((value) => createPhoto(value))

console.log(photos);
