document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 5303 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  function fetchImage() {
    fetch(imageURL)
    .then(resp => resp.json())
    .then(image => renderImageDisplay(image))
  }

  function fetchLikes() {
    fetch(imageURL)
    .then(resp => resp.json())
    .then(likes => renderLikesDisplay(likes))
  }

  function fetchComments() {
    fetch(imageURL)
    .then(resp => resp.json())
    .then(image => image.comments.forEach(renderCommentsDisplay))
  }

  const imageContainer = document.querySelector('#image')
  const imageTitle = document.querySelector('#name')

  function renderImageDisplay(image) {
    imageContainer.className = 'image-id'
    imageContainer.src = `${image.url}`
    imageTitle.innerHTML = `${image.name}`
  }

  const likesContainer = document.querySelector('#likes')

  function renderLikesDisplay(image) {
    likesContainer.innerHTML =
    `${image.like_count}`
  }

  const commentsContainer = document.querySelector('#comments')

  function renderCommentsDisplay(comment) {
    commentsContainer.innerHTML +=
    `<li>${comment.content}</li>`
  }

  const imageCard = document.querySelector('#image_card')

  function addLikes() {
    imageCard.addEventListener('click', function(event) {
      if(event.target.id === 'like_button') {
        increaseLikes(event)
      }
    })
  }

  function increaseLikes(event) {
    const likes = document.getElementById('likes')
    console.log(likes.innerHTML)
    const newLikes = parseInt(likes.innerHTML) + 1
    // const imageId = event.target.dataset['imageId']
    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ image_id: imageId })
    }
    fetch(`${likeURL}`, reqObj)
    .then(resp => resp.json())
    .then(image => {
      console.log(image)
      likes.innerHTML = `${newLikes}`})
  }

  const newComment = document.querySelector('#comment_form')

  function handleCommentCreate(event) {
    newComment.addEventListener('submit', function() {
      event.preventDefault()
      const formData = {
        image_id: imageId,
        content: event.target[0].value
      }
      const reqObj = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(formData)
      }
      fetch(commentsURL, reqObj)
      .then(resp => resp.json())
      .then(comment => renderImageDisplay(comment))
    })
  }

  fetchImage()
  fetchLikes()
  fetchComments()
  addLikes()
  handleCommentCreate()

})
