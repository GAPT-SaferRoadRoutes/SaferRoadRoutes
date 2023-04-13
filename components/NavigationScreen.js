import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Pressable, Button, Alert, Image, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';

export default function NavigationScreen({navigation, route}) {
  return (
    <View style = {styles.container}>
      <Text>
        Navigation view will go here
      </Text>
      <Text>
        Your name: {route.params.yourName}
      </Text>
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
  }
});