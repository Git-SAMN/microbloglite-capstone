"use strict";
console.log("Start of Posts Page"); 

const logoutBtn = document.getElementById("logoutBtn");

const userCard = document.getElementById("userCard");
const createPostsBtn = document.getElementById("createPostsBtn");
const createNewPostBtn = document.getElementById("createNewPostBtn");
const createNewPostBtn2 = document.getElementById("createNewPostBtn2"); 
let loginData;

/*---------------PAGE LOADS IF USER IS LOGGED IN----------------------*/
window.onload = function () {
  loginData = getLoginData();

  console.log("Page is loading....");
createNewPostBtn.onclick = createNewPost;
loadFilteredPosts();
};

//button functionality 
function likeBtnClicked2(post, likeBtnSvg, unlikeBtnSvg) {
  console.log("likeBTN has been clicked");
  likeBtnSvg.style.display = "none";
  unlikeBtnSvg.style.display = "inline";
  console.log("clicked");
}
function unLikeBtnClicked2(post, unlikeBtnSvg, likeBtnSvg) {
  console.log("Unliked :(")
  unlikeBtnSvg.style.display = "none"
  likeBtnSvg.style.display = "inline"
}
function commentBtnClicked(commentBtnSvg) {
  console.log("commented")
 
}
function createNewPostBtnClicked(){
  console.log("I am Clicked!")
}

function createPostsBtnClicked ( ) {
  console.log("create new post button has been clicked"); 

}


