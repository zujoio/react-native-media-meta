# React Native Media Meta

> Get media file metadata in your React Native app

## Installation

```bash
$ npm install react-native-media-meta --save
```

## Setup

#### iOS

In XCode, in the project navigator:

* Right click `Libraries` ➜ `Add Files to [your project's name]`, Add `node_modules/react-native-media-meta/ios/RNMediaMeta.xcodeproj`.
* Add `libRNMediaMeta.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`

#### Android

* Edit `android/settings.gradle` of your project:

```gradle
...
include ':react-native-media-meta'
project(':react-native-media-meta').projectDir = new File(settingsDir, '../node_modules/react-native-media-meta/android')
```

* Edit `android/app/build.gradle` of your project:

```gradle
...
dependencies {
    ...
    compile project(':react-native-media-meta')
}
```

* Add package to `MainActivity`

```java
......

import com.mybigday.rn.*;   // import

public class MainActivity extends ReactActivity {

    ......

    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new RNMediaMetaPackage()   // add package
        );
    }
}
```

You can use [rnpm](https://github.com/rnpm/rnpm) instead of above steps.

## Usage

```js
import MediaMeta from 'react-native-media-meta';
const path = '<your file path here>';

MediaMeta.get(path)
  .then(metadata => console.log(metadata))
  .catch(err => console.error(err));
```

## API

#### `MediaMeta.get(path)` - Promise

Resolve: Object - included following keys (If it's found)
* `thumb` - Base64 image string (video: get first frame, audio: get artwork if exist)
* `duration` (video only)
* `width` - the thumb width
* `height` - the thumb height
* Others:

__*[Android]*__ We using [FFmpegMediaMetadataRetriever](https://github.com/wseemann/FFmpegMediaMetadataRetriever), see [RNMediaMeta.java#L36](android/src/main/java/com/mybigday.rn/RNMediaMeta.java#L36) for more information.  
__*[iOS]*__ We using [official AVMatadataItem](https://developer.apple.com/library/mac/documentation/AVFoundation/Reference/AVFoundationMetadataKeyReference/#//apple_ref/doc/constant_group/Common_Metadata_Keys), see [RNMediaMeta.m#L9](ios/RNMediaMeta/RNMediaMeta.m#L9) for more information.

## Roadmap

#### iOS
- [ ] Use FFmpegMediaMetadataRetriever iOS instead of AVMatadataItem

## License

[MIT](LICENSE.md)
