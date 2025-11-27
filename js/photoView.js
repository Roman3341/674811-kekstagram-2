import { photosArr } from './photos.js';
import { renderComments, resetComments, commentLoader } from './render-comments.js';

const pictureBig = document.querySelector('.big-picture');
const pictureBigImg = document.querySelector('.big-picture__img img');
const bodyTag = document.querySelector('body');
const pictureBigLikes = pictureBig.querySelector('.likes-count');
const pictureDesc = pictureBig.querySelector('.social__caption');
const modalCancel = pictureBig.querySelector('.big-picture__cancel');
let renderCommentsBound;

const closeModal = () => {
  pictureBig.classList.add('hidden');
  modalCancel.removeEventListener('click', onModalCancelClick);
  document.removeEventListener('keydown', onEscKeydown);
  bodyTag.classList.remove('modal-open');
  commentLoader.removeEventListener('click', renderCommentsBound);
};

function onModalCancelClick () {
  closeModal();
  resetComments();
}

function onEscKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeModal();
    resetComments();
  }
}

//Функция открывает модальное окно с развернутой миниатюрой
const photoView = function () {
  const picturesNode = document.querySelector('.pictures');
  picturesNode.addEventListener('click', (evt) => {
    resetComments();

    const pictureNode = evt.target.closest('.picture');
    if (!pictureNode){
      return;
    }
    const pictureNodeId = Number(pictureNode.dataset.id);
    const photoData = photosArr.find((item) => item.id === pictureNodeId);
    renderComments(photoData);
    renderCommentsBound = () => renderComments(photoData);
    commentLoader.addEventListener('click', renderCommentsBound);
    pictureBigImg.src = photoData.url;
    pictureBigLikes.textContent = photoData.likes;
    pictureDesc.textContent = photoData.description;

    pictureBig.classList.remove('hidden');
    bodyTag.classList.add('modal-open');

    modalCancel.addEventListener('click', onModalCancelClick);
    document.addEventListener('keydown', onEscKeydown);
  });
};

photoView();
