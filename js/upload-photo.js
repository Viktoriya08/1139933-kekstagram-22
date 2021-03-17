import {isEscEvent} from './util.js';

const DEFAULT_SCALE = 100;

const EMPTY_EFFECT = 'none';
const CHROME_EFFECT = 'chrome';
const SEPIA_EFFECT = 'sepia';
const MARVIN_EFFECT = 'marvin';
const PHOBOS_EFFECT = 'phobos';
const HEAT_EFFECT = 'heat';

const uploadInput = document.querySelector('#upload-file');
const upLoadCancel = document.querySelector('#upload-cancel');
const selectedEffect = document.querySelector('input[name=effect]:checked').value;

/**
 * Загрузка фото
 */
const uploadPhoto = () =>{
  uploadInput.addEventListener('change', () => {
    showImgUploadOverlay();
    changeSizePhoto();
    changeEffect();

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
  if (isEscEvent(evt)) {
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
  clearUploadInput();

  destroyUploadPhoto();
};

/**
 * Удаление eventListener
 */
const destroyUploadPhoto = () => {
  const sliderElement = document.querySelector('.effect-level__slider');
  if (sliderElement.noUiSlider !== undefined) {
    sliderElement.noUiSlider.destroy();
  }

  document.removeEventListener('keydown', onUploadPhotoEscKeydown);
  upLoadCancel.removeEventListener('click', closeUploadPhoto);

  const scaleControlSmaller = document.querySelector('.scale__control--smaller');
  const scaleControlBigger = document.querySelector('.scale__control--bigger');

  scaleControlSmaller.removeEventListener('click', onScaleControlSmaller);
  scaleControlBigger.removeEventListener('click', onScaleControlBigger);
}

/**
 * Очистка поле ввода фотографии
 */
const clearUploadInput = () => {
  uploadInput.value = '';
}

/**
 * Изменить размер фотографии
 */
const changeSizePhoto = () => {
  setDefaultScale();

  const scaleControlSmaller = document.querySelector('.scale__control--smaller');
  const scaleControlBigger = document.querySelector('.scale__control--bigger');

  scaleControlSmaller.addEventListener('click', onScaleControlSmaller);
  scaleControlBigger.addEventListener('click', onScaleControlBigger);
}

/**
 * Установить размер по умолчанию
 */
const setDefaultScale = () => {
  const scaleControlValue = document.querySelector('.scale__control--value');
  scaleControlValue.value = getPercentage(DEFAULT_SCALE);
}

/**
 * Обработчик уменьшиния размера фотографии
 */
const onScaleControlSmaller = () => {
  const scaleControlValue = document.querySelector('.scale__control--value');
  const imgUploadPreview = document.querySelector('.img-upload__preview');

  const scale = updateScale(percentageToNumber(scaleControlValue.value), false);

  scaleControlValue.value = getPercentage(scale);
  imgUploadPreview.style.transform = `scale(${scale / 100})`;
}

/**
 * Обработчик увеличения размера фотографии
 */
const onScaleControlBigger = () => {
  const scaleControlValue = document.querySelector('.scale__control--value');
  const imgUploadPreview = document.querySelector('.img-upload__preview');

  const scale = updateScale(percentageToNumber(scaleControlValue.value), true);

  scaleControlValue.value = getPercentage(scale);
  imgUploadPreview.style.transform = `scale(${scale / 100})`;
}

/**
 * Изменение размера
 * @param {number} currentValue - текущее значение размера
 * @param {boolean} isSum - флаг, отвечающий за сложение или вычитание шага
 */
const updateScale = (currentValue, isSum) => {
  const maxValue = 100;
  const minValue = 25;
  const step = 25;
  const result = isSum
    ? currentValue + step
    : currentValue - step;

  if (result < minValue || result > maxValue) {
    return currentValue;
  }

  return result;
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
 * @param {string} persent - процент
 */
const percentageToNumber = (percent) => {
  return Number(percent.replace('%', ''));
}

/**
 * Зарегестрировать слайдер
 * @param {any} element - html element
 */
const registeryUiSlider = (element) => {
  const selectedEffect = document.querySelector('input[name=effect]:checked').value;

  // eslint-disable-next-line no-undef
  noUiSlider.create(element, {
    start: 100,
    ...getSliderOptionsByEffectType(selectedEffect),
  });
}

const getSliderOptionsByEffectType = (type) => {
  switch (type) {
    case CHROME_EFFECT:
      return sliderOptionForChromeEffect();
    case SEPIA_EFFECT:
      return sliderOptionForSepiaEffect();
    case MARVIN_EFFECT:
      return sliderOptionForMarvinEffect();
    case PHOBOS_EFFECT:
      return sliderOptionForPhobosEffect();
    case HEAT_EFFECT:
      return sliderOptionForHeatEffect();
    default:
      return sliderOptionDefault();
  }
}

/**
 * Параметры слайдера для эффекта CHROME
 */
const sliderOptionForChromeEffect = () => {
  return {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
  }
}

/**
 * Параметры слайдера для эффекта SEPIA
 */
const sliderOptionForSepiaEffect = () => {
  return {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
  }
}

/**
 * Параметры слайдера для эффекта MARVIN
 */
const sliderOptionForMarvinEffect = () => {
  return {
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
  }
}

/**
 * Параметры слайдера для эффекта PHOBOS
 */
const sliderOptionForPhobosEffect = () => {
  return {
    range: {
      min: 0,
      max: 3,
    },
    step: 0.1,
  }
}

/**
 * Параметры слайдера для эффекта HEAT
 */
const sliderOptionForHeatEffect = () => {
  return {
    range: {
      min: 1,
      max: 3,
    },
    step: 0.1,
  }
}

/**
 * Параметры слайдера по умолчанию
 */
const sliderOptionDefault = () => {
  return {
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
  }
}

/**
 * Изменить эффект фото
 */
const changeEffect = () => {
  const photo = document.querySelector('.img-upload__preview img');
  const radioButtons = document.querySelector('.effects__list');

  radioButtons.addEventListener('change', (event) => {
    changeEffectValue();
    clearEffectValue();
    photo.className = `effects__preview--${event.target.value}`;

    if (selectedEffect === 'none') {
      document.querySelector('.img-upload__effect-level').classList.add('hidden');
    } else {
      document.querySelector('.img-upload__effect-level').classList.remove('hidden')
    }
  });
}

/**
 *
 */
const changeEffectValue = () => {
  const sliderElement = document.querySelector('.effect-level__slider');
  if (sliderElement.noUiSlider !== undefined) {
    sliderElement.noUiSlider.destroy();
  }
  if (sliderElement.noUiSlider === undefined) {
    registeryUiSlider(sliderElement);
  }

  sliderElement.noUiSlider.on('change', (value) => {
    setEffectValueByType(value[0]);
  });
}

const clearEffectValue = () => {
  const photoElement = document.querySelector('.img-upload__preview img');
  photoElement.style = '';
}

/**
 * Устанговить эффект по типу
 * @param {string} type - тип эффекта
 * @param {number} value - величина эффекта
 */
const setEffectValueByType = (value) => {
  const selectedEffect = document.querySelector('input[name=effect]:checked').value;

  switch (selectedEffect) {
    case CHROME_EFFECT:
      setChromeEffect(value);
      break;
    case SEPIA_EFFECT:
      setSepiaEffect(value);
      break;
    case MARVIN_EFFECT:
      setMarvinEffect(value);
      break;
    case PHOBOS_EFFECT:
      setPhobosEffect(value);
      break;
    case HEAT_EFFECT:
      setHeatEffect(value);
      break;
    default:
      break;
  }
}

/**
 * Установить эффект Хром
 * @param {*} value
 */
const setChromeEffect = (value) => {
  const photoElement = document.querySelector('.img-upload__preview img');
  photoElement.style.filter = `grayscale(${value})`;
}

const setSepiaEffect = (value) => {
  const photoElement = document.querySelector('.img-upload__preview img');
  photoElement.style.filter = `sepia(${value})`;
}

const setMarvinEffect = (value) => {
  const photoElement = document.querySelector('.img-upload__preview img');
  photoElement.style.filter = `invert(${value}%)`;
}

const setPhobosEffect = (value) => {
  const photoElement = document.querySelector('.img-upload__preview img');
  photoElement.style.filter = `blur(${value}px)`;
}

const setHeatEffect = (value) => {
  const photoElement = document.querySelector('.img-upload__preview img');
  photoElement.style.filter = `brightness(${value})`;
}

export{uploadPhoto};


