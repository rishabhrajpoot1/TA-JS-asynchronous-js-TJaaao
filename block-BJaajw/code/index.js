function int() {
    let url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=30`;
    let root = document.querySelector('ul');
    let select = document.querySelector('select');
    let newS;
  
    function handleSpinner(status = false) {
      if (status) {
        root.innerHTML = `<div style="text-align:center;"><div class="donut"></div></div>`;
      }
    }
  
    function renderNews(news) {
      root.innerHTML = '';
      news.forEach((newsItem) => {
        let li = document.createElement('li');
        let div1 = document.createElement('div');
        div1.classList.add('flex-40');
        let img = document.createElement('img');
        img.src = newsItem.imageUrl;
        img.alt = 'Image Here';
        div1.append(img);
        let div2 = document.createElement('div');
        div2.classList.add('flex-58');
        let h2 = document.createElement('h2');
        h2.innerText = newsItem.newsSite;
        let h3 = document.createElement('h3');
        h3.innerText = newsItem.title;
        let a = document.createElement('a');
        a.innerText = `Read More`;
        a.href = newsItem.url;
        a.target = `_blank`;
        div2.append(h2, h3, a);
        li.append(div1, div2);
        root.append(li);
      });
    }
  
    function renderInput(allSites) {
      allSites.forEach((site) => {
        let option = document.createElement('option');
        option.value = site;
        option.innerText = site;
        select.append(option);
      });
    }
  
    function init() {
      handleSpinner(true);
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(` ${response.status}`);
          }
          return response.json();
        })
        .then((news) => {
          handleSpinner(false);
          renderNews(news);
  
          let allSites = Array.from(
            new Set(
              news.map((n) => {
                return n.newsSite;
              })
            )
          );
          renderInput(allSites);
  
          newS = news;
        })
        .catch((error) => {
          root.innerHTML = error;
          root.style.textAlign = `center`;
        })
        .finally(() => {
          haldleSpinner(false);
        });
    }
  
    init();
  
    select.addEventListener(`change`, (event) => {
      let array = [];
  
      newS.forEach((val) => {
        if (val.newsSite === event.target.value) {
          array.push(val);
        }
      });
  
      if (array.length === 0) {
        renderNews(newS);
      } else {
        renderNews(array);
      }
    });
  }
  
  int();