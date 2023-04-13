import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Pressable, Button, Alert, Image, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import LogInScreen from './components/LogInScreen';
import NavigationScreen from './components/NavigationScreen';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LogInScreen}
        />
        <Stack.Screen
          name="Navigation"
          component={NavigationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
