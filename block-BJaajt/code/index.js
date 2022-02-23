//Query Selectors
let input = document.querySelector(`input`);
let userdisplay = document.querySelector(`.userdisplay`);
let username = document.querySelector(`.username`);
let userid = document.querySelector(`.userid`);
let followerpix = document.querySelectorAll(`.followerpix`);
let followingpic = document.querySelectorAll(`.followingpic`);
let catpic = document.querySelector(`.catpic`);
let button = document.querySelector(`button`);

let createUI = (user) => {
  userdisplay.src = user.avatar_url;
  username.innerText = user.name;
  userid.innerText = `@${user.login}`;
  let followers = new XMLHttpRequest();
  followers.open(`GET`, user.followers_url);
  followers.onload = () => {
    let followersData = JSON.parse(followers.response);
    followerpix.forEach((item, id) => {
      item.src = followersData[id].avatar_url;
    });
  };
  followers.send();
  let following = new XMLHttpRequest();
  following.open(`GET`, `https://api.github.com/users/${user.login}/following`);
  following.onload = () => {
    let followingData = JSON.parse(following.response);
    followingpic.forEach((item, id) => {
      item.src = followingData[id].avatar_url;
    });
  };
  following.send();
};
input.addEventListener("keyup", (event) => {
  if (event.code == `Enter`) {
    let xhr = new XMLHttpRequest();
    xhr.open(`GET`, `https://api.github.com/users/${event.target.value}`);
    xhr.onload = () => {
      let userData = JSON.parse(xhr.response);
      createUI(userData);
    };
    xhr.onerror = () => {
      console.log(`Data Fetch Error`);
    };
    xhr.send();
    event.target.value = "";
  }
});

button.onclick = () => {
  let xhr = new XMLHttpRequest();
  xhr.open(
    `GET`,
    `https://api.unsplash.com/photos/random/?client_id=0TSUOv3qXu7bLX5RCLM4LSnkqjwwa5MO002y6Wal4Dk`
  );
  xhr.onload = () => {
    let image = JSON.parse(xhr.response);
    catpic.src = image.urls.small;
  };
  xhr.onerror = () => {
    console.log(`Something went wrong`);
  };
  xhr.send();
};

// 0TSUOv3qXu7bLX5RCLM4LSnkqjwwa5MO002y6Wal4Dk
// https://api.unsplash.com/photos/random