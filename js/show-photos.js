/**
 * Функция отрисовки фотографий
 * @param {Array} photos - фото пользователей
 */
const showPhotos = (photos) => {
  const photosContainer = document.querySelector('.pictures');
  const userPhotoTemplate = document.querySelector('#picture').content;
  const userPhotoFragment = document.createDocumentFragment();
  photos.forEach(({url, comments, likes}) => {
    const userPhotoElement = userPhotoTemplate.cloneNode(true);
    userPhotoElement.querySelector('.picture__img').src = url;
    userPhotoElement.querySelector('.picture__comments').textContent = comments;
    userPhotoElement.querySelector('.picture__likes').textContent = likes;
    userPhotoFragment.appendChild(userPhotoElement);
  });
  photosContainer.appendChild(userPhotoFragment);
}

export {showPhotos};
