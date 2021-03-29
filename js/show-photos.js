/* global _:readonly */
import {openBigPhoto} from './open-big-photo.js';
import { getUniqueIds } from './util.js';

const DELAY_PHOTO_RENDER = 500;
const RANDOM_PHOTO = 10;

const photosContainer = document.querySelector('.pictures');
const userPhotoTemplate = document.querySelector('#picture').content;
const userPhotoFragment = document.createDocumentFragment();
const filterFormControls = document.querySelector('.img-filters__form');

/**
 * Функция отрисовки фотографий
 * @param {Array} photos - фото пользователей
 */
const appendPhotos = (photos) => {
  photos.forEach(({url, comments, likes, description}) => {
    const userPhotoElement = userPhotoTemplate.cloneNode(true);
    userPhotoElement.querySelector('.picture__img').src = url;
    userPhotoElement.querySelector('.picture__comments').textContent = comments.length;
    userPhotoElement.querySelector('.picture__likes').textContent = likes;

    userPhotoElement.querySelector('.picture').addEventListener('click', () => {
      openBigPhoto(url, comments, likes, description);
    })

    userPhotoFragment.appendChild(userPhotoElement);
  });
  photosContainer.appendChild(userPhotoFragment);
}

/**
 * Фильтрация фотографий
 */
const showFilteredPhotos = (photos) => {
  appendPhotos(photos);

  const defaultControl = document.querySelector('#filter-default');
  const randomControl = document.querySelector('#filter-random');
  const discussedControl = document.querySelector('#filter-discussed');

  filterFormControls.addEventListener('click', _.debounce((e) => {
    toggleActiveFilterControl(e);
    clearPhotos();

    if (e.target === discussedControl) {
      appendPhotos(sortByComments(photos))
    } else if (e.target === randomControl) {
      appendPhotos(getRandomPhotos(photos))
    } else if (e.target === defaultControl) {
      appendPhotos(photos);
    } else {
      appendPhotos(photos);
    }
  }, DELAY_PHOTO_RENDER))
}

/**
 * Переключить активный элемент управления фильтрацией
 */
const toggleActiveFilterControl = (e) => {
  filterFormControls.querySelectorAll('.img-filters__button').forEach((element) => {
    element.classList.remove('img-filters__button--active');
  });
  e.target.classList.add('img-filters__button--active');
}

/**
 * Получить случайные фотографии
 */
const getRandomPhotos = (photos) => {
  return getUniqueIds(RANDOM_PHOTO).map((id) => photos[id - 1])
}

/**
 * Отсортировать по комментариям
 * @param photos - список фотографий
 */
const sortByComments = (photos) => {
  return [...photos].sort((first, second) => {
    if (first.comments.length < second.comments.length) {
      return 1;
    }
    if (first.comments.length > second.comments.length) {
      return -1;
    }
    return 0;
  })
}

/**
 * Очистка фотографий
 */
const clearPhotos = () => {
  photosContainer.querySelectorAll('.picture').forEach((element) => {
    photosContainer.removeChild(element);
  })
}

/**
 * Показать фильтр фотографий
 */
const showPhotosFilter = () => {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
}

export { showPhotosFilter, showFilteredPhotos };
