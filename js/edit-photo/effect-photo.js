const EMPTY_EFFECT = 'none';
const CHROME_EFFECT = 'chrome';
const SEPIA_EFFECT = 'sepia';
const MARVIN_EFFECT = 'marvin';
const PHOBOS_EFFECT = 'phobos';
const HEAT_EFFECT = 'heat';

const photoElement = document.querySelector('.img-upload__preview img');
const radioButtons = document.querySelector('.effects__list');
const sliderElement = document.querySelector('.effect-level__slider');

/**
 * Изменить эффект фото
 */
const changeEffect = () => {
  radioButtons.addEventListener('change', onChangeEffect);
}

/**
 * Удаление слушателя изменения эффекта
 */
const destroyChangeEffect = () => {
  radioButtons.removeEventListener('change', onChangeEffect);
}

/**
 * Событие изменения эффекта
 * @param evt - событие
 */
const onChangeEffect = (evt) => {
  changeEffectValue();
  clearEffectValue();
  photoElement.className = `effects__preview--${evt.target.value}`;
  toggleEffectLevelBackBySelectedEffect();
};

/**
 * Скрыть подложку регулятора уровня эффекта
 */
const toggleEffectLevelBackBySelectedEffect = () => {
  const selectedEffect = document.querySelector('input[name=effect]:checked').value;

  if (selectedEffect === EMPTY_EFFECT) {
    document.querySelector('.img-upload__effect-level').classList.add('hidden');
  } else {
    document.querySelector('.img-upload__effect-level').classList.remove('hidden')
  }
}

/**
 * Изменить значение эффекта
 */
const changeEffectValue = () => {
  destroyUISlider();

  if (sliderElement.noUiSlider === undefined) {
    registryUiSlider(sliderElement);
  }

  sliderElement.noUiSlider.on('change', (value) => {
    setEffectValueByType(value[0]);
  });
}

/**
 * Очистить значение эффекта
 */
const clearEffectValue = () => {
  const photoElement = document.querySelector('.img-upload__preview img');
  photoElement.style = '';
}

/**
 * Очистить эффект
 */
const clearEffect = () => {
  document.querySelector(`input[name=effect][value=${EMPTY_EFFECT}]`).checked = true;
  photoElement.className = '';
}

/**
 * Установить эффект по типу
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

const setChromeEffect = (value) => {
  photoElement.style.filter = `grayscale(${value})`;
}

const setSepiaEffect = (value) => {
  photoElement.style.filter = `sepia(${value})`;
}

const setMarvinEffect = (value) => {
  photoElement.style.filter = `invert(${value}%)`;
}

const setPhobosEffect = (value) => {
  photoElement.style.filter = `blur(${value}px)`;
}

const setHeatEffect = (value) => {
  const photoElement = document.querySelector('.img-upload__preview img');
  photoElement.style.filter = `brightness(${value})`;
}


/**
 * Зарегистрировать слайдер
 * @param {any} element - html element
 */
const registryUiSlider = (element) => {
  const selectedEffect = document.querySelector('input[name=effect]:checked').value;

  // eslint-disable-next-line no-undef
  noUiSlider.create(element, {
    start: 100,
    ...getSliderOptionsByEffectType(selectedEffect),
  });
}

/**
 * Удаление слайдера
 */
const destroyUISlider = () => {
  if (sliderElement.noUiSlider !== undefined) {
    sliderElement.noUiSlider.destroy();
  }
}

/**
 * Получить параметры слайдера
 * @param type
 */
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


export { changeEffect, clearEffectValue, radioButtons, destroyChangeEffect, destroyUISlider, clearEffect, toggleEffectLevelBackBySelectedEffect }
