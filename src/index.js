document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 5307 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/5310`

  const likeURL = `https://randopic.herokuapp.com/likes`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const imgCard = document.getElementById("image_card")
  const likeBtn = document.getElementById("like_button")
  const form = document.getElementById("comment_form")
  const ul = document.getElementById('comments')
  allComments = []
  
  debugger
  fetch(imageURL)
  .then(resp => resp.json())
  .then(image => renderImage(image));


  likeBtn.addEventListener("click", handleLike)
  form.addEventListener("submit", handleSubmit)
  ul.addEventListener("click", handleDelete)


  function renderImage(image){
    
    let img = imgCard.querySelector('#image')
    img.src = image.url 
    img.dataId = image.id
    let name = imgCard.querySelector('#name')
    name.innerText = image.name
    let likeCnt = imgCard.querySelector('#likes')
    likeCnt.innerHTML = image.like_count
    allComments = image.comments
    renderComment()
  }

  function handleLike(event){
    
    let likeCnt = imgCard.querySelector('#likes')
    let count = parseInt(likeCnt.innerText) + 1

    const formData = {
      image_id: imageId,
    }
  
    const reqObj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }
    fetch(likeURL, reqObj)
    .then(resp => resp.json())
    .then(like => updateCount(count))
  
  }

  function updateCount(count){
    let likeCnt = imgCard.querySelector('#likes')
    likeCnt.innerText = `${count}`
  }

  function handleSubmit(event){
    event.preventDefault();
    const formData = {
      image_id: imageId,
      content: event.target[0].value
    }
    event.target.reset();
  
    const reqObj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }
    fetch(commentsURL, reqObj)
    .then(resp => resp.json())
    .then(comment => {
      allComments.push(comment)
      renderComment()
    })
  }

  function renderComment(){
    
    let li = ""
    allComments.forEach(comment => {
      li += `<li> ${comment.content} <button class="del" data-id=${comment.id}>delete</button></li>`
    })
    ul.innerHTML = li

  }

  function handleDelete(){
    console.log(event.target.dataset.id)
    const reqObj = {
      method: 'DELETE'
    }
  fetch(commentsURL+`/${event.target.dataset.id}`, reqObj)
  .then(resp => resp.json())
  .then(result => console.log(result))
  }

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
