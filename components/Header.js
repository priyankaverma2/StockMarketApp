import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from '@react-navigation/native';
import { useTheme } from './ThemeContext';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { MdWbSunny, MdOutlineWbSunny } from 'react-icons/md';
import NotificationsDialog from './Dashboard/NotificationsDialog';

const Header = ({ isLoggedIn, onLogout }) => {
  const { isDarkTheme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <View style={styles.header}>
      <View style={styles.nav}>
        <Text style={styles.h3}>Stocks</Text>
        <View style={styles.navItems}>
          {isLoggedIn ? (
            <>
              <TouchableOpacity>
                <Link to="/Dashboard"><Text style={styles.h3}>Home</Text></Link>
              </TouchableOpacity>
              <TouchableOpacity>
                <Link to="/FavoritesList"><Text style={styles.h3}>Saved</Text></Link>
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={handleNotificationClick}>
                <View style={styles.notificationIcon}>
                <Text>bell</Text>
                 
                  {showNotifications && <NotificationsDialog />}
                </View>
              </TouchableOpacity> */}
              {/* <TouchableOpacity onPress={toggleTheme}>
                <Button >
                  {isDarkTheme ? 'Dark' : 'light'}
                </Button>
              </TouchableOpacity> */}
              <TouchableOpacity>
                <Button onPress={onLogout}>Logout</Button>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {/* <TouchableOpacity>
                <Button onPress={toggleTheme}>
                  {isDarkTheme ? 'Dark' : 'light'}
                </Button>
              </TouchableOpacity> */}
              {/* <TouchableOpacity>
                <Link to="/Register"><Text style={styles.h3}>SignUp</Text></Link>
              </TouchableOpacity> */}
            </>
          )}
        </View>
      </View>
    </View>
  );
};

const Button = ({ onPress, children }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.buttonText}>{children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#333',
    padding: 10,
    textAlign: 'center',
    width: '100%',
    height: 70,
    color: 'white',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: 1200,
    margin: 'auto',
  },
  h3: {
    color: 'white',
    marginTop: 15,
  },
  navItems: {
    color: 'white',
    flexDirection: 'row',
  },
  notificationIcon: {
    color: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#d9534f',
    color: 'white',
    padding: 8,
    borderRadius: 4,
    cursor: 'pointer',
    marginTop: -5,
    marginHorizontal: 10,
    transition: 'background-color 0.3s ease',
  },
  buttonText: {
    color: 'white',
  },
});

export default Header;
