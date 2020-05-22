document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 5313 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


  const imgNode = document.querySelector('#image')
  const imgName = document.querySelector('#name')
  const imgLikes = document.querySelector('#likes')
  const imgComments = document.querySelector('#comments')
  const likeBtn = document.querySelector('#like_button')
  const formNode = document.querySelector('#comment_form')



fetch(imageURL)
.then(resp => resp.json())
.then(imageData => renderImage(imageData))

function renderImage(imageData) {
  console.log(imageData)
  imgNode.src= `${imageData.url}`
  imgName.innerText = `${imageData.name}`
  imgLikes.innerText = `${imageData.like_count}`
  imgComments.innerHTML = renderComments(imageData)
}

function renderComments(imageData) {
  let commentArray = []
  imageData.comments.forEach(comment => {
    commentArray.push(`<li>${comment.content}</li>`)
  })
  console.log(commentArray)
  return commentArray.join('')
}

//event listener for like button 
likeBtn.addEventListener('click', function(event) {
  let likeNode =event.target.previousElementSibling.firstElementChild
  let likeNum = parseInt(likeNode.innerText, 10) + 1
  likeNode.innerText = likeNum 

//fetch with post method to increase likes

const reqObj = {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({image_id: imageId, like_count: likeNum})
}

fetch(likeURL, reqObj)
.then(resp => resp.json())
.then(upObj => {
  console.log(upObj)
})

})

//add comments
//form in DOM
//form listener with first arg being submit
//event.preventDefault()
//scrape comment
//put comment in ul with id of comments
//save comment to database

//  WORKING CODE FOR COMMENTS 

// formNode.addEventListener('submit', function(event) {
//   event.preventDefault()
//   let comment = event.target[0].value
//   imgComments.innerHTML += `<li>${comment}</li>`

// const reqObj = {
//   method: 'POST',
//   headers: {
//     "Content-Type": "application/json",
//     "Accept": "application/json"
//   },
//   body: JSON.stringify({image_id: imageId, content: comment})
// }

// fetch(commentsURL, reqObj)
// .then(resp => resp.json())
// .then(updObj => {
//   console.log(updObj)
// })

// event.target.reset()

// })


//  ATTEMPTING BONUS 

formNode.addEventListener('submit', function(event) {
  event.preventDefault()
  let comment = event.target[0].value

const reqObj = {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({image_id: imageId, content: comment})
}

fetch(commentsURL, reqObj)
.then(resp => resp.json())
.then(updObj => {
  let commentId = updObj.id
  let comment = updObj.content
  imgComments.innerHTML += `<div><li>${comment}</li> <button class="delete" data-comment-id=${commentId}>Delete</button></div>`
})

event.target.reset()

})

imgComments.addEventListener('click', function(event) {

  if(event.target.className === 'delete') {
    let commentId = event.target.dataset.commentId

    reqObj = {
      method: 'DELETE', 
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    }

    fetch(`https://randopic.herokuapp.com/comments/${commentId}`)
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      if (data.message === 'Comment Successfully Destroyed') {
        event.target.parentNode.innerHTML = ''
      }
    })
  }
})

})