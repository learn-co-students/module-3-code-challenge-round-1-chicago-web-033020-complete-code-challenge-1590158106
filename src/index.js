  let imageId = 5304 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const imageCard = document.querySelector("#image_card")

  getImage()

  // On page load, get image and associated likes and comments
  function getImage(){
    fetch(imageURL)
    .then(resp => resp.json())
    .then(imageData => {
      renderImage(imageData)})
  }

  // Takes an argument of a specific image data, replaces HTML of imageCard with new data, adds event listeners
  function renderImage(imageData){
    imageCard.innerHTML =
    `<img src=${imageData.url} id="image" data-id=${imageData.id}/><h4 id="name">${imageData.name}</h4>
      <span>Likes: <span id="likes">${imageData.like_count} </span></span><button id="like_button">Like</button>
      <form id="comment_form"><input id="comment_input" type="text" name="comment" placeholder="Add Comment"/><input type="submit" value="Submit"/></form>
      <ul id="comments">${renderComments(imageData.comments)}</ul>`

    const likeBtn = document.querySelector("#like_button")
    const form = document.querySelector("#comment_form")
    const ul = document.querySelector("ul")

    likeBtn.addEventListener("click", incrementLikeCount)
    form.addEventListener("submit", addComment)
    ul.addEventListener("click", deleteComment)
  }

  // Helper function for renderImage. Takes array of comments and returns one string of all comments
  function renderComments(comments){
    return comments.map(comment => createComment(comment)).join("")
  }

  // Creates HTML for one comment. Used in renderComments and when new comments are created
  function createComment(comment){
    return `<li>${comment.content}</li><button id=${comment.id}>Delete</button>`
  }

  // On click of like button, increases like text by +1, then sends the like to the back-end
  function incrementLikeCount(event){
    let incrementLikes = parseInt(event.target.previousElementSibling.lastChild.innerText) + 1
    event.target.previousElementSibling.lastChild.innerText = incrementLikes

    const reqObj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({image_id: imageId})
    }

    fetch(likeURL, reqObj)
  }

  //Optimistic rendering, requested in the README. Commented out as pessimistic is better for the delete button
  // function addComment(event){
  //   event.preventDefault()

  //   const content = event.target.comment.value
    
  //   const list = document.querySelector("ul")
  //   list.innerHTML += createComment(content)

  //   const reqObj = {
  //     method: 'POST',
  //     headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //     body: JSON.stringify({
  //       image_id: imageId,
  //       content: content
  //     })
  //   }

  //   fetch(commentsURL, reqObj)
  // }

    //Pessimistic rendering, required for the delete button to work
    // On form submission, scrape data, reset form, send post request with new comment to back-end. Render new comment
    function addComment(event){
      event.preventDefault()
      
      const form = document.querySelector("#comment_form")
      form.reset()
  
      const reqObj = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
          image_id: imageId,
          content: event.target.comment.value
        })
      }
  
      fetch(commentsURL, reqObj)
      .then(resp => resp.json())
      .then(newComment => {
        const list = document.querySelector("ul")
        list.innerHTML += createComment(newComment)
      })
    }

    // On delete button click, optimistically remove li element and delete button. Send delete request to back-end
    function deleteComment(event){
      if(event.target.tagName === "BUTTON"){
        event.target.previousElementSibling.remove()
        event.target.remove()

        fetch(`${commentsURL}/${event.target.id}`, { method: 'DELETE' })
      }
    }
