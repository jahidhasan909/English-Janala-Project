



document.getElementById('log-input').addEventListener('click', function () {
    const userName = document.getElementById('userName-input');
    const checkUserNameValue = userName.value;

    const password = document.getElementById('password-input');
    const checkPasswordValue = password.value;

    if (checkUserNameValue == 'jahidhasan999' && checkPasswordValue == 'jahidhasan') {
        alert('success');




        
    } else {
        alert('wrong');
        return;
    }


})



const synonymsFun = (arr) => {
    const elementsMake = arr.map((el) => `<span class="btn">${el}</span>`)
    return elementsMake.join(' ');
}


function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-EN"; // English
    window.speechSynthesis.speak(utterance);
}


const loadWord = (id) => {
    manegeLoading(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            wordDisplay(data.data)
            removeActive();
            const levelNo = document.getElementById(`level-no-${id}`)
            levelNo.classList.add('active');
        })
}

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const word = await fetch(url);
    const details = await word.json();
    wordDetailsDisplay(details.data);
}

const lessonLoad = () => {
    const url = 'https://openapi.programming-hero.com/api/levels/all';
    fetch(url)
        .then(res => res.json())
        .then(data => displayLesson(data.data))
}

const removeActive = () => {
    const lessonBtn = document.querySelectorAll('.lesson-btn');
    lessonBtn.forEach(btn => btn.classList.remove('active'));
}



const wordDetailsDisplay = (details) => {
    const wordContainerDetails = document.getElementById("wordDetails-container");
    wordContainerDetails.innerHTML = `
                <div>
                    <h2 class="text-2xl font-bold">${details.word} (<i class="fa-solid fa-microphone-lines"></i>:${details.pronunciation})</h2>
                </div>
                <div>
                    <h3 class="text-[1rem] font-bold">Meaning</h3>
                    <p>${details.meaning}</p>
                </div>
                <div>
                    <h3 class="text-[1rem] font-bold">Example</h3>
                    <p>${details.sentence}</p>
                </div>
                <div>
                    <h2 class="text-[1rem] font-bold">সমার্থক শব্দ গুলো</h2>
                   <div>
                    ${synonymsFun(details.synonyms)}                   
                </div>
                </div>
    `;
    document.getElementById('word_dailog').showModal();

}


const manegeLoading = (status) => {
    if (status == true) {
        document.getElementById('spnner').classList.remove('hidden');
        document.getElementById('word-container').classList.add('hidden');
    } else {
        document.getElementById('word-container').classList.remove('hidden');
        document.getElementById('spnner').classList.add('hidden');
    }
}

const wordDisplay = (word) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';

    if (word.length == 0) {
        wordContainer.innerHTML = `
      <div class="mx-auto col-span-full text-center space-y-3 font-bangla">   
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-[1.10rem] text-neutral/60">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h1 class="text-4xl font-bold">নেক্সট Lesson এ যান</h1>
        </div>
      `;

    }

    word.forEach(words => {
        const div = document.createElement('div');
        div.innerHTML = `
      <div class="bg-white flex flex-col items-center py-10 px-5 space-y-5 rounded-md">
            <h3 class="text-[1.40rem] font-semibold">${words.word ? words.word : "word পাওয়া যায়নি"}</h3>
            <p class="text-[1rem] text-neutral/80">Meaning /Pronounciation</p>
            <p class="font-semibold font-bangla text[1.40rem]">"${words.meaning ? words.meaning : "অর্থ পাওয়া যায়নি"}/ ${words.pronunciation ? words.pronunciation : "pronunciation পাওয়া যায়নি"}"</p>
            <div class="flex gap-44">
                <button onclick="loadWordDetail(${words.id})"  class="btn bg-[#1A91FF20] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button onclick="pronounceWord('${words.word}')" class="btn bg-[#1A91FF20] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
    `;
        wordContainer.appendChild(div);
    })

    manegeLoading(false);

}

const displayLesson = (lesson) => {
    const lessonContainer = document.getElementById('lesson-container');
    lessonContainer.innerHTML = '';
    lesson.forEach(lessons => {
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
        <button id="level-no-${lessons.level_no}" onclick="loadWord('${lessons.level_no}')" class="btn btn-outline btn-primary lesson-btn">
        <i class="fa-brands fa-leanpub"></i> 
        Lesson-${lessons.level_no}</button>
        `;
        lessonContainer.appendChild(btnDiv);
    });

}



document.getElementById('btn-search').addEventListener('click', function () {
    removeActive();
    const input = document.getElementById('input');
    const searchValue = input.value.trim().toLowerCase();

    fetch('https://openapi.programming-hero.com/api/words/all')
        .then(res => res.json())
        .then(data => {
            const allWord = data.data;
            const filterWord = allWord.filter((word) => word.word.toLowerCase().includes(searchValue));
            wordDisplay(filterWord);

        })


})


lessonLoad();