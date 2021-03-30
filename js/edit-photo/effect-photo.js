const DEFAULT_START_VALUE_SLIDER = 100;

const EMPTY_EFFECT = 'none';
const CHROME_EFFECT = 'chrome';
const SEPIA_EFFECT = 'sepia';
const MARVIN_EFFECT = 'marvin';
const PHOBOS_EFFECT = 'phobos';
const HEAT_EFFECT = 'heat';

/**
 * Параметры слайдера для эффекта CHROME
 */
const SLIDER_OPTION_FOR_CHROME_EFFECT = {
  range: {
    min: 0,
    max: 1,
  },
  step: 0.1,
};

/**
 * Параметры слайдера для эффекта SEPIA
 */
const SLIDER_OPTION_FOR_SEPIA_EFFECT = {
  range: {
    min: 0,
    max: 1,
  },
  step: 0.1,
};

/**
 * Параметры слайдера для эффекта MARVIN
 */
const SLIDER_OPTION_FOR_MARVIN_EFFECT = {
  range: {
    min: 0,
    max: 100,
  },
  step: 1,
};

/**
 * Параметры слайдера для эффекта PHOBOS
 */
const SLIDER_OPTION_FOR_PHOBOS_EFFECT = {
  range: {
    min: 0,
    max: 3,
  },
  step: 0.1,
};

/**
 * Параметры слайдера для эффекта HEAT
 */
const SLIDER_OPTION_FOR_HEAT_EFFECT = {
  range: {
    min: 1,
    max: 3,
  },
  step: 0.1,
};

/**
 * Параметры слайдера по умолчанию
 */
const SLIDER_OPTION_DEFAULT = {
  range: {
    min: 0,
    max: 100,
  },
  step: 1,
};

const photoElement = document.querySelector('.img-upload__preview img');
const radioButtonsGroup = document.querySelector('.effects__list');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelBack = document.querySelector('.img-upload__effect-level');

/**
 * Изменить эффект фото
 */
const changeEffect = () => {
  radioButtonsGroup.addEventListener('change', onRadioButtonsGroupChange);
}

/**
 * Удаление слушателя изменения эффекта
 */
const destroyChangeEffect = () => {
  radioButtonsGroup.removeEventListener('change', onRadioButtonsGroupChange);
}

/**
 * Событие изменения эффекта
 * @param evt - событие
 */
const onRadioButtonsGroupChange = (evt) => {
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
    effectLevelBack.classList.add('hidden');
  } else {
    effectLevelBack.classList.remove('hidden')
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
  photoElement.style.filter = '';
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
    start: DEFAULT_START_VALUE_SLIDER,
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
      return SLIDER_OPTION_FOR_CHROME_EFFECT;
    case SEPIA_EFFECT:
      return SLIDER_OPTION_FOR_SEPIA_EFFECT;
    case MARVIN_EFFECT:
      return SLIDER_OPTION_FOR_MARVIN_EFFECT;
    case PHOBOS_EFFECT:
      return SLIDER_OPTION_FOR_PHOBOS_EFFECT;
    case HEAT_EFFECT:
      return SLIDER_OPTION_FOR_HEAT_EFFECT;
    default:
      return SLIDER_OPTION_DEFAULT;
  }
}

export { changeEffect, clearEffectValue, destroyChangeEffect, destroyUISlider, clearEffect, toggleEffectLevelBackBySelectedEffect }
