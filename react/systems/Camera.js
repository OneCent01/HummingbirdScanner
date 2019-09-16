import React from 'react';

import { 
  Text, 
  View, 
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';


import { 
  RNCamera 
} from 'react-native-camera';


const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
}

export default class Camera extends React.Component {
	constructor(props) {
		super(props)

    	this.state = {
    	  barcodes: []
    	}
	
    	this.addBarcodes = barcodes => {
    	  const codesNotInState = barcodes.filter(code => true)
    	  if(codesNotInState.length) {
    	    this.setState({
    	      barcodes: [...this.state.barcodes, ...codesNotInState]
    	    })
    	  }
    	}
	
    	this.takePicture = () => {
    	  if (this.camera) {
    	    this.camera.takePictureAsync({ 
    	      quality: 0.5, 
    	      base64: true 
    	    })
    	    .then(data => console.log(data.uri))
    	    .catch(err => console.log(`FAIL: ${err}`))
    	  }
    	}
	}

	render() {
		return (
    	  <View style={styles.container}>
    	    <RNCamera
    	      ref={ref => this.camera = ref}
    	      style={styles.preview}
    	      type={RNCamera.Constants.Type.back}
    	      flashMode={RNCamera.Constants.FlashMode.on}
    	      androidCameraPermissionOptions={{
    	        title: 'Permission to use camera',
    	        message: 'We need your permission to use your camera',
    	        buttonPositive: 'Ok',
    	        buttonNegative: 'Cancel',
    	      }}
    	      androidRecordAudioPermissionOptions={{
    	        title: 'Permission to use audio recording',
    	        message: 'We need your permission to use your audio',
    	        buttonPositive: 'Ok',
    	        buttonNegative: 'Cancel',
    	      }}
    	      onGoogleVisionBarcodesDetected={res => this.addBarcodes(res.barcodes)}
    	    />
    	    <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
    	      <TouchableOpacity 
    	        onPress={this.takePicture} 
    	        style={styles.capture}
    	      >
    	        <Text style={{ fontSize: 14 }}> SNAP </Text>
    	      </TouchableOpacity>
    	    </View>
    	  </View>
    	)
	}
}