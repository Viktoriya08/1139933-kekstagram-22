import { showPhotos } from './show-photos.js';
import { uploadPhoto } from './upload-photo.js';
import { fetchPhoto } from './fetch-photo.js';
import { errorHandlerModal } from './notification/error-handler.js';

fetchPhoto()
  .then(photos => {
    showPhotos(photos);
    uploadPhoto();
  })
  .catch(() => {
    errorHandlerModal();
  })
