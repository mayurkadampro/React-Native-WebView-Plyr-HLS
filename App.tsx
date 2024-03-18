import React from 'react';
import { SafeAreaView } from 'react-native';
import Player from './src/Component/player';
const VideoPlayer = require('./assets/VideoPlayer.html');

function App(): React.JSX.Element {
  const seekTime = 0;
  const videoURL = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4#t=' + seekTime;
  const thumbnailURL =
    'https://images.unsplash.com/photo-1597429554061-25d8068d6b3f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMDc0MzU1NQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080';
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
