import { checkCommentLength } from './util.js';

const MAX_COMMENT_LENGTH = 140;
const HASH_TAG_RULE = /^(#[\wа-яА-Я\d-]{1,20})$/;
const MAX_LENGTH_ERROR_TEXT = 'Максимальное количество 140 знаков';
const NOT_REPEAT_TAGS = 'Один и тот же хэш-тег не может быть использован дважды';
const MAX_QUANTITY_TAGS = 'Превышена максимальное количество хэш-тегов';
const NOT_FORMAT_TAGS = 'Хэш-тег не соответствует формату';

const hashTagsElement = document.querySelector('.text__hashtags');
const descriptionElement = document.querySelector('.text__description');

/**
 * Событие проверки тегов
 * @param evt - событие
 */
const onHashTagsElementInput = (evt) => {
  const tags = evt.target.value.length > 0
    ? evt.target.value.trim().split(' ').map(tag => tag.toLowerCase())
    : [];
  const tagsSet = new Set(tags);

  if (tagsSet.size !== tags.length) {
    hashTagsElement.setCustomValidity(NOT_REPEAT_TAGS)
  } else if (tags.length > 5) {
    hashTagsElement.setCustomValidity(MAX_QUANTITY_TAGS);
  } else if (tags.some(el => !HASH_TAG_RULE.test(el))) {
    hashTagsElement.setCustomValidity(NOT_FORMAT_TAGS);
  } else {
    hashTagsElement.setCustomValidity('');
  }

  hashTagsElement.reportValidity();
}

/**
 * Событие проверки комментариев
 * @param evt - событие
 */
const onDescriptionElementInput = (evt) => {
  const comment = evt.target.value;
  if (!checkCommentLength(comment, MAX_COMMENT_LENGTH)) {
    descriptionElement.setCustomValidity(MAX_LENGTH_ERROR_TEXT);
  } else {
    descriptionElement.setCustomValidity('');
  }

  descriptionElement.reportValidity();
};

/**
 * Очистка поля с тегами
 */
const clearTags = () => {
  hashTagsElement.value = '';
}

/**
 * Очистка поля с описанием
 */
const clearDescription = () => {
  descriptionElement.value = '';
}

/**
 * Проверка формы
 */
const validateForm = () => {
  descriptionElement.addEventListener('input', onDescriptionElementInput);
  hashTagsElement.addEventListener('input', onHashTagsElementInput);
}

/**
 * Отписка от слушателя проверки формы
 */
const destroyValidateForm = () => {
  descriptionElement.removeEventListener('input', onDescriptionElementInput);
  hashTagsElement.removeEventListener('input', onHashTagsElementInput);
  resetHashTagsInput();
}

/**
 * Сбросить параметры поля ввода "Хештег"
 */
const resetHashTagsInput = () => {
  hashTagsElement.setCustomValidity('');
  hashTagsElement.reportValidity();
  clearTags();
}

export {clearTags, clearDescription, validateForm, destroyValidateForm};
