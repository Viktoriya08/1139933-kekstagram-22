import {openBigPhoto} from './open-big-photo.js';
/**
 * Функция отрисовки фотографий
 * @param {Array} photos - фото пользователей
 */
const showPhotos = (photos) => {
  const photosContainer = document.querySelector('.pictures');
  const userPhotoTemplate = document.querySelector('#picture').content;
  const userPhotoFragment = document.createDocumentFragment();
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

export {showPhotos};
