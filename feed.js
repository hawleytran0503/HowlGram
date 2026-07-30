// Icon hearts
const likeButtons = document.querySelectorAll(".post-like");

likeButtons.forEach(function(button){
    const post = button.closest(".post");
    const id = post.dataset.id;
    const key = `liked_post_${id}`;

    const liked = localStorage.getItem(key);
    

    if(liked){
        button.textContent = "❤️";
    }
    else{
        button.textContent = "🤍";
    }

    button.addEventListener("click", function(){
        const likeText = post.querySelector(".post-likes");
        let likes = parseInt(likeText.textContent);

        const isLiked = localStorage.getItem(key);
        if (isLiked){
            button.textContent = "🤍";
            likes--;
            localStorage.removeItem(key);
        }
        else{
            button.textContent = "❤️";
            likes++;
            localStorage.setItem(key, "true");
        }

        likeText.textContent = `${likes} likes`;
    });
    
});

// function for post comments
function addComment(post){
    const commentInput = post.querySelector(".comment-input");
    let text = commentInput.value.trim();

    if(text === "") return;

    const id = post.dataset.id;
    const key = `comments_post_${id}`;
    
    const commentsData = JSON.parse(localStorage.getItem(key)) || []; // xóa bộc string đi
    commentsData.push(text);

    localStorage.setItem(key, JSON.stringify(commentsData)); // bộc lại bằng string

    renderComment(post, text);
    commentInput.value = "";

}

// render Comment on the html
function renderComment(post, text){
    const commentsContainer = post.querySelector(".comments");
    const comment = document.createElement("div");
    comment.className = "comment";

    const p = document.createElement("p");
    p.textContent = text;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "🗑️";

    deleteButton.addEventListener("click", function(){

        const id = post.dataset.id;
        const key = `comments_post_${id}`;

        const commentsData = JSON.parse(localStorage.getItem(key)) || [];

        const newComments = commentsData.filter(function(comment){
            return comment !== text;
        });

        localStorage.setItem(key, JSON.stringify(newComments))

        comment.remove();

    });

    comment.appendChild(p);
    comment.appendChild(deleteButton);

    commentsContainer.appendChild(comment);


}
function loadComments(){
    const posts = document.querySelectorAll(".post");
    posts.forEach(function(post){
        const id = post.dataset.id;
        const key = `comments_post_${id}`;
        
        const commentsData = JSON.parse(localStorage.getItem(key)) || [];

        commentsData.forEach(function(text){
            renderComment(post, text);
        });
    });
}
loadComments();


//functions for Follow button
function toggleFollow(post){
    const id = post.dataset.id;
    const key = `follow_post_${id}`;

    const followed = localStorage.getItem(key) === "true";

    if(followed){
        localStorage.setItem(key, "false");
        updateFollowUI(post, false);
    }
    else{
        localStorage.setItem(key, "true");
        updateFollowUI(post, true);
    }
}

function updateFollowUI(post, followed){
    const followButton = post.querySelector(".follow-button");
    const text = followButton.querySelector(".text1");

    if(followed){
        text.textContent = "Following";
        followButton.classList.add("following");
    }
    else{
        text.textContent = "Follow";
        followButton.classList.remove("following");
    }
}

function loadFollow(){
    const posts = document.querySelectorAll(".post");

    posts.forEach(function(post){
        const id = post.dataset.id;
        const key = `follow_post_${id}`;

        const followed = localStorage.getItem(key) === "true";

        updateFollowUI(post, followed);
    });
}

loadFollow();



// --------Events executing

// --------Event click  

const followButtons = document.querySelectorAll(".follow-button");

followButtons.forEach(function(button){
    button.addEventListener("click", function(){
        const post = button.closest(".post");
        toggleFollow(post);
    });
});

// Comment Button
const commentButtons = document.querySelectorAll(".comment-button");

commentButtons.forEach(function(button){
    button.addEventListener("click", function(){
        const post = button.closest(".post");
        addComment(post);
        
    });
});

// Logout button
const logoutButton = document.querySelector(".logout-button");

logoutButton.addEventListener("click", function(){
    window.location.href = "index.html";
});

// Double click
const HEART_DURATION = 800;
const postImages = document.querySelectorAll(".post-image");

postImages.forEach(function(postImage){
    postImage.addEventListener("dblclick", function(){
        const heart = postImage.querySelector(".heart");
        heart.classList.add("show");
        
        setTimeout(function(){
            heart.classList.remove("show");
        }, HEART_DURATION);
    });
});

// Event Enter

// Comment Input
const commentInputs = document.querySelectorAll(".comment-input");

commentInputs.forEach(function(input){
    input.addEventListener("keydown", function(event){
        if(event.key === "Enter"){
            const post = input.closest(".post");
            addComment(post);
        }
    });
});

// Save localStorage comments

