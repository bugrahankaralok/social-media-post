const postInput = document.getElementById("postInput");
const addPostBtn = document.getElementById("addPostBtn");
const postContainer = document.getElementById("postContainer");

function loadPosts(){
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.forEach(createPostElement);
}


function savePosts(posts){
    localStorage.setItem("posts",JSON.stringify(posts));
}

function createPostElement(postData){
const PostElement = document.createElement("div");
PostElement.className="post";

const postContent = document.createElement("p");
postContent.textContent = postData.content;

const actions = document.createElement("div");
actions.className ="actions";

const likes = document.createElement("span");
likes.className ="likes";
likes.textContent = `Likes : ${postData.likes}`;

const likeButton = document.createElement("button");
likeButton.textContent ="Beğen";
likeButton.addEventListener("click", ()=>{
    postData.likes += 1;
    likes.textContent =`Likes : ${postData.likes}`;
    updatePostInStorage(PostData);
});

const deleteButton = document.createElement("button");
deleteButton.textContent ="Delete";
deleteButton.addEventListener("click", ()=>{
    PostElement.remove();
    deletePostFromStorage(postData);
});

actions.appendChild(likes);
actions.appendChild(likeButton);
actions.appendChild(deleteButton);

PostElement.appendChild(postContent);
PostElement.appendChild(actions);

postContainer.appendChild(PostElement);

}

function addPostToStorage(postData){
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push(postData);
    savePosts(posts);
}

function deletePostFromStorage(postData){
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatePosts = posts.fillter(post => post.content !== postData.content);
    savePosts(updatePosts);
}

function updatePostInStorage(postData){
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatePosts = posts.ap(post =>
        post.content===postData.content ? postData : post
    );
    savePosts(updatePosts);
}


addPostBtn.addEventListener("click", ()=>{
    const content = postInput.value.trim();
    if(content==="")return;

    const newPost = {content,likes:0};
    createPostElement(newPost);
    addPostToStorage(newPost);
    postInput.value="";
});

loadPosts();