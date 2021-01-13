import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SteamLibraryScreen from './screens/SteamLibraryScreen';
import GameDetailScreen from './screens/GameDetailScreen';
import * as hs from "./styles/HeaderStyle";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
        {/*Pantalla principal*/}
        <Stack.Screen
            name ="Steam-Library"
            component={SteamLibraryScreen}
            options={{
              title: 'Librería de Steam',
              options: hs.styles
            }}
          />
        {/*Pantalla de juego*/}
        <Stack.Screen 
            name='Juego Steam' 
            component={GameDetailScreen}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
