import React, {useRef, useState} from 'react';
import {Alert, View, ActivityIndicator, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import Orientation from 'react-native-orientation-locker';

export default function player(props: {
  htmlPlayer: any;
  videoURL: string;
  thumbnailURL: string;
  videoSeekTime: number;
}): React.JSX.Element {
  const webViewRef = useRef(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const showAlert = (msg: string) =>
    Alert.alert(
      'Alert Title',
      msg,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            'This alert was dismissed by tapping outside of the alert dialog.',
          ),
      },
    );

  const debugging = `
  const consoleLog = (type, log) => window.ReactNativeWebView.postMessage(JSON.stringify({'type': 'Console', 'data': {'type': type, 'log': log}}));
  console = {
      log: (log) => consoleLog('log', log),
      debug: (log) => consoleLog('debug', log),
      info: (log) => consoleLog('info', log),
      warn: (log) => consoleLog('warn', log),
      error: (log) => consoleLog('error', log),
    };
  let plyrVid = document.querySelector('#player');
  plyrVid.src = '${props.videoURL}';
  plyrVid.poster = '${props.thumbnailURL}';
`;

  const onMessage = (payload: any) => {
    let dataPayload;
    try {
      dataPayload = JSON.parse(payload.nativeEvent.data);
    } catch (e) {}

    if (dataPayload) {
      if (dataPayload.type === 'Console') {
        let consoleMsg = dataPayload.data.log.split('|');
        console.log(consoleMsg);
        if (consoleMsg[0] === 'SLIDER') {
          showAlert('You can not move forward');
        } else if (consoleMsg[0] === 'FullScreenOut') {
          console.log('Lock Orientation to Potrait');
          Orientation.lockToPortrait();
        } else if (consoleMsg[0] === 'FullScreenIn') {
          console.log('Lock Orientation to LandScape');
          Orientation.lockToLandscape();
        } else if (consoleMsg[0] === 'ENDED') {
          showAlert('Video Completed Successfully');
        }
      } else {
        console.log(dataPayload);
      }
    }
  };

  const Spinner = () => (
    <View style={styles.activityContainer}>
      <ActivityIndicator size="large" color="black" />
    </View>
  );

  return (
    <>
      <WebView
        style={{flex: 1}}
        javaScriptEnabled={true}
        scrollEnabled={false}
        allowsFullscreenVideo={true}
        userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
        ref={webViewRef}
        scalesPageToFit={true}
        bounces={false}
        injectedJavaScript={debugging}
        onMessage={onMessage}
        onLoadStart={() => setShowSpinner(true)}
        onLoad={() => setShowSpinner(false)}
        renderLoading={() => <Spinner />}
        source={props.htmlPlayer}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'white',
    height: '40%',
    width: '100%',
  },
});
