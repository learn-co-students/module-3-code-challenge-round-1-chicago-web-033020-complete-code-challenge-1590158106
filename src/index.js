document.addEventListener('DOMContentLoaded', () => {
  let imageId = 5306
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const image = document.getElementById('image')
  const name = document.getElementById('name')
  const likes = document.getElementById('likes')

  const commentSection = document.getElementById('comments')
  const commentForm = document.getElementById('comment_form')
  const submitButton = document.querySelector("input[type='submit']")

  fetch(imageURL)
  .then(resp => resp.json())
  .then(json => {
    name.innerHTML = json.name
    image.src = json.url
    likes.innerHTML = json.like_count
  })

  document.addEventListener("click", e => {
    e.preventDefault()

    if (e.target.id === "like_button") {
      likes.innerHTML = parseInt(likes.innerHTML) + 1

      const obj = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({image_id: imageId})
      }

      fetch(likeURL, obj)
    }

    else if (e.target.className === 'delete-btn') {
      const myComment = e.target.parentNode
      const myCommentId = myComment["value"]

      const obj = {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      }

      fetch(`${commentsURL}/${myCommentId}`, obj)
      .then(resp => resp.json())
      .then(resp => myComment.remove())
    }

  })

  submitButton.addEventListener("click", e => {
    e.preventDefault()
    const myComment = commentForm.querySelector("input[name='comment']")

    const obj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_id: imageId,
        content: myComment.value
      })
    }

    fetch(commentsURL, obj)
    .then(resp => resp.json())
    .then(comment =>
      commentSection.innerHTML += `<li value=${comment.id}>${myComment.value}<button class='delete-btn'>Delete</button></li>`
    )
  })

})