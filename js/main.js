import { showFilteredPhotos, showPhotosFilter } from './show-photos.js';
import { uploadPhoto } from './upload-photo.js';
import { fetchPhoto } from './fetch-photo.js';
import { errorHandlerModal } from './notification/error-handler.js';

fetchPhoto()
  .then(photos => {
    showFilteredPhotos(photos);
    uploadPhoto();
    showPhotosFilter();
  })
  .catch(() => {
    errorHandlerModal();
  })
