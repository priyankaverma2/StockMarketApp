import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import stockService from '../../services/stockService';
import Loader from './Loader';
import { useTheme } from '../ThemeContext';

const Favorites = ({ symbol, onDelete }) => {
  const [stockData, setStockData] = useState(null);

  const { themeStyles } = useTheme();

  const getLatestPriceColor = () => {
    if (stockData) {
      return '#00ab41';
    }
    return 'black';
  };

  useEffect(() => {
    const fetchDataForSymbol = async () => {
      try {
        const data = await stockService.getStockDataBySymbol(symbol);
        setStockData(data);
      } catch (error) {
        console.error(`Error fetching stock data for ${symbol}:`, error);
      }
    };

    fetchDataForSymbol();
  }, [symbol]);

  return (
    <View style={[styles.stockCard, themeStyles]}>
      {stockData ? (
        <TouchableOpacity onPress={() => navigation.navigate('StockChart', { symbol })} style={styles.stockLink}>
          <Text style={{ color: getLatestPriceColor() }}>${stockData.latestPrice}</Text>
          <Text>{symbol}</Text>
          <Text>{stockData.companyName}</Text>
        </TouchableOpacity>
      ) : (
        <Loader />
      )}
      <View style={styles.stockButtons}>
        <TouchableOpacity onPress={() => onDelete(symbol)} style={styles.deleteButton}>
          <Text style={{ color: '#fff' }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stockCard: {
    border: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Specify your background color
    color: '#000000', // Specify your text color
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  stockLink: {
    padding: 10,
    textDecorationLine: 'none',
  },
  stockButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 4,
    marginLeft: 10,
  },
});

export default Favorites;
