const pictureBig = document.querySelector('.big-picture');
const comments = pictureBig.querySelector('.social__comments');
const commentTotal = pictureBig.querySelector('.social__comment-total-count');
const commentLoader = pictureBig.querySelector('.comments-loader');
const commentShown = pictureBig.querySelector('.social__comment-shown-count');
const COMMENTS_PER_CLICK = 5;
let commentsStart = 0;

const resetComments = () => {
  commentsStart = 0;
  comments.innerHTML = '';
};

function renderComments (photoData) {

  const commentShowCount = photoData.comments;
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
  // commentLoader.addEventListener('click', renderComments);
  commentsStart += nextCommentsShow.length;
  commentShown.textContent = commentsStart;
  commentTotal.textContent = photoData.comments.length;

  if (commentsStart >= photoData.comments.length) {
    commentLoader.classList.add('hidden');
  } else {
    commentLoader.classList.remove('hidden');
  }
}

export {renderComments, resetComments, commentLoader};
