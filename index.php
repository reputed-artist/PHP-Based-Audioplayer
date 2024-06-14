<!DOCTYPE html>
<html>
  <head>
    <title>AmplitudeJS Testing</title>

    <!-- Include font -->
    <link href="https://fonts.googleapis.com/css?family=Lato:400,400i" rel="stylesheet">

		<!-- Include Amplitude JS -->
		<script type="text/javascript" src="dist/amplitude.js"></script>

    <script src="js/jsmediatags/3.9.5/jsmediatags.min.js"></script>


		<!-- Include Style Sheet -->
		<link rel="stylesheet" type="text/css" href="css/app.css"/>

  </head>
  <body style="background-color: white">
  
  <div align="center" style="padding-top: 10px;">
  <input type="file" id="fileInput" multiple accept="audio/*">
   </div>
    <div id="flat-black-player-container">
      <div id="list-screen" class="slide-in-top">
        <div id="list-screen-header" class="hide-playlist">
          <img id="up-arrow" src="img/up.svg"/>
          Hide Playlist
        </div>

        <div id="list">    
        
        </div>


        <div id="list-screen-footer">
          <div id="list-screen-meta-container">
            <span data-amplitude-song-info="name" class="song-name"></span>

            <div class="song-artist-album">
              <span data-amplitude-song-info="artist"></span>
            </div>
          </div>
          <div class="list-controls">
            <div class="list-previous amplitude-prev"></div>
            <div class="list-play-pause amplitude-play-pause"></div>
            <div class="list-next amplitude-next"></div>
          </div>
        </div>
      </div>
     

      <div id="player-screen">
        <div class="player-header down-header">
          <img id="down" src="img/down.svg"/>
          Show Playlist
        </div>
        <div id="player-top">
          <img id="cover_art_url" data-amplitude-song-info="cover_art_url" style="height: 200px;" />
        </div>
        <div id="player-progress-bar-container">
          <progress id="song-played-progress" class="amplitude-song-played-progress"></progress>
          <progress id="song-buffered-progress" class="amplitude-buffered-progress" value="0"></progress>
        </div>
        <div id="player-middle">
          <div id="time-container">
            <span class="amplitude-current-time time-container"></span>
            <span class="amplitude-duration-time time-container"></span>
          </div>
          <div id="meta-container">
            <span data-amplitude-song-info="name" class="song-name"></span>

            <div class="song-artist-album">
              <span data-amplitude-song-info="artist"></span>
            </div>
          </div>
        </div>

        <div id="player-bottom">
          <div id="control-container">

            <div id="shuffle-container">
              <div class="amplitude-shuffle amplitude-shuffle-off" id="shuffle"></div>
            </div>

            <div id="prev-container">
              <div class="amplitude-prev" id="previous"></div>
            </div>

            <div id="play-pause-container">
              <div class="amplitude-play-pause" id="play-pause"></div>
            </div>

            <div id="next-container">
              <div class="amplitude-next" id="next"></div>
            </div>

            <div id="repeat-container">
              <div class="amplitude-repeat" id="repeat"></div>
            </div>

          </div>

          <div id="volume-container">
            <img src="img/volume.svg"/><input type="range" class="amplitude-volume-slider" step=".1"/>
          </div>
        </div>
      </div>

      
    </div>
  </body>
  
<script>

</script>

  <script type="text/javascript" src="js/functions.js"></script>

</html>
