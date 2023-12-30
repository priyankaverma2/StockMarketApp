// MyReactNativeApp/src/App.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './components/redux/store';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard/Dashboard';
import StockChart from './components/Dashboard/StockChart';
import FavoritesList from './components/Dashboard/FavoritesList';
import Header from './components/Header'; // Import Header component
import { ThemeProvider } from './components/ThemeContext';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <ThemeProvider>
      <Provider store={store}>
        <NavigationContainer>

          <Stack.Navigator initialRouteName="">
            <Stack.Screen
              name="Login"
              component={() => <Login onLogin={handleLogin} />}
              options={{
                header: ({ navigation }) => (
                  <Header
                    isLoggedIn={isLoggedIn}
                    onLogout={() => {
                      handleLogout();
                      navigation.navigate('Login');
                    }}
                  />
                ),
              }}
            />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={{
                header: ({ navigation }) => (
                  <Header
                    isLoggedIn={isLoggedIn}
                    onLogout={() => {
                      handleLogout();
                      navigation.navigate('Login');
                    }}
                  />
                ),
              }}
            />
            <Stack.Screen
              name="FavoritesList"
              component={FavoritesList}
              options={{
                header: ({ navigation }) => (
                  <Header
                    isLoggedIn={isLoggedIn}
                    onLogout={() => {
                      handleLogout();
                      navigation.navigate('Login');
                    }}
                  />
                ),
              }}
            />
        

            <Stack.Screen name="StockChart" component={StockChart}
              options={{
                header: ({ navigation }) => (
                  <Header
                    isLoggedIn={isLoggedIn}
                    onLogout={() => {
                      handleLogout();
                      navigation.navigate('Login');
                    }}
                  />
                ),
              }} />

          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
