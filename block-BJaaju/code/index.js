const input = document.querySelector('input');
const imgContainer = document.querySelector('.imageContainer');

let xhr = new XMLHttpRequest();

function handleDownload() {}

function handleInput(event) {
  if (event.keyCode === 13) {
    let value = event.target.value;
    xhr.open(
      'GET',
      `https://api.unsplash.com/search/photos/?query=${value}&client_id=GSNmk81zV1uXBW1mXOhUSe7SHoxRAk2JMNyuXf4Ri7Y`
    );

    xhr.onload = function () {
      let searchData = JSON.parse(xhr.responseText);
      imgContainer.innerHTML = '';

      searchData.results.forEach((elem) => {
        console.log(elem);
        let div = document.createElement('div');
        div.classList.add('image-box');
        let img = document.createElement('img');
        img.setAttribute('alt', `Image of ${value}`);
        img.src = elem.urls.small;

        let dwd = document.createElement('div');
        let span = document.createElement('span');
        span.innerText = `Download`;
        let i = document.createElement('i');
        i.classList.add(`fas`, `fa-download`);
        dwd.classList.add('download');
        dwd.append(span, i);
        dwd.addEventListener('click', handleDownload);
        div.append(img, dwd);
        imgContainer.append(div);
      });
    };

    xhr.onerror = function () {
      imgContainer.innerHTML = `<p style="text-align= center;"> Something went wrong...!<p>`;
    };

    xhr.send();

    input.value = '';
  }
}

input.addEventListener('keyup', handleInput);