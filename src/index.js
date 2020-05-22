document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/5310`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  function main() {
    fetchImages();
  }

  let imagesList = []

  function fetchImages() {
    fetch (imageURL)
      .then (response => response.json())
      .then (images => {
        imagesList.push(images)
        imagesList.forEach(renderImages)
      })
  }

  const imageCardContainer = document.querySelector('#image_card')
  const imageLink = imageCardContainer.firstElementChild
  const imageName = imageLink.nextElementSibling
  const imageLikes = document.querySelector('#likes')
  const imageCommentsContainer = document.querySelector('#comments')
  const likeButton = document.querySelector('#like_button')
  const formFields = document.querySelector('#comment_form')

  function renderImages(image) {
    imageLink.src = image.url
    imageLink.dataset.id = image.id
    imageName.innerText = image.name
    imageLikes.innerText = image.like_count
    likeButton.dataset.id = image.id
    image.comments.forEach(renderComment)
  }

  function renderComment(comment) {
    const eachComment = `<li data-image-id=${comment.image_id} data-id=${comment.id}>${comment.content} <button class="delete-button">Delete Comment</button> </li> `

    imageCommentsContainer.innerHTML += eachComment;
  }

  imageCardContainer.addEventListener('click', event => {
    if (event.target.id === 'like_button') {
      likedImage(event);
    } else if (event.target.className === 'submit') {
      submittedForm(event);
    }
    // } else if (event.target.className === 'delete-button'){
    //   deleteComment(event);
    // }
  })

  function likedImage(event) {
    const imageId = event.target.dataset.id
    const newLikesCount = parseInt(imageLikes.innerText) + 1
    imageLikes.innerText = newLikesCount

    const reqObjLikes = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({image_id: imageId})
    }

    fetch (likeURL, reqObjLikes)
  }

  function submittedForm(event) {
    event.preventDefault();
    const commentInput = event.target.previousElementSibling.value
    const formImageId = formFields.previousElementSibling.dataset.id

    imageCommentsContainer.innerHTML += `<li data-image-id=${formImageId} data-id="">${commentInput} <button class="delete-button">Delete Comment</button> </li>`

    const reqObjComments = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        image_id: formImageId,
        content: commentInput
      })
    }

    fetch (commentsURL, reqObjComments)
      .then (response => response.json())
      .then (addedComment => {
        imageCommentsContainer.lastChild.dataset.id = addedComment.id
      })

  } 

  // function deleteComment(event) {
  //   const commentId = event.target
  //   console.log(commentId)
  // }


  main();

})
