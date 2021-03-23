const fetchPhoto = async () => {
  // запрос данных
  try {
    const response = await fetch('https://22.javascript.pages.academy/kekstagram/data');
    if (!response.ok) {
      throw new Error('Ошибка запроса');
    }

    const photos = await response.json();

    return photos.map(photo => transformResponseToPhoto(photo));
  } catch (error) {
    console.log(error);
  }

  // для имитации ошибки
  //return Promise.reject();
}

const transformResponseToPhoto = (data) => {
  return {
    id: data.id,
    url: data.url,
    description: data.description,
    likes: data.likes,
    comments: data.comments,
  };
}

export { fetchPhoto };
