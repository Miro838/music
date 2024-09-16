// Get DOM elements
const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const progressBar = document.getElementById('progress-bar');
const albumArt = document.getElementById('album-art');
const songTitle = document.getElementById('song-title');
const artistName = document.getElementById('artist-name');

// Array of online music tracks with metadata
const tracks = [
    {
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        title: 'SoundHelix Song 1',
        artist: 'SoundHelix',
        art: 'https://source.unsplash.com/150x150/?music'
    },
    {
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        title: 'SoundHelix Song 2',
        artist: 'SoundHelix',
        art: 'https://source.unsplash.com/150x150/?album'
    },
    {
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        title: 'SoundHelix Song 3',
        artist: 'SoundHelix',
        art: 'https://source.unsplash.com/150x150/?music,vinyl'
    }
];

let currentTrackIndex = 0;

// Function to load and play a track
function loadTrack(index) {
    const track = tracks[index];
    audio.src = track.src;
    songTitle.textContent = track.title;
    artistName.textContent = track.artist;
    albumArt.src = track.art;
    audio.play();
}

// Play/Pause button functionality
playButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playButton.innerHTML = '<span>❚❚</span>'; // Pause icon
    } else {
        audio.pause();
        playButton.innerHTML = '<span>▶</span>'; // Play icon
    }
});

// Previous track functionality
prevButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex > 0) ? currentTrackIndex - 1 : tracks.length - 1;
    loadTrack(currentTrackIndex);
});

// Next track functionality
nextButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex < tracks.length - 1) ? currentTrackIndex + 1 : 0;
    loadTrack(currentTrackIndex);
});

// Update the progress bar as the track plays
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;
    }
});

// Seek functionality for the progress bar
progressBar.addEventListener('input', () => {
    if (audio.duration) {
        const newTime = (progressBar.value / 100) * audio.duration;
        audio.currentTime = newTime;
    }
});

// Initialize the player with the first track
loadTrack(currentTrackIndex);