/*----------------------VIEW ALL POSTS-----------------------*/
function loadFilteredPosts(){
  let authToken = getLoginData().token;
  console.log("inside of the view all posts...");
  let options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
fetch("https://microbloglite.herokuapp.com/api/posts?limit=100000", options)
  .then(response => response.json())
  .then(posts => {
    console.log(posts);
    const postContainer = document.querySelector(".postContainer");
    // Clear previous posts (optional)
    postContainer.innerHTML = "";
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("row");
    let cardsInRow = 0;
    
      posts.filter((post) => post.text.toUpperCase().includes("MATT"))
      .forEach((post) => {
        
        // Create the outermost elements
        const colDiv = document.createElement("div");
        colDiv.classList.add("container", "col-4", "mt-3");
        const postsCardDiv = document.createElement("div");
        postsCardDiv.id = "postsCard";
        postsCardDiv.classList.add("p-4", "p-md-5", "border", "rounded-3", "bg-body-tertiary", "shadow");
        // Create the heading
        const heading = document.createElement("h2");
        heading.textContent = post.username;
        // Create the paragraph
        const paragraph = document.createElement("p");
        paragraph.textContent = post.text;
        // Create the horizontal rules
        const hr1 = document.createElement("hr");
        const hr2 = document.createElement("hr");
        // Create the SVG icons
        const unlikeBtnSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        // unlikeBtnSvg.id = "unlikeBtn";
        unlikeBtnSvg.onclick = function () { unLikeBtnClicked2(post, unlikeBtnSvg, likeBtnSvg); };
        unlikeBtnSvg.type = "button";
        unlikeBtnSvg.setAttribute("width", "50");
        unlikeBtnSvg.setAttribute("height", "50");
        unlikeBtnSvg.setAttribute("fill", "currentColor");
        unlikeBtnSvg.classList.add("bi", "bi-chat-heart-fill", "btn");
        unlikeBtnSvg.setAttribute("viewBox", "0 0 16 16");
        unlikeBtnSvg.innerHTML = '<path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15Zm0-9.007c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"></path>';
        const likeBtnSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        //likeBtnSvg.id = "likeBtn";
        likeBtnSvg.onclick = function () { likeBtnClicked2(post, likeBtnSvg, unlikeBtnSvg); };
        likeBtnSvg.type = "button";
        likeBtnSvg.setAttribute("width", "50");
        likeBtnSvg.setAttribute("height", "50");
        likeBtnSvg.setAttribute("fill", "currentColor");
        likeBtnSvg.classList.add("bi", "bi-chat-heart", "btn");
        likeBtnSvg.setAttribute("viewBox", "0 0 16 16");
        likeBtnSvg.innerHTML = '<path fill-rule="evenodd" d="M2.965 12.695a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2Zm-.8 3.108.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125ZM8 5.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"></path>';
        const commentBtnSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        commentBtnSvg.setAttribute("id", "commentBtn");
        commentBtnSvg.setAttribute("type", "button");
        commentBtnSvg.setAttribute("width", "26");
        commentBtnSvg.setAttribute("height", "26");
        commentBtnSvg.setAttribute("fill", "currentColor");
      commentBtnSvg.classList.add("bi", "bi-chat-text-fill");
      commentBtnSvg.setAttribute("viewBox", "0 0 16 16");
      commentBtnSvg.innerHTML = '<path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM4.5 5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 2.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z" />';
// Add the commentBtnSvg to your desired container or append it to the document body
// Append the elements to their respective parent elements
postsCardDiv.appendChild(heading);
postsCardDiv.appendChild(hr1);
postsCardDiv.appendChild(paragraph);
postsCardDiv.appendChild(hr2);
postsCardDiv.appendChild(unlikeBtnSvg);
postsCardDiv.appendChild(likeBtnSvg);
postsCardDiv.appendChild(commentBtnSvg);
unlikeBtnSvg.style.display = "none"
colDiv.appendChild(postsCardDiv);
cardContainer.appendChild(colDiv);
cardsInRow++;
if (cardsInRow === 3) {
  postContainer.appendChild(cardContainer);
}
});
// Append any remaining cards
if (cardsInRow > 0) {
  postContainer.appendChild(cardContainer);
}
})
.catch(error => {
  console.error("Interesting....it looks like we ran into an error", error);
});
}
/*-----------------CREATE A NEW POST USING POST--------------------------------------------------------*/
function createNewPost() {

  //step 1 - figure out, what should I be posting.    This is where you would take a value from a textbox (input tag), or 
  // also maybe use the "prompt" function to get a value.


  /// ...

  //step 2, now that we know what to post, use a FETCH to tell the API about the new post.
  // step 3, in the .then().then(), respond to the result - if it was a success, great,
  // refresh all of the posts displayed on this page so that we see the new one. 
  
  //you can use your function loadFilteredPosts(); to refresh the posts.


  let authToken = loginData.token 
  let options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json" // Add the content type header
    },
    
  };
  fetch("https://microbloglite.herokuapp.com/api/posts", options)
    .then(response => {
      console.log("Creating a new post...");
      return response.json();
    })
    .then(createdPost => {
      if (createNewPostBtn) {
        // Show a pop-up box for user input
        const userInput = prompt("Ask Matt a Question! Try Starting with Hey Matt!");
        if (userInput) {
          // Process the user input
          console.log("User input:", userInput);
          let bodyData = {
            username: createdPost.username,
            text: userInput,
            createdAt: createdPost.created,
          };
  
          // Send the updated POST request with the user's input
          return fetch("https://microbloglite.herokuapp.com/api/posts", options);
        } else {
          console.log("User cancelled or provided an empty input");
        }
      }
    })
    .then(response => {
      if (response){
        console.log("New Post Added"); 
        // If the POST finishes successfully, ...
        document.getElementById("confirmationMessage").textContent = "New Post Added";
        document.getElementById("confirmationMessage").style.display = 'block';
      }
    })
    .catch(error => {
      // If the POST returns an error, ...
      let confirmationMessage = document.getElementById("confirmationMessage");
      confirmationMessage.innerHTML = "Interesting... It looks like you are unable to submit a post at the moment";
    });
}

  
  /*---------------------------------LOGS OUT USER WHEN CLICKED-------------------------------------------------------------------*/

function logoutBtnClicked () {
  let authToken = loginData.token 
  const options = {
    method: "GET",
    headers: {
         Authorization: `Bearer ${loginData.token}`,
      },
  };
   fetch("https://microbloglite.herokuapp.com/auth/logout", options)
     .then(response => response.json())
     .then(data => console.log(data))
      .finally(() => {
            window.localStorage.removeItem("login-data");  // remove login data from LocalStorage
            window.location.assign("/");  // redirect back to landing page
        });
}

