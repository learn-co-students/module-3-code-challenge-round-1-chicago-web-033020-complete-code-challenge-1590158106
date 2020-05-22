document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 5301 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const container = document.querySelector(".container")
  container.addEventListener("click", handleClick)
  const form = document.querySelector("form")
  form.addEventListener("submit", addComment)
  const ul = document.querySelector("#comments")

  function fetchImg() {
    fetch(imageURL)
    .then(resp=>resp.json())
    .then(image=> {
      const img = document.getElementById("image")
      img.src = `${image.url}`
      img.dataset.id = `${image.id}`
      const title = document.getElementById("name")
      title.innerText = `${image.name}`
      const likes = document.getElementById("likes")
      likes.innerText = `${image.like_count}`
      const ul = document.getElementById("comments")
      image.comments.forEach(comment=> {
        const liComment = `<li data-id=${comment.id}>${comment.content}</li>`
        ul.innerHTML += liComment
      })
    })
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
    const likedImg = event.target.parentNode.firstElementChild.dataset.id
    likeElement.innerHTML = `<span id="likes">Likes: ${parseInt(likeNum)+1}</span>`

    const formData = {
      image_id: parseInt(likedImg)
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
    .then(like=>like)

  }

  function addComment(event) {
    event.preventDefault()
    const likedImg = event.target.parentNode.firstElementChild.dataset.id
    const comment = event.target[0].value
    ul.innerHTML += `<li>${comment}</li>`

    const formData = {
      image_id: parseInt(likedImg),
      content: comment
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

    event.target.reset()

  }



  fetchImg()
})
