import './show-photos.js';
import {isEscEvent, isEnterEvent} from './util.js';

const BigPhotoContainer = document.querySelector('.big-picture');
const BigPhotoOpen = document.querySelector('.pictures');
const BigPhotoClose = BigPhotoContainer.querySelector('.big-picture__cancel');

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeBigPhoto();
  }
};

/**
 * Функция открытия большого фото
 * @param {boolean} - истина, если
 */
const openBigPhoto = () => {
  BigPhotoContainer.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscKeydown);
};

/**
 * Функция закрытия большого фото
 * @param {boolean} - истина, если
 */
const closeBigPhoto = () => {
  BigPhotoContainer.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscKeydown);
};

BigPhotoOpen.addEventListener('click', () => {
  openBigPhoto();
});

BigPhotoOpen.addEventListener('keydown', (evt) => {
  if (isEnterEvent(evt)) {
    openBigPhoto();
  }
});

BigPhotoClose.addEventListener('click', () => {
  closeBigPhoto();
});

BigPhotoClose.addEventListener('keydown', (evt) => {
  if (isEnterEvent(evt)) {
    closeBigPhoto();
  }
});


/**
 * Функция отрисовки большого фото
 * @param {Array} photos - фото пользователей
 */
