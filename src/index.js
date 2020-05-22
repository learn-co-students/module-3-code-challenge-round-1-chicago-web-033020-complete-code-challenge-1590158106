let imageId = 5308 //Enter the id from the fetched image here

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

const likeURL = `https://randopic.herokuapp.com/likes/`

const commentsURL = `https://randopic.herokuapp.com/comments/`

const imageCard = document.querySelector(`#image_card`)


const likeButton = imageCard.querySelector(`#like_button`)


function getImageURL() {
  return fetch(imageURL)    
    .then(resp => resp.json())
    .then(image => renderImage(image))
  }
function renderImage(image) {
  imageCard.innerHTML = 
  `
    <img src="${image.url}" id="image" data-id="${image.id}"/>
    <h4 id="name">${image.name}</h4>
    <span>Likes:
      <span id="likes">${image.like_count}</span>
    </span>
    <button id="like_button">Like</button>
    <form id="comment_form">
      <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
      <input type="submit" value="Submit"/>
    </form>
    <ul id="comments">
        ${image.comments[0].content}
        <!-- <li> for each comment goes here -->
    </ul>`

}

function addLikes(event){
  imageCard.addEventListener('click', function(event){
    if(event.target.id === "like_button")
      increaseLikes(event)
  })
}

function increaseLikes(){
  const likes = imageCard.querySelecter("#likes")
  console.log(likes)
}


document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 5308 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  
  const likeURL = `https://randopic.herokuapp.com/likes/`
  
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  
  const imageCard = document.querySelector(`#image_card`)
  getImageURL()
  addLikes()
})
