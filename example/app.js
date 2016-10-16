import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  NativeModules
} from 'react-native';
import fs from 'react-native-fs';

const savePath = fs.DocumentDirectoryPath + '/example.mp4';
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
      if (await fs.exists(savePath)) {
        const stat = await fs.stat(savePath);
        console.log(stat);
        if (stat.isFile()) {
          this.setState({ downloaded: true});
          return;
        }
      }
      
    } catch(e) {}

    await fs.downloadFile({
      fromUrl: videoURL,
      toFile: savePath,
    }).promise;
    console.log('finish');
    this.setState({ downloaded: true});
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
    return (
      <View style={styles.container}>
        {
          (() => {
            if (!downloaded) {
              return <Text style={styles.text}>Downloading...</Text>;
            } else if (!loaded) {
              return <Text style={styles.text}>Loading...</Text>;
            } else {
              if (data && data.thumb) {
                return (
                  <Image
                    style={styles.image}
                    source={{ uri: 'data:image/png;base64,' + data.thumb }}
                  />
                );
              } else {
                return <Text style={styles.text}>No thumb</Text>;
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
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: 'red',
  }
});

AppRegistry.registerComponent('MediaMetaSample', () => MediaMetaSample);
