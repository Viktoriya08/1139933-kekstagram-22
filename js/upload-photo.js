import { isEscEvent } from './util.js';
import { clearTags, clearDescription, validateForm, destroyValidateForm } from './form-upload-photo.js';
import { postPhoto } from './send-photo.js';
import { changeEffect, clearEffectValue, destroyChangeEffect, destroyUISlider, clearEffect, toggleEffectLevelBackBySelectedEffect } from './edit-photo/effect-photo.js';
import { changeSizePhoto, destroyChangeSizePhoto, clearScale } from './edit-photo/scale-photo.js';
import { showSuccessMessage } from './notification/success-handler.js';
import { showErrorMessage } from './notification/error-handler.js';

const uploadInput = document.querySelector('#upload-file');
const upLoadCancel = document.querySelector('#upload-cancel');

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

    document.addEventListener('keydown', onUploadPhotoEscKeydown);
    upLoadCancel.addEventListener('click', closeUploadPhoto);
  })
};

/**
 * Показать загрузчик фото
 */
const showImgUploadOverlay = () => {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
}

/**
 * Обработчик закрытия модального окна по клавише Esc
 * @param {event} evt - событие
 */
const onUploadPhotoEscKeydown = (evt) => {
  if (isEscEvent(evt) && !evt.target.classList.contains('text__hashtags') && !evt.target.classList.contains('text__description')) {
    closeUploadPhoto();
  }
};

/**
 * Скрыть загрузчик фото
 */
const hideImgUploadOverlay = () => {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
}

/**
 * Функция закрытия окна редактирования фото
 */
const closeUploadPhoto = () => {
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
  document.removeEventListener('keydown', onUploadPhotoEscKeydown);
  upLoadCancel.removeEventListener('click', closeUploadPhoto);

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
const sendPhotoForm = document.querySelector('#upload-select-image');

/**
 * Событие отправки формы с фото
 * @param e - событие
 */
const onSubmitEvent = (e) => {
  e.preventDefault();
  const data = new FormData(document.querySelector('#upload-select-image'));
  postPhoto(data)
    .then(() => {
      closeUploadPhoto();
      showSuccessMessage();
    })
    .catch(() => {
      closeUploadPhoto();
      showErrorMessage();
    });
};

/**
 * Отправка фотографии
 */
const sendPhoto = () => {
  sendPhotoForm.addEventListener('submit', onSubmitEvent);
}

/**
 * Отписка от слушателя отправки фотографии
 */
const destroySendPhoto = () => {
  sendPhotoForm.removeEventListener('submit', onSubmitEvent)
}

export {uploadPhoto};


