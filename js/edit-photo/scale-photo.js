const DEFAULT_SCALE = 100;
const MAX_VALUE_PHOTO = 100;
const MIN_VALUE_PHOTO = 25;
const STEP = 25;

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');

/**
 * Изменить размер фотографии
 */
const changeSizePhoto = () => {
  setDefaultScale();
  scaleControlSmaller.addEventListener('click', onScaleControlSmaller);
  scaleControlBigger.addEventListener('click', onScaleControlBigger);
}

/**
 * Удаление слушателя изменения размеры формы
 */
const destroyChangeSizePhoto = () => {
  scaleControlSmaller.removeEventListener('click', onScaleControlSmaller);
  scaleControlBigger.removeEventListener('click', onScaleControlBigger);
}

/**
 * Установить размер по умолчанию
 */
const setDefaultScale = () => {
  scaleControlValue.value = getPercentage(DEFAULT_SCALE);
}

/**
 * Обработчик уменьшения размера фотографии
 */
const onScaleControlSmaller = () => {
  const scale = updateScale(percentageToNumber(scaleControlValue.value), false);

  scaleControlValue.value = getPercentage(scale);
  imgUploadPreview.style.transform = `scale(${scale / 100})`;
}

/**
 * Обработчик увеличения размера фотографии
 */
const onScaleControlBigger = () => {
  const scale = updateScale(percentageToNumber(scaleControlValue.value), true);

  scaleControlValue.value = getPercentage(scale);
  imgUploadPreview.style.transform = `scale(${scale / 100})`;
}

/**
 * Изменение размера фото
 * @param {number} currentValue - текущее значение размера
 * @param {boolean} isSum - флаг, отвечающий за сложение или вычитание шага
 */
const updateScale = (currentValue, isSum) => {
  const result = isSum
    ? currentValue + STEP
    : currentValue - STEP;

  if (result < MIN_VALUE_PHOTO || result > MAX_VALUE_PHOTO) {
    return currentValue;
  }

  return result;
}

/**
 * Очистить масштабирование
 */
const clearScale = () => {
  setDefaultScale();
  imgUploadPreview.style.transform = '';
}

/**
 * Получение процентов
 * @param {number} value - значение
 */
const getPercentage = (value) => {
  return `${value}%`;
}

/**
 * Преобразование процента в число
 * @param {string} percent - процент
 */
const percentageToNumber = (percent) => {
  return Number(percent.replace('%', ''));
}

export { changeSizePhoto, destroyChangeSizePhoto, clearScale }
