// Api Data Load Lesson id
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

// Let's Learn Vocabularies Lesson Button Load
const dataRender = data => {
  const lessonUlContainer = document.getElementById('lessonUlContainer');
  lessonUlContainer.innerHTML = '';

  data.forEach(item => {
    const li = document.createElement('li');

    li.innerHTML = `
     <a  onclick="loadLevelButton(${item.level_no} ,this)" class="btn btn-outline btn-primary level-btn">
     <i class="fa-solid fa-book-open"></i> Lesson - ${item?.level_no}</a>
    
    `;

    lessonUlContainer.appendChild(li);
  });
};

// every Lesson Button Data Load
const loadLevelButton = (id, element) => {
  // button Select Element all
  const allButtons = document.querySelectorAll('.level-btn');

  allButtons.forEach(btn => {
    btn.classList.add('btn-outline');
  });

  // clicked button active.
  element.classList.remove('btn-outline');
  element.classList.add('btn-primary');

  // Data Load
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      displayLevelWord(data.data);
    });
};

// Lesson Button Click Card Data Load
const displayLevelWord = data => {
  const cardParentContainer = document.getElementById('prentContainer');
  const cardContainer = document.getElementById('cardContainer');

  cardParentContainer.className = 'bg-[#F8F8F8] py-8 px-4 rounded-lg';
  cardContainer.innerHTML = '';

  if (data.length !== 0) {
    document.getElementById('noLessonSection').classList.add('hidden');
    cardParentContainer.classList.add('bg-[#F8F8F8]');
    document.getElementById('noLessonVocabulary').classList.add('hidden');
  } else {
    // document.getElementById('noLessonSection').classList.remove('hidden');
    cardParentContainer.classList.remove('bg-[#F8F8F8]');
    document.getElementById('noLessonVocabulary').classList.remove('hidden');
  }

  data.forEach(dataItem => {
    const itemDiv = document.createElement('div');
    itemDiv.className =
      'bg-white py-10 px-2 text-center space-y-4 rounded-sm transition duration-300 hover:-translate-y-1 cursor-pointer hover:shadow-md';

    itemDiv.innerHTML = `
    
              <!-- Card Details -->

              <div class="space-y-3">
                <h2 class="text-2xl font-semibold">${dataItem.word}</h2>
                <p class="font-medium text-lg">${dataItem.meaning}</p>
                <p class="font-banglaFont font-semibold text-2xl text-[#18181B]">"${dataItem.meaning}/${
                  dataItem.pronunciation
                }"</p>
              </div>

              <!-- icons 2 -->
              <div class="flex items-center justify-around">
                <button onclick="" class="cursor-pointer">
                  <div class="p-2 rounded-lg bg-[#1A91FF]/10">
                    <img src="assets/icons/i.png" alt="icons">
                  </div>
                </button>

                <button onclick="" class="cursor-pointer">
                  <div class="p-2 rounded-lg bg-[#1A91FF]/10">
                    <img src="assets/icons/fi-sr-volume.png" alt="icons">
                  </div>
                </button>
              </div>
    
    `;

    cardContainer.appendChild(itemDiv);

    console.log(dataItem);
  });
};
