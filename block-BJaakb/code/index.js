const input = document.querySelector('input');
const imgContainer = document.querySelector('.imageContainer');

function fetch(event) {
  if (event.keyCode === 13) {
    let value = event.target.value;
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open(
        'GET',
        `https://api.unsplash.com/search/photos/?query=${value}&client_id=GSNmk81zV1uXBW1mXOhUSe7SHoxRAk2JMNyuXf4Ri7Y`
      );

      xhr.onload = function () {
        let searchData = JSON.parse(xhr.response);
        imgContainer.innerHTML = '';

        searchData.results.forEach((elem, index) => {
          let div = document.createElement('div');
          div.classList.add('image-box');
          let img = document.createElement('img');
          img.setAttribute('alt', `Image of ${value}`);

          img.src = elem.urls.small;

          let dwd = document.createElement('a');
          let span = document.createElement('span');
          span.innerText = `Download`;
          let i = document.createElement('i');
          i.classList.add(`fas`, `fa-download`);
          dwd.classList.add('download');
          dwd.href = `${elem.urls.raw}`;
          dwd.download = `elem.urls.raw`;
          dwd.append(span, i);
          div.append(img, dwd);
          imgContainer.append(div);
        });
      };

      xhr.oneror = () =>
        reject(
          (imgContainer.innerHTML = `<p style="text-align= center;"> Something went wrong...!<p>`)
        );
      xhr.send();
      input.value = '';
    });
  }
}

input.addEventListener('keyup', fetch);