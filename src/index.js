document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 5318 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

    
  
function main(){

getImg();
buttonListener();
cmmtForm();
}



  function getImg(){ 
      return fetch(imageURL)
      .then(resp => resp.json())
      .then(result => renderImg(result))
  }


function renderImg(result){ 

  const imgCard = document.querySelector('#image_card')

  const image = document.querySelector('#image')
  image.dataset.id = result.id
  image.src = result.url

  const imgTitle = document.querySelector('h4')
  imgTitle.innerHTML = result.name

  const likes = document.getElementById('likes')
  likes.id = imageId
  likes.innerText = result.like_count

}

const likeButton = document.getElementById('like_button')

function buttonListener(){
  likeButton.addEventListener('click' , function(event){
    increaseLikes(event)
    window.alert("hi")
    })
}

function increaseLikes(event){
  const imgLikes = document.getElementById('likes')
  likes.innerText = event.like_count

  const newLikes = parseInt(imgLikes.innerHTMl) + 1
  imgLikes.innerHTML = newLikes
  window.alert(newLikes);
  const fetchObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      image_id: imageId
    })
  }

  fetch(likeURL, fetchObj)
  .then(resp => resp.json())
}


// function cmmtForm(){
//   const commentForm = document.querySelector('#comment_form')
//   commentForm.addEventListener('submit', function(event){
//     event.preventDefault()
//     const formInput = event.target.comment.value
//     commentForm.reset()
//     addComment(formInput)
//   })
// }

// function addComment(comment){
//   const fetchObj = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     },
//     body: JSON.stringify({
//       image_id: imageId,
//       content: comment
//     })
//   }

//   fetch(commentsURL, fetchObj)
//   .then(resp => resp.json())
//   .then(newComment => { getImage() })
// }
main();

});

