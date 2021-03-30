import { isEscEvent } from './util.js';
import { clearTags, clearDescription, validateForm, destroyValidateForm } from './form-upload-photo.js';
import { postPhoto } from './send-photo.js';
import { changeEffect, clearEffectValue, destroyChangeEffect, destroyUISlider, clearEffect, toggleEffectLevelBackBySelectedEffect } from './edit-photo/effect-photo.js';
import { changeSizePhoto, destroyChangeSizePhoto, clearScale } from './edit-photo/scale-photo.js';
import { showSuccessMessage } from './notification/success-handler.js';
import { showErrorMessage } from './notification/error-handler.js';

const uploadInput = document.querySelector('#upload-file');
const uploadCancel = document.querySelector('#upload-cancel');
const imageUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');

/**
 * Загрузка фото
 */
const uploadPhoto = () => {
  // он всегда должен висеть на документе для открытия модального окна
  uploadInput.addEventListener('change', () => {
    toggleEffectLevelBackBySelectedEffect();
    showImgUploadOverlay();
    changeSizePhoto();
    changeEffect();
    validateForm();
    sendPhoto();

    document.addEventListener('keydown', onDocumentKeydownEsc);
    uploadCancel.addEventListener('click', onUploadCancelClick);
  })
};

/**
 * Показать загрузчик фото
 */
const showImgUploadOverlay = () => {
  imageUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
}

/**
 * Обработчик закрытия модального окна по клавише Esc
 * @param {event} evt - событие
 */
const onDocumentKeydownEsc = (evt) => {
  if (isEscEvent(evt) && !evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
    onUploadCancelClick();
  }
};

/**
 * Скрыть загрузчик фото
 */
const hideImgUploadOverlay = () => {
  imageUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
}

/**
 * Функция закрытия окна редактирования фото
 */
const onUploadCancelClick = () => {
  hideImgUploadOverlay();
  clearEffectValue();
  clearEffect();
  clearUploadInput();
  clearDescription();
  clearTags();
  clearScale();
  destroyUploadPhoto();
};

/**
 * Удаление eventListener
 */
const destroyUploadPhoto = () => {
  document.removeEventListener('keydown', onDocumentKeydownEsc);
  uploadCancel.removeEventListener('click', onUploadCancelClick);

  destroyChangeSizePhoto();
  destroyChangeEffect();
  destroyUISlider();
  destroyValidateForm();
  destroySendPhoto();
}

/**
 * Очистка поле ввода фотографии
 */
const clearUploadInput = () => {
  uploadInput.value = '';
}

// ===== отправка фото
const photoForm = document.querySelector('#upload-select-image');

/**
 * Событие отправки формы с фото
 * @param e - событие
 */
const onPhotoFormSubmit = (e) => {
  e.preventDefault();
  const data = new FormData(photoForm);
  postPhoto(data)
    .then(() => {
      onUploadCancelClick();
      showSuccessMessage();
    })
    .catch(() => {
      onUploadCancelClick();
      showErrorMessage();
    });
};

/**
 * Отправка фотографии
 */
const sendPhoto = () => {
  photoForm.addEventListener('submit', onPhotoFormSubmit);
}

/**
 * Отписка от слушателя отправки фотографии
 */
const destroySendPhoto = () => {
  photoForm.removeEventListener('submit', onPhotoFormSubmit)
}

export {uploadPhoto};


