import React from 'react';
import { SafeAreaView } from 'react-native';
import Player from './src/Component/player';
const VideoPlayer = require('./assets/VideoPlayer.html');

function App(): React.JSX.Element {
  const seekTime = 0;
  const videoURL = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4#t=' + seekTime;
  const thumbnailURL = '';
  // const videoURL = './downloads/VolkswagenGTIReview.mp4';


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Player
        htmlPlayer={VideoPlayer}
        videoURL={videoURL}
        thumbnailURL={thumbnailURL}
        videoSeekTime={seekTime}
      />
    </SafeAreaView>
  );
}

export default App;
