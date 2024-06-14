window.onkeydown = function(e) {
    return !(e.keyCode == 32);
};

// Initial Amplitude.js setup with placeholder songs
Amplitude.init({
    bindings: {
        37: 'prev',
        39: 'next',
        32: 'play_pause'
    },
    songs: []
});


document.getElementById('fileInput').addEventListener('change', function(event) {
    var files = event.target.files;
    var playlist = document.getElementById('list');
    var audioPlayer = document.getElementById('player-screen');

    console.log("files"+files);

    // Clear the previous playlist
    playlist.innerHTML = '';

    // Create an array to store the song objects
    var songs = [];

    var songLoadPromises = [];


    Array.from(files).forEach((file, index) => {
        var audioUrl = URL.createObjectURL(file);

        var songPromise = new Promise((resolve, reject) => {
            var audio = new Audio();
            audio.src = audioUrl;
            audio.addEventListener('loadedmetadata', () => {
                var duration = formatDuration(audio.duration);

                jsmediatags.read(file, {
                    onSuccess: function(tag) {
                        const tags = tag.tags;
                        const song = {
                            name: tags.title || file.name,
                            artist: tags.artist || 'Unknown Artist',
                            album: tags.album || 'Unknown Album',
                            url: audioUrl,
                            cover_art_url: '',
                            duration: duration
                        };

                        // Placeholder for cover art if it exists
                        if (tags.picture) {
                            let base64String = "";
                            for (let i = 0; i < tags.picture.data.length; i++) {
                                base64String += String.fromCharCode(tags.picture.data[i]);
                            }
                            song.cover_art_url = "data:" + tags.picture.format + ";base64," + window.btoa(base64String);
                        }

                        songs.push(song);
                        resolve(song);
                    },
                    onError: function(error) {
                        console.log(error);
                        resolve({
                            name: file.name,
                            artist: 'Unknown Artist',
                            album: 'Unknown Album',
                            url: audioUrl,
                            cover_art_url: '',
                            duration: duration
                        });
                    }
                });
            });
        });

        songLoadPromises.push(songPromise);
    });



     // Wait for all songs to be loaded
    Promise.all(songLoadPromises).then((loadedSongs) => {
        // Create the playlist in the DOM
        loadedSongs.forEach((song, index) => {
            const listItem = document.createElement('div');
            listItem.className = 'song amplitude-song-container amplitude-play-pause';
            listItem.setAttribute('data-amplitude-song-index', index);



    // // Create a playlist from the selected files
    // Array.from(files).forEach((file, index) => {
    //     const song = {
    //         name: file.name,
    //         artist:file.artist, // Placeholder for artist
    //         album: file.album,   // Placeholder for album
    //         url: URL.createObjectURL(file),
    //         cover_art_url: '',
    //         duration: file.length,         // Placeholder for cover art
    //     };
    //     songs.push(song);

    //      console.log("songs"+songs);

        
    //     const listItem = document.createElement('div');
    //     listItem.className = 'song amplitude-song-container amplitude-play-pause';
    //     listItem.setAttribute('data-amplitude-song-index', index);

        listItem.innerHTML = `
            <span class="song-number-now-playing">
              <span class="number">${index + 1}</span>
              <img class="now-playing" src="img/now-playing.svg"/>
            </span>
            <div class="song-meta-container">
              <span class="song-name" data-amplitude-song-info="name" data-amplitude-song-index="${index}"></span>
              <span class="song-artist-album"><span data-amplitude-song-info="artist" data-amplitude-song-index="${index}"></span> - <span data-amplitude-song-info="album" data-amplitude-song-index="${index}"></span></span>
            </div>
            <span class="song-duration">
              ${song.duration}
            </span>
        `;

        playlist.appendChild(listItem);
        console.log(playlist);
    });

    // Automatically play the first file
    if (files.length > 0) {
        audioPlayer.src = songs[0].url;
        //console.log(audioPlayer.src);
        Amplitude.playNow(0);
    }



    // Initialize Amplitude.js with the created songs
    Amplitude.init({
        bindings: {
            37: 'prev',
            39: 'next',
            32: 'play_pause'
        },
        songs: songs

    });
});

});



// Function to format duration to mm:ss
function formatDuration(duration) {
    var minutes = Math.floor(duration / 60);
    var seconds = Math.floor(duration % 60);
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    return minutes + ':' + seconds;
}
/*
  Handles a click on the down button to slide down the playlist.
*/
document.getElementsByClassName('down-header')[0].addEventListener('click', function(){
    var list = document.getElementById('list');

    list.style.height = ( parseInt( document.getElementById('flat-black-player-container').offsetHeight ) - 135 ) + 'px';

    document.getElementById('list-screen').classList.remove('slide-out-top');
    document.getElementById('list-screen').classList.add('slide-in-top');
    document.getElementById('list-screen').style.display = "block";
});

/*
  Handles a click on the up arrow to hide the list screen.
*/
document.getElementsByClassName('hide-playlist')[0].addEventListener('click', function(){
    document.getElementById('list-screen').classList.remove('slide-in-top');
    document.getElementById('list-screen').classList.add('slide-out-top');
    document.getElementById('list-screen').style.display = "none";
});

/*
  Handles a click on the song played progress bar.
*/
document.getElementById('song-played-progress').addEventListener('click', function( e ){
    var offset = this.getBoundingClientRect();
    var x = e.pageX - offset.left;

    Amplitude.setSongPlayedPercentage( ( parseFloat( x ) / parseFloat( this.offsetWidth) ) * 100 );
});

document.querySelector('img[data-amplitude-song-info="cover_art_url"]').style.height = document.querySelector('img[data-amplitude-song-info="cover_art_url"]').offsetWidth + 'px';

