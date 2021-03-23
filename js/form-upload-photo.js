import { isEscEvent, checkCommentLength } from './util.js';

const hashTagsUpload = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const MAX_COMMENT_LENGTH = 140;
const MAX_LENGTH_ERROR_TEXT = 'Максимальное количество 140 знаков';
const NOT_REPEAT_TEGS = 'Один и тот же хэш-тег не может быть использован дважды';
const MAX_QUANTITY_TEGS = 'Превышена масимальное количесво хэш-тегов';
const NOT_FORMAT_TEGS = 'Хэш-тег не соответствует формату';

const onValidateTag = (evt) => {
  const tags = evt.target.value.length > 0
    ? evt.target.value.trim().split(' ').map(tag => tag.toLowerCase())
    : [];
  const tagsSet = new Set(tags);
  const re = /^(#[a-z\d-]{1,20})$/;

  if (tagsSet.size !== tags.length) {
    hashTagsUpload.setCustomValidity(NOT_REPEAT_TEGS)
  } else if (tags.length > 5) {
    hashTagsUpload.setCustomValidity(MAX_QUANTITY_TEGS);
  } else if (tags.some(el => !re.test(el))) {
    hashTagsUpload.setCustomValidity(NOT_FORMAT_TEGS);
  } else {
    hashTagsUpload.setCustomValidity('');
  }

  hashTagsUpload.reportValidity();
}

const onValidateComment = (evt) => {
  const comment = evt.target.value;
  if (!checkCommentLength(comment, MAX_COMMENT_LENGTH)) {
    textDescription.setCustomValidity(MAX_LENGTH_ERROR_TEXT);
  } else {
    textDescription.setCustomValidity('');
  }

  textDescription.reportValidity();
};

export {onValidateComment, onValidateTag};
