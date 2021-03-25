import { isEscEvent } from '../util.js';

const errorTemplate = document.querySelector('#error').content;
const mainElement = document.querySelector('main');

const momalErrorAllUpload = document.querySelector('.error-allupload');

const errorHandlerModal = () => {
  momalErrorAllUpload.classList.remove('hidden');
}

/**
 * Показать сообщение о не удачной загрузке
 */
const showErrorMessage = () => {
  mainElement.appendChild(errorTemplate.cloneNode(true));

  const element = mainElement.querySelector('.error');
  clickOutside(element, hideErrorMessage);
  element.querySelector('.error__button').addEventListener('click', hideErrorMessage);
  document.addEventListener('keydown', onHideMessageEsc)
}

/**
 * Закрытие по кнопке Esc
 * @param evt - событие
 */
const onHideMessageEsc = (evt) => {
  if (isEscEvent(evt)) {
    hideErrorMessage();
  }
};

/**
 * Скрыть модальное окно
 */
const hideErrorMessage = () => {
  const element = mainElement.querySelector('.error');
  destroyClickOutside();
  element.querySelector('.error__button').removeEventListener('click', hideErrorMessage)
  document.removeEventListener('keydown', onHideMessageEsc)

  mainElement.removeChild(element);
}

/**
 * Событие клика вне элемента
 * @param e - событие
 */
const onClickOutside = (e) => {
  if (!mainElement.querySelector('.error__inner').contains(e.target)) {
    hideErrorMessage();
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

export {errorHandlerModal, showErrorMessage};
