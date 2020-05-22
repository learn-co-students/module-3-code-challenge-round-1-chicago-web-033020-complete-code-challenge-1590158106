// document.addEventListener('DOMContentLoaded', () => {
  // console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId =  `https://randopic.herokuapp.com/images/5333`

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

// })
 

const div = document.querySelector('#image_card')
div.addEventListener("click", function(event){
  console.log(event.target)
  if(event.target.className === "like_button") {
    likes(event)
  }
})



function fetchAPI() {
  fetch(imageId)
  .then(resp => resp.json())
  .then(data => {
    console.log('DATA', data)
    renderData(data)
  })
}

function renderData(data){
  const img = `
  <img src="${data.url}" id="${data.image}" data-id="${data.id}"/>
  <h4 id="name">${data.name}</h4>
  <span>Likes:
    <span id="likes">${data.like_count}</span>
  </span>
  <button id="like_button">Like</button>
  <form id="${data.comments}">
    <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
    <input type="submit" value="Submit"/>
  </form>
  <ul id="${data.id}">
       <!-- <li> for each comment goes here -->
  </ul>
  `

  div.innerHTML = img
} 

function addLike(event) {
  const countLike = parseInt(imgLikes.innerHTML) + 1
  imgLikes.innerHTML = ''
  imgLikes.innerHTML = countLike

  const reqObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept' : 'application/json'
    },
    body: JSON.stringify( {
      image_id: imageId
    })
  }

  fetch(likeURL, reqObj)
  .then(resp => resp.json())
  // .then(Like => {
  //   render(like)
  // })
}

function comment(){
  const form = document.querySelector('#comment_form')
  form.addEventListener('submit', function(event){
    event.preventDefault()
    const form = event.target.comment.value
    form.reset()
    newComment(form)
  })
}

function newComment(info){
  const reqObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      image_id: imageId,
      content: info
    })
  }

  fetch(commentsURL, reqObj)
  .then(resp => resp.json())
  .then(comment => {
    console.log(comment)
  })
}





comment()
fetchAPI()

