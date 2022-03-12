const song = document.querySelector('.sound');
const video = document.querySelector('.video');
const playBtn = document.querySelector('.play');
const timeBtn = document.querySelectorAll('.time-select button');
const soundBtn = document.querySelectorAll('.sound-picker button');
const timeDisplay = document.querySelector('.time-display');
const timeSelect = document.querySelectorAll('.time-select button')
let fakeDuration = 300;

function app(){
    
    //Play Sound
    playBtn.addEventListener('click', () => {
        checkPlaying(song);
    });

    soundBtn.forEach(sound => {
        sound.addEventListener('click', function(){
            song.src = this.getAttribute("data-sound");
            video.src = this.getAttribute("data-video");
            checkPlaying(song);
        })
    });

    timeSelect.forEach(option => {
        option.addEventListener('click', function(){
            fakeDuration = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
        });
    });

    const checkPlaying = song => {
        if(song.paused){
            song.play();
            video.play();
            playBtn.src = './assets/svg/pause.svg';

        } else {
            song.pause();
            video.pause();
            playBtn.src = './assets/svg/play.svg';
        }
    };
    
};



song.ontimeupdate = () => {
    //Duration
    
    let currentTime = song.currentTime;

    let timeDuration = fakeDuration - currentTime;
    let minutes = Math.floor(timeDuration / 60);
    let seconds = Math.floor(timeDuration % 60);
   
    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (currentTime >= fakeDuration){
        song.pause();
        song.currentTime = 0;
        playBtn.src = './assets/svg/play.svg';
        video.pause();
    };
}

app();