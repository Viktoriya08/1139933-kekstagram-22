import {photos} from './create-photo.js';

const userPhoto = document.querySelector('.pictures');
const fieldUploadPhoto = userPhoto.querySelector('.img-upload');
const userPictureTemplate = document.querySelector('#picture')
  .content;

const photoElement = userPictureTemplate.cloneNode(true);
fieldUploadPhoto.appendChild(photoElement);

const othersPhotos = photos();

const userPhotoFragment = document.createDocumentFragment();

othersPhotos.forEach(({url, comments, likes}) => {
  const userPhotoElement = userPictureTemplate.cloneNode(true);
  userPhotoElement.querySelector('.picture__img').textContent = url;
  userPhotoElement.querySelector('.picture__comments').textContent = comments;
  userPhotoElement.querySelector('.picture__likes').textContent = likes;
  userPhotoFragment.appendChild(userPhotoElement);
});

fieldUploadPhoto.appendChild(userPhotoFragment);
