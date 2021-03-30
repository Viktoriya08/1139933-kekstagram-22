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
  const successButton = element.querySelector('.success__button');
  successButton.addEventListener('click', onSuccessButtonClick);
  document.addEventListener('keydown', onDocumentKeydownEsc)
}

/**
 * Закрытие по кнопке Esc
 * @param evt - событие
 */
const onDocumentKeydownEsc = (evt) => {
  if (isEscEvent(evt)) {
    onSuccessButtonClick();
  }
};

/**
 * Скрыть модальное окно
 */
const onSuccessButtonClick = () => {
  const element = mainElement.querySelector('.success');
  destroyClickOutside(element, onSuccessButtonClick);
  const successButton = element.querySelector('.success__button');
  successButton.removeEventListener('click', onSuccessButtonClick)
  document.removeEventListener('keydown', onDocumentKeydownEsc)

  mainElement.removeChild(element);
}

/**
 * Событие клика вне элемента
 * @param e - событие
 */
const onClickOutside = (e) => {
  if (!mainElement.querySelector('.success__inner').contains(e.target)) {
    onSuccessButtonClick();
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
