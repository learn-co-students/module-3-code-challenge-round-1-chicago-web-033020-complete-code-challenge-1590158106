document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 5314

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


})

let imageId = 5314

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

const imageCard = document.getElementById("image_card")


const getImage = () => {
  
  fetch(imageURL)
  .then(resp => resp.json())
  .then(image => {
    const imageNode = document.getElementById("image")
    imageNode.src = image.url
    const imageTitle = document.getElementById("name")
    imageTitle.innerHTML = image.name
    const imageLikes = document.getElementById("likes")
    imageLikes.innerHTML = image.like_count
    })
 }

 const addLike = () => {
  const likeBtn = document.getElementById("like_button")
  imageCard.addEventListener("click", (event) => {
    if(event.target === likeBtn){
      let currentLikes = document.getElementById("likes")
      currentLikes.innerHTML = `${parseInt(currentLikes) + 1}`
      
    }
    // const reqObj = {
    //   method: "POST",
    //   headers:{

    //   },
    //   body:

    // }


  })
 }

 const newComment = () => {
  const commentField = document.getElementById("comment_input")
  commentField.addEventListener("submit", (event) => {
    event.target.preventDefault()
    const commentArea = document.getElementById("comments")
    const newComment = `<li> ${event.target[0].value} </li>`
    event.target.reset
    commentArea.innerHTML + newComment

    const reqObj = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: ,
        content: 
        })
      
    }

    fetch()


  })

 }



getImage()
addLike()
newComment()



// <div id="image_card" class="card col-md-4">
// <img src="" id="image" data-id=""/>
// <h4 id="name">Title of image goes here</h4>
// <span>Likes:
//   <span id="likes">Likes Go Here</span>
// </span>
// <button id="like_button">Like</button>
// <form id="comment_form">
//   <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
//   <input type="submit" value="Submit"/>
// </form>
// <ul id="comments">
//      <!-- <li> for each comment goes here -->
// </ul>
// </div>