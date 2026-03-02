
const lessonLoad = () => {
    const url = 'https://openapi.programming-hero.com/api/levels/all';
    fetch(url)
        .then(res => res.json())
        .then(data => displayLesson(data.data))
}

const loadWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => wordDisplay(data.data))
}

const wordDisplay = (word) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';

    word.forEach(words => {
        const div = document.createElement('div');
        div.innerHTML = `
      <div class="bg-white flex flex-col items-center py-10 px-5 space-y-5 rounded-md">
            <h3 class="text-[1.40rem] font-semibold">${words.word}</h3>
            <p class="text-[1rem] text-neutral/80">Meaning /Pronounciation</p>
            <p class="font-semibold font-bangla text[1.40rem]">"${words.meaning}/ ${words.pronunciation}"</p>
            <div class="flex gap-44">
                <button class="btn bg-[#1A91FF20] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF20] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
    `;
        wordContainer.appendChild(div);
    })

}

const displayLesson = (lesson) => {
    const lessonContainer = document.getElementById('lesson-container');
    lessonContainer.innerHTML = '';
    lesson.forEach(lessons => {
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
        <button onclick="loadWord('${lessons.level_no}')" class="btn btn-outline btn-primary">
        <i class="fa-brands fa-leanpub"></i> 
        Lesson-${lessons.level_no}</button>
        `;
        lessonContainer.appendChild(btnDiv);
    });

}


lessonLoad();