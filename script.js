const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('back');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
// Volume control elements
const volumeBtn = document.getElementById('volume-btn');
const volumeSliderContainer = document.getElementById('volume-slider-container');
const volumeSlider = document.getElementById('volume-slider');

// Default volume level
let lastVolume = 1;
let isMuted = false;

// Update volume based on slider
function updateVolume(e) {
    const volume = e.target.value / 100;
    music.volume = volume;
    if (volume === 0) {
        volumeBtn.classList.replace('fa-volume-up', 'fa-volume-mute');
        isMuted = true;
    } else {
        volumeBtn.classList.replace('fa-volume-mute', 'fa-volume-up');
        isMuted = false;
        lastVolume = volume;
    }
}

// Mute/Unmute volume when clicking the volume icon
function toggleMute() {
    if (isMuted) {
        music.volume = lastVolume;
        volumeSlider.value = lastVolume * 100;
        volumeBtn.classList.replace('fa-volume-mute', 'fa-volume-up');
    } else {
        lastVolume = music.volume;
        music.volume = 0;
        volumeSlider.value = 0;
        volumeBtn.classList.replace('fa-volume-up', 'fa-volume-mute');
    }
    isMuted = !isMuted;
}

// Show volume slider container when hovering over the icon
function showVolumeSlider() {
    volumeBtn.parentElement.classList.add('active');
}

// Hide volume slider container when not hovering
function hideVolumeSlider() {
    setTimeout(() => {
        if (!volumeSliderContainer.matches(':hover') && !volumeBtn.matches(':hover')) {
            volumeBtn.parentElement.classList.remove('active');
        }
    }, 100); // Slight delay to allow interaction
}

//Music
const songs = [
    {
        name: '1',
        displayName: 'Eye Of The Tiger',
        artist: 'Survivor',
    },
    {
        name: '2',
        displayName: 'Another One Bites The Dust',
        artist: 'Queen',
    },
    {
        name: '3',
        displayName: 'You Give Love A Bad Name',
        artist: 'Bon Jovi',
    },
    {
        name: '4',
        displayName: 'I Was Made For Loving U',
        artist: 'Kiss',
    },
    {
        name: '5',
        displayName: 'Under Pressure',
        artist: 'Queen',
    },
    {
        name: '6',
        displayName: 'We Will Rock You',
        artist: 'Queen',
    },
    {
        name: '7',
        displayName: 'The Final Countdown',
        artist: 'Queen',
    },

];


//CHECK IF PLAYING
let isPlaying = false;

// PLAY
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}


// PAUSE
function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

//PLAY/PAUSE EVENT LISTENER
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

//UPDATE DOM
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

//CURRENT SONG
let songIndex = 0;

//PREVIOUS SONG
function prevSong(){
    songIndex--;
    if (songIndex < 0){
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//NEXT SONG
function nextSong(){
    songIndex++;
    if (songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//ON LOAD - SELECT THE FIRST SONG FROM THE ARRAY
loadSong(songs[songIndex]);

//UPDATE PROGRESS BAR & TIME
function updateProgressBar(e){
    if(isPlaying){
        const {duration, currentTime} = e.srcElement;
        //UPDATE PROGRESS BAR WIDTH
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        //CALCULATE DISPLAY FOR DURATION
        const durationMin = Math.floor(duration / 60);
        let durationSec = Math.floor(duration % 60);
        if(durationSec < 10){
            durationSec = `0${durationSec}`;
        }
        if(durationSec){
        durationEl.textContent = `${durationMin}:${durationSec}`;
        }
        
        //CALCULATE DISPLAY FOR CURRENT
        const currentMin = Math.floor(currentTime / 60);
        let currentSec = Math.floor(currentTime % 60);
        if(currentSec < 10){
            currentSec = `0${currentSec}`;
        }
        currentTimeEl.textContent = `${currentMin}:${currentSec}`;
    }
}

//SET PROGRESS BAR
function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX / width) * duration;
}

//Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
//EventListener for autoplaying the next song
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click',setProgressBar);
// Event listeners for volume control
volumeBtn.addEventListener('click', toggleMute);
volumeBtn.addEventListener('mouseenter', showVolumeSlider);
volumeBtn.addEventListener('mouseleave', hideVolumeSlider);
volumeSliderContainer.addEventListener('mouseenter', showVolumeSlider);
volumeSliderContainer.addEventListener('mouseleave', hideVolumeSlider);
volumeSlider.addEventListener('input', updateVolume);

// Set initial volume
volumeSlider.value = music.volume * 100;