import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Button,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

export default function NavigationScreen({ navigation, route }){

  [state, setState] = React.useState('');
  [position, setPosition] = React.useState('');
  [startLocation, setStart] = React.useState({
    latitude: 35.9,
    longitude: 14.4
  });

  [endLocation, setEnd] = React.useState({
    latitude: 35.9,
    longitude: 14.405
  })

  const GOOGLE_MAPS_APIKEY = 'AIzaSyDHxjfsDkCTurqh1v5Ot1SS6Gi_XI5iNsQ';
  //const GOOGLE_MAPS_APIKEY = '';

  function _handleMapRegionChange(mapRegion){
    this.setState({ mapRegion });
  }

  return (
    <View style={styles.container}>
      <Text>Welcome, {route.params.yourName}!</Text>
      <Text>Startpos: {startLocation.latitude}, {startLocation.longitude}</Text>

      <MapView
        initialRegion = {
          {
            latitude: 35.9,
            longitude: 14.4,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05
          }
        }
        style={{ alignSelf: 'stretch', height: '100%' }}
      >
        <Marker
          draggable
          coordinate={startLocation}
          pinColor = "#00ff00"
          title="Start Marker"
          description="Drag this to your starting location"
          onDragEnd={(e) => this.setStart({latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude })}
        />
        <Marker
          draggable
          coordinate={endLocation}
          title="End Marker"
          description="Drag this to your ending location"
          onDragEnd={(e) => this.setEnd({latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude })}
        />
        <MapViewDirections
          origin = {startLocation}
          destination = {endLocation}
          apikey = {GOOGLE_MAPS_APIKEY}
          strokeWidth = {3}
          strokeColor = "#0000ff"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
