import {createPhotos} from './create-photo.js';
import {showPhotos} from './show-photos.js';
const COUNT_PHOTOS = 25;
const photosData = createPhotos(COUNT_PHOTOS);
showPhotos(photosData);
