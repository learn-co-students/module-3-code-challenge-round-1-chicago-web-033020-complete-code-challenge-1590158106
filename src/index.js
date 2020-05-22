document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  const main = () => {
    fetchImg()
    likeImg()
    postComment()
    deleteComment()
  }

  let imageId = 5305 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const renderImgData = (image) => {
    let img = document.getElementById('image')  
    img.dataset.id = image['id']
    img.src = image['url']

    let imgName = document.getElementById('name')
    imgName.innerText = image['name']

    let likeCount = document.getElementById('likes')
    likeCount.innerText = image['like_count']

    let commentList = document.getElementById('comments')

    let imgComments = image['comments']

    for (const comment of imgComments) {
      let commentLi = document.createElement('li')
      commentLi.innerText = comment['content']

      let deleteCommentBtn = document.createElement('button')
      deleteCommentBtn.dataset.id = comment['id']
      deleteCommentBtn.className = 'delete-comment-btn'
      deleteCommentBtn.innerText = 'Delete Comment'

      commentLi.appendChild(deleteCommentBtn)
      commentList.appendChild(commentLi)
    }
  }

  const renderImgComment = (event) => {
    let comments = document.getElementById('comments')
    let commentContent = event.target[0].value
    let commentLi = document.createElement('li')
    commentLi.innerText = commentContent
    comments.appendChild(commentLi)
  }

  const fetchImg = () => {
    fetch(imageURL)
      .then(response => {
        return response.json()
      })
      .then(image => {
        renderImgData(image)
      })
  }

  const likeImg = () => {
    let likeBtn = document.getElementById('like_button')

    likeBtn.addEventListener('click', (event) => {
      let likeCount = document.getElementById('likes')

      const formData = {
        image_id: imageId
      }

      const configObj = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json'
        },
        body: JSON.stringify(formData)
      }

      fetch(likeURL, configObj)
        .then(response => {
          return response.json()
        })
        .then(like => {
          console.log(like)
          let likeNum = parseInt(likeCount.innerText)
          likeCount.innerText = `${likeNum + 1}`
        })
    })
  }

  const postComment = () => {
    let commentForm = document.getElementById('comment_form')

    commentForm.addEventListener('submit', (event) => {
      event.preventDefault()

      const formData = {
        image_id: imageId,
        content: event.target[0].value
      }

      const configObj = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json'
        },
        body: JSON.stringify(formData)
      }

      fetch(commentsURL, configObj)
        .then(response => {
          return response.json()
        })
        .then(comment => {
          renderImgComment(event)
        })

      // commentForm.reset()    
    })
  }

  const deleteComment = () => {

    let commentList = document.getElementById('comments')

    commentList.addEventListener('click', (event) => {
      if (event.target.className === 'delete-comment-btn') {
        let deleteBtn = event.target
        let commentId = deleteBtn.dataset.id

        const deleteCommentURL = `https://randopic.herokuapp.com/comments/${commentId}`

        const formData = {
          message: 'Comment Successfully Destroyed'
        }

        const configObj = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json'
          },
          body: JSON.stringify(formData)
        }

        fetch(deleteCommentURL, configObj)
          .then(response => {
            return response.json()
          })
          .then(comment => {
            console.log(comment)
            deleteBtn.parentElement.remove()
          })
      }
    })
  }

  main()

})
