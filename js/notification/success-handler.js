import { isEscEvent } from '../util.js';

const successTemplate = document.querySelector('#success').content;
const mainElement = document.querySelector('main');

/**
 * Показать сообщение об успешной загрузке
 */
const showSuccessMessage = () => {
  mainElement.appendChild(successTemplate.cloneNode(true));

  const element = mainElement.querySelector('.success');
  clickOutside();
  element.querySelector('.success__button').addEventListener('click', hideSuccessMessage);
  document.addEventListener('keydown', onHideMessageEsc)
}

/**
 * Закрытие по кнопке Esc
 * @param evt - событие
 */
const onHideMessageEsc = (evt) => {
  if (isEscEvent(evt)) {
    hideSuccessMessage();
  }
};

/**
 * Скрыть модальное окно
 */
const hideSuccessMessage = () => {
  const element = mainElement.querySelector('.success');
  destroyClickOutside(element, hideSuccessMessage);
  element.querySelector('.success__button').removeEventListener('click', hideSuccessMessage)
  document.removeEventListener('keydown', onHideMessageEsc)

  mainElement.removeChild(element);
}

/**
 * Событие клика вне элемента
 * @param e - событие
 */
const onClickOutside = (e) => {
  if (!mainElement.querySelector('.success__inner').contains(e.target)) {
    hideSuccessMessage();
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

export { showSuccessMessage }
