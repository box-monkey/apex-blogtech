
async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('#post-title').value;
  const body = document.querySelector('#post-body').value;
  console.log(title, body);

  const response = await fetch(`/api/posts`, {
    method: "post",
    body: JSON.stringify({
      title,
      body,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

const createNew = document.querySelector(".createBtn");
createNew.addEventListener("click", newFormHandler);
