document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
})

let imageId = 5311 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`

function main() {
  getImage();
  handleLikeClick();
  handleComment();

}

function getImage() {
  fetch(imageURL)
  .then(resp => resp.json())
  .then(image => renderImage(image))
}

function renderImage(image) {
  const imageContainer = document.querySelector('img');
  const imageName = document.querySelector('#name');
  const imageLikes = document.querySelector('#likes');

  imageContainer.src = image.url;
  imageName.innerHTML = image.name;
  imageLikes.innerHTML = image.like_count;
}

const imageCard = document.querySelector('#image_card')
function handleLikeClick(){
  imageCard.addEventListener('click', function(event){
    if(event.target.tagName === 'BUTTON') {
      handleLikePost(event);
    }
  })
}

function handleLikePost(event){
  const likeCountNode = document.querySelector('#likes')
  const newLikeCount = parseInt(likeCountNode.innerHTML) + 1
  likeCountNode.innerHTML = newLikeCount

  const reqObj = {
    method: 'POST',
    headers: {'Content-Type': 'application/json', Accept: 'application/json'},
    body: JSON.stringify({ image_id: imageId})
  }

  fetch(likeURL, reqObj)
  .then(resp => resp.json())
}

function handleComment() {
  const commentContainer = document.querySelector('#comments')
  const commentForm = document.querySelector('#comment_form')

  commentForm.addEventListener('submit', function(event){
    event.preventDefault();

    const commentInputField = document.querySelector('#comment_input')
    const commentInputString = commentInputField.value
    const commentListItem = document.createElement('li')

    commentListItem.textContent = commentInputString;
    commentContainer.appendChild(commentListItem);

    // LINES 73 - 83 I didn't get to check before I submitted since the database croaked..but wanted to at least try and complete the comments portion!

    const object = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Accept: 'application/json'},
      body: JSON.stringify({ 
        image_id: imageId,
        content: commentInputString
      })
    }

    fetch(commentsUrl, object)
    .then(resp => resp.json())


    commentForm.reset();
  })
}

main()



