import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StockList from './StockList';
import { useTheme } from '../ThemeContext';

const Dashboard = () => {
  const { themeStyles } = useTheme();

  return (
    <View style={[styles.entire, themeStyles]}>
      <View style={styles.dashboardContainer}>
        <Text style={styles.dashboardTitle}>Explore</Text>
        <StockList />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  entire: {
    backgroundColor: '#F0F0F0', // Placeholder for background color
    color: '#333', // Placeholder for text color
    flex: 1,
  },
  dashboardContainer: {
    maxWidth: 800,
    margin: 'auto',
    padding: 20,
    backgroundColor: '#FFFFFF', // Placeholder for background color
    color: '#333', // Placeholder for text color
  },
  dashboardTitle: {
    fontSize: 24,
    marginBottom: 20,
    color: '#007BFF', // Placeholder for text color
  },
});

export default Dashboard;
