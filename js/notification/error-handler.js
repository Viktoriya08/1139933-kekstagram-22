import { isEscEvent } from '../util.js';

const errorTemplate = document.querySelector('#error').content;
const mainElement = document.querySelector('main');

const modalErrorAllUpload = document.querySelector('.error-allupload');

/**
 * Показать сообщение об ошибке загрузке всех фотографий
 */
const showErrorFetchPhotos = () => {
  modalErrorAllUpload.classList.remove('hidden');
}

/**
 * Показать сообщение о не удачной загрузке
 */
const showErrorMessage = () => {
  mainElement.appendChild(errorTemplate.cloneNode(true));

  const element = mainElement.querySelector('.error');
  clickOutside(element, onErrorButtonClick);
  const errorButton = element.querySelector('.error__button');
  errorButton.addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', onDocumentKeydownEsc)
}

/**
 * Закрытие по кнопке Esc
 * @param evt - событие
 */
const onDocumentKeydownEsc = (evt) => {
  if (isEscEvent(evt)) {
    onErrorButtonClick();
  }
};

/**
 * Скрыть модальное окно
 */
const onErrorButtonClick = () => {
  const element = mainElement.querySelector('.error');
  destroyClickOutside();
  const errorButton = element.querySelector('.error__button');
  errorButton.removeEventListener('click', onErrorButtonClick)
  document.removeEventListener('keydown', onDocumentKeydownEsc)

  mainElement.removeChild(element);
}

/**
 * Событие клика вне элемента
 * @param e - событие
 */
const onClickOutside = (e) => {
  if (!mainElement.querySelector('.error__inner').contains(e.target)) {
    onErrorButtonClick();
  }
}

/**
 * Запуск события клика вне элемента
 */
const clickOutside = () => {
  document.addEventListener('click', onClickOutside)
}

/**
 * Удаление слушателя события клика вне элемента
 */
const destroyClickOutside = () => {
  document.removeEventListener('click', onClickOutside)
}

export {showErrorFetchPhotos, showErrorMessage};
