import { checkCommentLength } from './util.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_LENGTH_ERROR_TEXT = 'Максимальное количество 140 знаков';
const NOT_REPEAT_TAGS = 'Один и тот же хэш-тег не может быть использован дважды';
const MAX_QUANTITY_TAGS = 'Превышена максимальное количество хэш-тегов';
const NOT_FORMAT_TAGS = 'Хэш-тег не соответствует формату';

const hashTagsUpload = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

/**
 * Событие проверки тегов
 * @param evt - событие
 */
const onValidateTag = (evt) => {
  const tags = evt.target.value.length > 0
    ? evt.target.value.trim().split(' ').map(tag => tag.toLowerCase())
    : [];
  const tagsSet = new Set(tags);
  const re = /^(#[a-z\d-]{1,20})$/;

  if (tagsSet.size !== tags.length) {
    hashTagsUpload.setCustomValidity(NOT_REPEAT_TAGS)
  } else if (tags.length > 5) {
    hashTagsUpload.setCustomValidity(MAX_QUANTITY_TAGS);
  } else if (tags.some(el => !re.test(el))) {
    hashTagsUpload.setCustomValidity(NOT_FORMAT_TAGS);
  } else {
    hashTagsUpload.setCustomValidity('');
  }

  hashTagsUpload.reportValidity();
}

/**
 * Событие проверки комментариев
 * @param evt - событие
 */
const onValidateComment = (evt) => {
  const comment = evt.target.value;
  if (!checkCommentLength(comment, MAX_COMMENT_LENGTH)) {
    textDescription.setCustomValidity(MAX_LENGTH_ERROR_TEXT);
  } else {
    textDescription.setCustomValidity('');
  }

  textDescription.reportValidity();
};

/**
 * Очистка поля с тегами
 */
const clearTags = () => {
  hashTagsUpload.value = '';
}

/**
 * Очистка поля с описанием
 */
const clearDescription = () => {
  textDescription.value = '';
}

/**
 * Проверка формы
 */
const validateForm = () => {
  textDescription.addEventListener('input', onValidateComment);
  hashTagsUpload.addEventListener('input', onValidateTag);
}

/**
 * Отписка от слушателя проверки формы
 */
const destroyValidateForm = () => {
  textDescription.removeEventListener('input', onValidateComment);
  hashTagsUpload.removeEventListener('input', onValidateTag);
}

export {clearTags, clearDescription, validateForm, destroyValidateForm};
