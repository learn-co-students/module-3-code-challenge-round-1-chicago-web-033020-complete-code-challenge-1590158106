document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 5319

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  function fetchImage(){
    fetch(imageURL)
    .then(results => results.json())
    .then(image => {
      renderImage(image);
    })
  }

  const imgC = document.querySelector('#image_card')
  const imageSource = document.querySelector('#image')
  const imageTitle = document.querySelector('#name')
  const imageLikes = document.querySelector('#likes')

  function renderImage(image){
    imageSource.src = image.url
    imageTitle.innerHTML = image.name
    imageLikes.innerHTML = image.like_count
    renderComments(image);
  }
  
  function renderComments(image){
    comments.innerHTML = ''
    image.comments.forEach(comment => {
      comments.innerHTML += `<li>${comment.content}</li><button id='delete-btn' data-cid=${comment.id} type='button'>Delete Above</button>`
    })
  }

  function handleLikeClick(){
    const likeButton = document.querySelector('#like_button')
    likeButton.addEventListener('click', function(event){
      addLike(event)
    })
  }
  
  function addLike(event){
    const newLikeCount = parseInt(imageLikes.innerHTML) + 1
    imageLikes.innerHTML = ''
    imageLikes.innerHTML = newLikeCount
    
    const objReq = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId
      })
    }
  
    fetch('https://randopic.herokuapp.com/likes/', objReq)
    .then(results => results.json())
  }

  function handleCommentForm(){
    const commentForm = document.querySelector('#comment_form')
    commentForm.addEventListener('submit', function(event){
      event.preventDefault()
      const formComment = event.target.comment.value
      commentForm.reset()
      addComment(formComment)
    })
  }
  
  function addComment(comment){
    const objReq = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        content: comment
      })
    }
  
    fetch(commentsURL, objReq)
    .then(results => results.json())
    .then(newComment => { fetchImage() })
  }

  fetchImage();
  handleCommentForm();
  handleLikeClick();
})
