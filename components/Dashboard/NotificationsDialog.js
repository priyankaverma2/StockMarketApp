import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotificationsDialog = () => {
  // Customize the content of your notifications
  const notifications = [
    'Check new stocks',
    'Win exciting prizes',
    'Latest raise and fall',
  ];

  return (
    <View style={styles.notificationsDialog}>
      <Text style={styles.title}>Notifications</Text>
      <View style={styles.notificationList}>
        {notifications.map((notification, index) => (
          <Text key={index} style={styles.notificationItem}>
            {notification}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  notificationsDialog: {
    position: 'absolute',
    top: '15%',
    left: '50%',
    width: '40%',
    transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
    backgroundColor: '#d7cde0',
    color: 'black',
    border: 1,
    borderColor: '#ccc',
    padding: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  notificationList: {
    padding: 0,
    margin: 0,
  },
  notificationItem: {
    marginBottom: 5,
    fontSize: 16,
  },
  // Add more styles as needed
});

export default NotificationsDialog;
