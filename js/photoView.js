import { photosArr } from './photos.js';

const pictureBig = document.querySelector('.big-picture');
const pictureBigImg = document.querySelector('.big-picture__img img');
const bodyTag = document.querySelector('body');
const pictureBigLikes = pictureBig.querySelector('.likes-count');
const pictureDesc = pictureBig.querySelector('.social__caption');
const COMMENTS_PER_CLICK = 5;
let commentsStart = 0;
const comments = pictureBig.querySelector('.social__comments');
const commentTotal = pictureBig.querySelector('.social__comment-total-count');
const commentShown = pictureBig.querySelector('.social__comment-shown-count');
const commentLoader = pictureBig.querySelector('.comments-loader');
const modalCancel = pictureBig.querySelector('.big-picture__cancel');

const closeModal = () => {
  pictureBig.classList.add('hidden');
  modalCancel.removeEventListener('click', onModalCancelClick);
  document.removeEventListener('keydown', onEscKeydown);
  bodyTag.classList.remove('modal-open');
  // commentLoader.removeEventListener('click', renderComments);
};

function onModalCancelClick () {
  closeModal();
}

function onEscKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
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
    commentsStart = 0;
    const pictureNodeId = Number(pictureNode.dataset.id);
    const photoData = photosArr.find((item) => item.id === pictureNodeId);
    pictureBigImg.src = photoData.url;
    pictureBigLikes.textContent = photoData.likes;
    pictureDesc.textContent = photoData.description;

    comments.innerHTML = '';
    commentTotal.textContent = photoData.comments.length;
    const commentShowCount = photoData.comments;


    function renderComments() {
      const nextCommentsShow = commentShowCount.slice(commentsStart, commentsStart + COMMENTS_PER_CLICK);
      nextCommentsShow.forEach((comment) => {
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
      commentsStart += nextCommentsShow.length;
      commentShown.textContent = commentsStart;

      if (commentsStart >= photoData.comments.length) {
        commentLoader.classList.add('hidden');
      } else {
        commentLoader.classList.remove('hidden');
      }
    }

    renderComments();

    commentLoader.addEventListener ('click', renderComments);

    pictureBig.classList.remove('hidden');
    bodyTag.classList.add('modal-open');

    modalCancel.addEventListener('click', onModalCancelClick);
    document.addEventListener('keydown', onEscKeydown);
  });
};

photoView();
