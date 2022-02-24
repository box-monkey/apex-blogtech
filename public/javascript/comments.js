async function commentFormHandler(event) {
  event.preventDefault();

  const comment_text = document
    .querySelector('textarea[name="comment-body"]')
    .value.trim();
  const postId = document.querySelector('input[name="post-id').value.trim();

  console.log(postId);
  console.log(comment_text);

  if (comment_text) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        postId,
        comment_text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

const editPost = document.querySelector(".comment-btn");

editPost.addEventListener("click", commentFormHandler);
