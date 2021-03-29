/**
 * Загрузка фото на сервер
 * @param data - данные формы
 */
const postPhoto = async (data) => {
  const response = await fetch('https://22.javascript.pages.academy/kekstagram', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: data,
  });

  if (!response.ok) {
    throw new Error('Ошибка загрузки фотографии');
  }

  return await response.json();
};

export { postPhoto };
