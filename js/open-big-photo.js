import './show-photos.js';
import {isEscEvent, isEnterEvent} from './util.js';

const bigPhotoContainer = document.querySelector('.big-picture');
const bigPhotoClose = bigPhotoContainer.querySelector('.big-picture__cancel');

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    closeBigPhoto();
  }
};

/**
 * Функция открытия большого фото
 * @param {string} url - ссылка на фотографию
 * @param {string} comments- список комментариев
 * @param {number} likes- кол-во лайков
 */
const openBigPhoto = (url, comments, likes, description) => {
  bigPhotoContainer.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscKeydown);

  bigPhotoClose.addEventListener('click', () => {
    closeBigPhoto();
  });

  bigPhotoClose.addEventListener('keydown', (evt) => {
    if (isEnterEvent(evt)) {
      closeBigPhoto();
    }
  });
  const photoElement = document.querySelector('.big-picture__img img');
  const commentsElement = document.querySelector('.social__comments');
  const likesElement = document.querySelector('.likes-count');
  const descriptionElement = document.querySelector('.social__caption');

  photoElement.src = url;
  likesElement.textContent = likes;
  showComment(comments, commentsElement);
  descriptionElement.textContent = description;

  document.querySelector('.social__comment-count').classList.add('hidden'); /*временно спрячьте блоки счётчика комментариев*/
  document.querySelector('.comments-loader').classList.add('hidden'); /*временно спрятать счётчик загрузки новых комментариев*/

  document.querySelector('body').classList.add('modal-open');
};

/**
 * Функция закрытия большого фото
 */
const closeBigPhoto = () => {
  bigPhotoContainer.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscKeydown);
  document.querySelector('body').classList.remove('modal-open');
};

/**
 * Функция генерации комментариев
 * @param
 */

const showComment = (comments, commentsContainer) => {
  commentsContainer.innerHTML = "";
  const userCommentTemplate = document.querySelector('#social__comments').content;
  const userCommentFragment = document.createDocumentFragment();
  comments.forEach(comment => {
    const userCommentElement = userCommentTemplate.cloneNode(true);
    userCommentElement.querySelector('.social__picture').src = comment.avatar;
    userCommentElement.querySelector('.social__picture').alt = comment.name;
    userCommentElement.querySelector('.social__text').textContent = comment.message;
    userCommentFragment.appendChild(userCommentElement);
  });
  commentsContainer.appendChild(userCommentFragment);
};

export {openBigPhoto};
