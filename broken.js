document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 5301 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const container = document.querySelector(".container")
  container.addEventListener("click", handleClick)
  const form = document.getElementById("comment_form")
  form.addEventListener("submit", addComment)
  const ul = document.getElementById("comments")

  function fetchImg() {
    fetch(imageURL)
    .then(resp=>resp.json())
    .then(image=> {
      const imageCard = `<div id="image_card" class="card col-md-4" data-id:"${image.id}">
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
        <ul id="comments"> ${image.comments.map(comment=> `<li data-id=${comment.id}> ${comment.content} </li>`).join("")} </ul>`
      container.innerHTML = imageCard
      })
    .catch(err => alert(err.message))
  }

  function handleClick(event) {
    if (event.target.id === "like_button") {
      addLike(event)
    }
  }


  function addLike(event) {
    event.preventDefault()
    const likeElement = event.target.previousElementSibling
    const likeNum = likeElement.innerText.split(" ")[1]
    const likedImg = event.target.parentNode.dataset.id
    console.log(event.target.parentNode)
    likeElement.innerHTML = `<span id="likes">Likes: ${parseInt(likeNum)+1}</span>`

    const formData = {
      image_id: likedImg 
    }

    const formObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    }

    fetch(likeURL, formObj)
    .then(resp=>resp.json())
    .then(like=>console.log(like))

  }

  function addComment(event){
    event.preventDefault()
    console.log(event.target)
    const imgId = event.target.parentNode.dataset.id
    const commentContent = event.target[0].value

    const formData = {
      image_id: imgId
      content: commentContent
    }

    const formObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    }

    fetch(commentsURL, formObj)
    .then(resp=> resp.json())
    .then(comment=>comment)

  }



  fetchImg()
})



    // const formData = {
    //   image_id:
    //   content:
    // }

    // const formObj = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Accept": "application/json"
    //   },
    //   body: JSON.stringify(formData)
    // }

    // fetch(commentsURL, formObj)
    // .then(resp=> resp.json())
    // .then(comment=>comment)
