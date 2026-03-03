const loadLessons = function () {
  const url = 'https://openapi.programming-hero.com/api/levels/all';
  fetch(url)
    .then(res => res.json())
    .then(data => {
      dataRender(data.data);
      console.log(data);
    });
};

loadLessons();

const dataRender = data => {
  const lessonUlContainer = document.getElementById('lessonUlContainer');
  lessonUlContainer.innerHTML = '';

  data.forEach(item => {
    const li = document.createElement('li');

    li.innerHTML = `
     <a  onclick="loadLevelButton(${item.level_no})" class="btn btn-outline btn-primary">
     <img src="assets/icons/Symbol.png" alt="icons"> Lesson - ${item?.level_no}</a>
    
    `;

    lessonUlContainer.appendChild(li);
  });
};

const loadLevelButton = id => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      displayLevelWord(data.data);
    });
};

const displayLevelWord = data => {
  data.forEach(dataItem => {
    console.log(dataItem.word);
  });
};
