import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Pressable, Button, Alert, Image, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';

export default function LogInScreen({navigation}) {
  const [username, setUsername] = React.useState('');
  const loginAction = () => navigation.navigate('Navigation', {yourName: inputName});
  const [inputName, onChangeName] = React.useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Welcome!
      </Text>
      <Text style={styles.paragraph}>
        Please enter your username:
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        value={inputName}
        placeholder='Input your username here'
        placeholderTextColor='grey'
      />
      <View style={styles.fixToText}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={loginAction}
          activeOpacity={0.5}>
          <Image
            source={require('../assets/snack-icon.png')}
            style={styles.icon}
          />
          <Text>LOG IN</Text>
        </TouchableOpacity>
      </View>
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
  paragraph: {
    margin: 8,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    width: 32,
    height: 32
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#485a96',
    borderWidth: 7,
    borderColor: '#485a96',
    height: 40,
    borderRadius: 5,
    margin: 5,
  },
});
