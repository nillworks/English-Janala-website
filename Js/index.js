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

  spinnerLoading(true);

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
                <h2 class="text-2xl font-semibold">${dataItem.word ? dataItem.word : 'শব্দ পাওয়া যায়নি'}</h2>
                <p class="font-medium text-lg">${dataItem.meaning ? dataItem.meaning : 'অর্থ পাওয়া যায়নি'}</p>
                <p class="font-banglaFont font-semibold text-2xl text-[#18181B]">"${dataItem.meaning ? dataItem.meaning : 'Pronunciation পাওয়া যায়নি'}/${
                  dataItem.pronunciation
                    ? dataItem.pronunciation
                    : 'Pronunciation পাওয়া যায়নি'
                }"</p>
              </div>

              <!-- icons 2 -->
              <div class="flex items-center justify-around">
                <button onclick="loadWordDetail(${dataItem.id})" class="cursor-pointer">
                  <div class="p-2 rounded-lg bg-[#1A91FF]/10">
                    <img src="assets/icons/i.png" alt="icons">
                  </div>
                </button>

                <button onclick="pronounceWord('${dataItem?.word}')" class="cursor-pointer">
                  <div class="p-2 rounded-lg bg-[#1A91FF]/10">
                    <img src="assets/icons/fi-sr-volume.png" alt="icons">
                  </div>
                </button>
              </div>
    
    `;

    cardContainer.appendChild(itemDiv);

    // console.log(dataItem);
  });

  spinnerLoading(false);
};

// Word Details Api Load
const loadWordDetail = async id => {
  console.log(id);
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const data = await res.json();

  displayLoadedData(data.data);
};

// Display Loaded Data Word
const displayLoadedData = data => {
  const getDetailsBox = document.getElementById('detailsContainerModal');
  document.getElementById('my_modal').showModal();
  getDetailsBox.innerHTML = '';
  console.log(data);

  // Data Renders Word Modal
  const div = document.createElement('div');
  div.className = 'space-y-5';

  div.innerHTML = `
    
                <div>
                <h2 class="text-3xl font-semibold">${data?.word} (<span><i class="fa-solid fa-microphone-lines"></i></span>
                  :${data?.pronunciation})
                </h2>
              </div>

              <!-- meaning -->
              <div class="space-y-1">
                <h2 class="font-semibold text-lg">Meaning</h2>
                <h6 class="font-medium">${data?.meaning}</h6>
              </div>

              <!-- Example -->
              <div class="space-y-1">
                <h2 class="text-lg font-semibold">Example</h2>
                <p>${data?.sentence}</p>
              </div>

              <!-- সমার্থক শব্দ গুলো  -->
              <div class="space-x-4">
                <span class="px-2 py-1 bg-[#EDF7FF] rounded-sm">${data?.synonyms[0]}</span>
                <span class="px-2 py-1 bg-[#EDF7FF] rounded-sm">${data?.synonyms[1]}</span>
                <span class="px-2 py-1 bg-[#EDF7FF] rounded-sm">${data?.synonyms[2]}</span>
              </div>
    
    `;

  getDetailsBox.appendChild(div);
};

// Manage Spinner loading
const spinnerLoading = status => {
  if (status === true) {
    document.getElementById('LoadingSpinner').classList.remove('hidden');
    document.getElementById('prentContainer').classList.add('hidden');
  } else {
    document.getElementById('LoadingSpinner').classList.add('hidden');
    document.getElementById('prentContainer').classList.remove('hidden');
  }
};

loadLessons();

// Search System
const getSearchButton = document.getElementById('btnSearch');
getSearchButton.addEventListener('click', () => {
  const inputValue = document
    .getElementById('inputSearch')
    .value.trim()
    .toLowerCase();

  // all word Api
  fetch('https://openapi.programming-hero.com/api/words/all')
    .then(res => res.json())
    .then(data => {
      const allWord = data.data;

      // filter Words
      const filterWords = allWord.filter(words =>
        words.word.toLowerCase().includes(inputValue),
      );
      displayLevelWord(filterWords);
      console.log(filterWords);
    });

  console.log(inputValue);
});

// Sound System
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-EN';
  window.speechSynthesis.speak(utterance);
}
