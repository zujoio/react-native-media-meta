'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  NativeModules
} from 'react-native';
import fs from 'react-native-fs';

const savePath = fs.DocumentDirectoryPath + "/example.mp4";
const videoURL = 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4';

class MediaMetaSample extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      downloaded: false
    };
  }

  downloadFile = async () => {
    try {
      const stat = await fs.stat(savePath);
      if (stat.isFile()) {
        this.setState({ downloaded: true});
        return;
      }
    } catch(e) {}
    
    fs.downloadFile(videoURL, savePath, () => {
      console.log('start donwload');
    }, (downloadResult) => {
      console.log(downloadResult);
      if (downloadResult.contentLength == downloadResult.bytesWritten){
        console.log('finish');
        this.setState({ downloaded: true});
      }
    });
  };

  render() {
    const { downloaded, loaded, data } = this.state;
    if (!downloaded) {
      this.downloadFile();
    } else if (!loaded) {
      NativeModules.RNMediaMeta.get(savePath)
        .then(result => {
          this.setState({ loaded: true, data: result });
        })
        .catch(e => console.log(e));
    }
    console.log(data);
    return (
      <View style={styles.container}>
        {
          (() => {
            if (!downloaded) {
              return <Text style={styles.welcome}>Downloading...</Text>;
            } else if (!loaded) {
              return <Text style={styles.welcome}>Loading...</Text>;
            } else {
              if (data && data.thumb) {
                return (
                  <Image
                    style={{width: 100, height: 100, resizeMode: 'cover', borderWidth: 1, borderColor: 'red'}}
                    source={{uri: data.thumb}}
                  />
                );
              } else {
                return <Text style={styles.welcome}>No thumb</Text>;
              }
            }
          })()
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('MediaMetaSample', () => MediaMetaSample);
