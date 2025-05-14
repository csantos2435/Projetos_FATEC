import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './pages/login';
import Register from './pages/register';
import City from './pages/city';
import Data from './pages/data';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            title: 'METEOR APP',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#1b292d',
            },
            headerTitleStyle: {
              color: '#fff',
            },
          }}
        />
        <Stack.Screen
          name="register"
          component={Register}
          options={{
            title: 'REGISTRAR',
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#1b292d',
            },
            headerTitleStyle: {
              color: '#fff',
            },
          }}
        />
        <Stack.Screen
          name="data"
          component={Data}
          options={{
            title: 'DADOS METEREOLÓGICOS',
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#1b292d',
            },
            headerTitleStyle: {
              color: '#fff',
            },
          }}
        />
        <Stack.Screen
          name="city"
          component={City}
          options={{
            title: 'CIDADES',
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#1b292d',
            },
            headerTitleStyle: {
              color: '#fff',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
