import { photos } from '../js/data.js';
const photosArr = photos();
const container = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

const photosInfo = function() {
  photosArr.forEach((photo) => {
    const template = document.querySelector('#picture').content.cloneNode(true);
    const pictureInfo = template.querySelector('.picture__img');
    const pictureComments = template.querySelector('.picture__comments');
    const pictureLikes = template.querySelector('.picture__likes');
    const pictureNode = template.querySelector('.picture');

    pictureNode.dataset.id = photo.id;
    pictureInfo.src = photo.url;
    pictureInfo.alt = photo.description;
    pictureLikes.textContent = photo.likes;
    pictureComments.textContent = photo.comments.length;

    fragment.append(pictureNode);
  });
  container.append(fragment);
};
photosInfo();

export {photosInfo};
export {photosArr};
