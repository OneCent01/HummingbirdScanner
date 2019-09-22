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

import server from '../../server/serverApi.js'

import modelApi from '../../modelApi.js'


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
    	}
	
    	this.addBarcodes = barcodes => {
            Promise.all(
                barcodes.map(
                    barcodeData => server.scanProduct(barcodeData.data)
                )
            )
            .then(res => console.log('res: ', res))
            .catch(err => console.log('err: ', err))
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
                onGoogleVisionBarcodesDetected={res => {
                  this.addBarcodes(res.barcodes)
                  modelApi.dispatch({type: 'CLOSE_CAMERA'})
                }}
    	    />
    	    <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
    	      <TouchableOpacity 
    	        onPress={()=>modelApi.dispatch({type: 'CLOSE_CAMERA'})} 
    	        style={styles.capture}
    	      >
    	        <Text style={{ fontSize: 14 }}> Close </Text>
    	      </TouchableOpacity>
    	    </View>
    	  </View>
    	)
	}
}