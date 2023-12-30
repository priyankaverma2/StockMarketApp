import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import stockService from '../../services/stockService';
import Loader from './Loader';

const StockCard = ({ symbol, onSave, onDelete }) => {
  const [stockData, setStockData] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const navigation = useNavigation();

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

  const getLatestPriceColor = () => {
    return stockData ? '#00ab41' : 'black';
  };

  const handleSaveToggle = () => {
    setIsSaved((prevState) => !prevState);

    if (!isSaved) {
      onSave(symbol);
    } else {
      onDelete(symbol);
    }
  };

  return (
    <View style={styles.stockCard}>
      {stockData ? (
        <TouchableOpacity
          onPress={() => navigation.navigate('StockChart', { symbol })}
          style={styles.stockLink}
        >
          <Text>{symbol}{'     '}
            <Text style={{ color: getLatestPriceColor() }}>${stockData.latestPrice}</Text>
          </Text>
          <Text>{stockData.companyName}</Text>
        </TouchableOpacity>
      ) : (
        <Loader />
      )}

      <View style={styles.stockButtons}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveToggle}
        >
          <Text>{isSaved ? 'Delete' : 'Save'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stockCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  stockLink: {
    flex: 1,
    fontSize: 16,
  },
  stockButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  saveButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    borderRadius: 4,
    backgroundColor: '#3498db',
  },
});

export default StockCard;
