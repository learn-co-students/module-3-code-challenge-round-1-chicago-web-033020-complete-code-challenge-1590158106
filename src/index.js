document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

})

// let pictureURL = "https://randopic.herokuapp.com/"

// fetch(pictureURL)
//   .then(res => res.json())
//   .then(data => console.log(data))
//above doesn't work because .json can't convert the page that's loaded. I'm not sure how to fix that currently. 
//I can convert it to text and probably can pull a number out of that with a selector and calling parseInt on the innerHTML of the right element,
//but this is time consuming and I'm not sure if it's the right way to do it.
//Moving on to the next step with manually loaded information and will come back to this later if there's time.

let pictureURL = "https://randopic.herokuapp.com/images/5312"



fetch(pictureURL)
  .then(res => res.json())
  .then(data => renderImage(data))



function renderImage(data){
  let name = document.getElementById('name')
  let likes = document.getElementById('likes')
  let comments = document.getElementById('comments')
  let commentsHTML = ''
  let image = document.getElementById('image')
  name.innerHTML = `<h3>Name: ${data.name}</h3><br>`
  likes.innerHTML = `<h3>Like Count: ${data.like_count}</h3><br>`
  data.comments.forEach(comment => {
    commentsHTML+=`<li>${comment.content}</li>`
  })
  comments.innerHTML = commentsHTML
  image.src = `${data.url}`
}

function likeImage(event){
  let totalLikes = parseInt(event.target.previousSibling.innerHTML)
  let likeElement = event.target.previousSibling
  if (event.target.id = 'like_button'){
    totalLikes += 1
    likeElement.innerHTML = `Like Count: ${totalLikes}`
    //Huh. All the practice labs had routes already set up I think. 
    //I'm not sure how to set up a localhost:3000/image/likes route or whatever. Will do my best but doubt any of this code will work.
    fetch('https://randopic.herokuapp.com/likes/', {
      method:'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({like_count : totalLikes})
      .then(result => result.json())
    })
  }
}


function addComment(event){
  let commentBox = document.getElementById('comment-input')
  let comments = document.getElementById('comments')
  if (event.target.previousSibling.id === commentBox){
  comments.innerHTML += `<li>${event.target.previousSibling.value}</li>`
  fetch('https://randopic.herokuapp.com/comments', {
    method : "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({comments : event.target.previousSibling.value})
    .then(result => result.json())
  })
  }
};

let likeButton = document.getElementById('like_button')
let submitButton = document.getElementById('submit_button')
submitButton.addEventListener('click', addComment)
likeButton.addEventListener('click', likeImage)