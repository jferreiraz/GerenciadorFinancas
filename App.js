import React from 'react';
import { StatusBar, BackHandler } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor='#5CC6BA' barStyle="light-content" />
      <Routes />
    </NavigationContainer>
  );
}
