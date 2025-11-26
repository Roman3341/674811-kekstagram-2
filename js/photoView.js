import { photosArr } from './photos.js';

const pictureBig = document.querySelector('.big-picture');
const pictureBigImg = document.querySelector('.big-picture__img img');
const bodyTag = document.querySelector('body');
const pictureBigLikes = pictureBig.querySelector('.likes-count');
const comments = pictureBig.querySelector('.social__comments');
const commentTotal = pictureBig.querySelector('.social__comment-total-count');
const commentShown = pictureBig.querySelector('.social__comment-shown-count');
const commentCount = pictureBig.querySelector('.social__comment-count');
const commentLoader = pictureBig.querySelector('.comments-loader');
const modalCancel = pictureBig.querySelector('.big-picture__cancel');

const closeModal = () => {
  pictureBig.classList.add('hidden');
  modalCancel.removeEventListener('click', onModalCancelClick);
  document.removeEventListener('keydown', onEscKeydown);
  bodyTag.classList.remove('modal-open');
};

function onModalCancelClick () {
  closeModal();
}

function onEscKeydown (evt) {
  if (evt.key === 'Escape') {
    closeModal();
  }
}

//Функция открывает модальное окно с развернутой миниатюрой
const photoView = function () {
  const picturesNode = document.querySelector('.pictures');
  picturesNode.addEventListener('click', (evt) => {
    const pictureNode = evt.target.closest('.picture');
    if (!pictureNode){
      return;
    }
    const pictureNodeId = Number(pictureNode.dataset.id);
    const photoData = photosArr.find((item) => item.id === pictureNodeId);

    pictureBigImg.src = photoData.url;
    pictureBigLikes.textContent = photoData.likes;

    comments.innerHTML = '';
    commentTotal.textContent = photoData.comments.length;
    const commentShowCount = photoData.comments;
    commentShown.textContent = photoData.length;
    commentCount.classList.add('hidden');
    commentLoader.classList.add('hidden');

    commentShowCount.forEach((comment) => {
      const li = document.createElement('li');
      li.classList.add('social__comment');

      const img = document.createElement('img');
      img.classList.add('social__picture');
      img.src = comment.avatar;
      img.alt = comment.name;
      img.width = 35;
      img.height = 35;

      const p = document.createElement('p');
      p.classList.add('social__text');
      p.textContent = comment.message;

      li.append(img, p);
      comments.append(li);
    });

    pictureBig.classList.remove('hidden');
    bodyTag.classList.add('modal-open');

    modalCancel.addEventListener('click', onModalCancelClick);
    document.addEventListener('keydown', onEscKeydown);
  });
};

photoView();
