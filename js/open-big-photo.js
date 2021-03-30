import './show-photos.js';
import {isEscEvent, isEnterEvent} from './util.js';

const SHOWED_COMMENTS_STEP = 5;
const DEFAULT_SHOWED_COMMENTS = SHOWED_COMMENTS_STEP;

const bigPhotoContainer = document.querySelector('.big-picture');
const bigPhotoClose = bigPhotoContainer.querySelector('.big-picture__cancel');
const commentsCount = document.querySelector('.comments-count');
const commentsCurrentCount = document.querySelector('.comments-current-count');
const loadMoreCommentButton = document.querySelector('.comments-loader');
const photoElement = document.querySelector('.big-picture__img img');
const likesElement = document.querySelector('.likes-count');
const descriptionElement = document.querySelector('.social__caption');

const onDocumentKeydownEsc = (evt) => {
  if (isEscEvent(evt)) {
    closeBigPhoto();
  }
};

/**
 * Функция открытия большого фото
 * @param {string} url - ссылка на фотографию
 * @param {string} comments- список комментариев
 * @param {number} likes- количество лайков
 */
const openBigPhoto = (url, comments, likes, description) => {
  bigPhotoContainer.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeydownEsc);

  bigPhotoClose.addEventListener('click', () => {
    closeBigPhoto();
  });

  bigPhotoClose.addEventListener('keydown', (evt) => {
    if (isEnterEvent(evt)) {
      closeBigPhoto();
    }
  });

  commentHandler(comments);

  photoElement.src = url;
  likesElement.textContent = likes;
  descriptionElement.textContent = description;

  document.querySelector('body').classList.add('modal-open');
};

/**
 * Callback показа комментариев
 */
const onLoadMoreCommentButtonClick = () => {
  let count = 0;
  const comments = Array.from(document.querySelectorAll('.social__comment'));

  comments.forEach((comment) => {
    if (comment.classList.contains('hidden') && count < SHOWED_COMMENTS_STEP) {
      comment.classList.remove('hidden');
      count++;
    }
  });

  const showedComments = comments.filter(comment => !comment.classList.contains('hidden'));

  commentsCurrentCount.innerText = showedComments.length;

  if (comments.length === showedComments.length) {
    hideLoadMoreCommentButton();
  }
}

/**
 * Обработчик комментариев
 */
const commentHandler = (comments) => {
  commentsCurrentCount.innerText = comments.slice(0, DEFAULT_SHOWED_COMMENTS).length;
  commentsCount.innerText = comments.length;

  const commentsElement = document.querySelector('.social__comments');
  showComment(comments, commentsElement);

  if (comments.length > DEFAULT_SHOWED_COMMENTS) {
    showLoadMoreCommentButton();
    loadMoreCommentButton.addEventListener('click', onLoadMoreCommentButtonClick);
  } else {
    hideLoadMoreCommentButton();
  }
}

/**
 * Отписка от загрузки комментариев
 */
const destroyCommentLoadMore = () => {
  loadMoreCommentButton.removeEventListener('click', onLoadMoreCommentButtonClick);
}

/**
 * Показать кнопку "Загрузить еще"
 */
const showLoadMoreCommentButton = () => {
  loadMoreCommentButton.classList.remove('hidden');
}

/**
 * Скрыть кнопку "Загрузить еще"
 */
const hideLoadMoreCommentButton = () => {
  loadMoreCommentButton.classList.add('hidden');
}

/**
 * Функция закрытия большого фото
 */
const closeBigPhoto = () => {
  bigPhotoContainer.classList.add('hidden');
  destroyCommentLoadMore();
  document.removeEventListener('keydown', onDocumentKeydownEsc);
  document.querySelector('body').classList.remove('modal-open');
};

/**
 * Функция генерации комментариев
 * @param comments - список комментариев
 * @param commentsContainer - контейнер для вставки комментариев
 */
const showComment = (comments, commentsContainer) => {
  commentsContainer.innerHTML = '';
  const userCommentTemplate = document.querySelector('#social__comments').content;
  const userCommentFragment = document.createDocumentFragment();
  comments.forEach((comment, index) => {
    const userCommentElement = userCommentTemplate.cloneNode(true);
    if (index + 1 > DEFAULT_SHOWED_COMMENTS) {
      userCommentElement.querySelector('.social__comment').classList.add('hidden');
    }
    userCommentElement.querySelector('.social__picture').src = comment.avatar;
    userCommentElement.querySelector('.social__picture').alt = comment.name;
    userCommentElement.querySelector('.social__text').textContent = comment.message;
    userCommentFragment.appendChild(userCommentElement);
  });
  commentsContainer.appendChild(userCommentFragment);
};

export {openBigPhoto};
