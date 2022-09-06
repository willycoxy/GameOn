async function upvoteClickHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split("/") [
        window.location.toString().split("/").length - 1
    ];

    const response = await fetch('/api/posts/dislike', {
        method: 'PUT',
        body: JSON.stringify({
          post_id: id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }

    console.log("button clicked");
    console.log(id);
}

document.querySelector(".dislike-btn").addEventListener("click", upvoteClickHandler);