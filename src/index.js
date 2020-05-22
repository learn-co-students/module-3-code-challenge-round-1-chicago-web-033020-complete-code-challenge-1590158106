// document.addEventListener('DOMContentLoaded', () => {
  // })
// console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
//added Defer, it's my preferred way

let imageId = 5302 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`
const imgLikes = document.querySelector('#likes')
const comments = document.querySelector('#comments')

function main(){
  getImage()
  handleLikeClick()
  handleCommentForm()
  handleDeleteClick()
}

function handleDeleteClick(){
  comments.addEventListener('click', function(event){
    if(event.target.tagName === 'BUTTON'){
      deleteComFe(event);
    }
  })
}

function deleteComFe(event){
  const comId = event.target.dataset.cid
  const toDel = document.querySelectorAll("[data-cid]")
  toDel.forEach(node => {
    if(node.dataset.cid === comId){
      node.previousElementSibling.remove()
      node.remove()
      deleteComBe(event);
    }
  })
}

function deleteComBe(event){
  const comId = event.target.dataset.cid

  const objReq = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }

  fetch(`https://randopic.herokuapp.com/comments/${comId}`, objReq)
  .then(resp => resp.json())
  .then(message => {
    console.log(message)
  })
}


function handleCommentForm(){
  const form = document.querySelector('#comment_form')
  form.addEventListener('submit', function(event){
    event.preventDefault()
    const formComment = event.target.comment.value
    form.reset()
    addComment(formComment)
  })
}

function addComment(comment){
  // const comLi = document.querySelector('#comments')
  // comLi.innerHTML += `<li>${comment}</li>`
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
  .then(resp => resp.json())
  .then(newComment => { getImage() })
}




function handleLikeClick(){
  const likeBtn = document.querySelector('#like_button')
  likeBtn.addEventListener('click', function(event){
    addLike(event)
  })
}

function addLike(event){
  const newLikeCount = parseInt(imgLikes.innerHTML) + 1
  imgLikes.innerHTML = ''
  imgLikes.innerHTML = newLikeCount
  
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
  .then(resp => resp.json())
}



function getImage(){
  fetch(imageURL)
  .then(resp => resp.json())
  .then(image => {
    renderPage(image);
  })
}


function renderPage(image){
  const imgC = document.querySelector('#image_card')
  const imgSrc = document.querySelector('#image')
  const imgTitle = document.querySelector('#name')
  imgSrc.src = image.url
  imgTitle.innerHTML = image.name
  imgLikes.innerHTML = image.like_count
  renderComments(image);
}

function renderComments(image){
  comments.innerHTML = ''
  image.comments.forEach(comment => {
    comments.innerHTML += `<li>${comment.content}</li><button id='delete-btn' data-cid=${comment.id} type='button'>Delete Above</button>`
  })
}



main();