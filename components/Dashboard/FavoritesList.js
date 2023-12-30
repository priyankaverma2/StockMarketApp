import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Favorites from './Favorites';
import stockService from '../../services/stockService';
import { removeFromFavorites } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../ThemeContext';

const FavoritesList = () => {
  const { themeStyles } = useTheme();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state);

  const deleteStockFromFavorites = async (symbolToDelete) => {
    try {
      // Dispatch the action to remove favorite from Redux state
      dispatch(removeFromFavorites(symbolToDelete));
    } catch (error) {
      console.error('Error deleting stock data from favorites:', error);
    }
  };

  const handleFetchStockData = (symbol) => {
    console.log(symbol);
    stockService
      .getStockDataBySymbol(symbol)
      .then((data) => {
        console.log(data);
      })
      .catch((error) =>
        console.error(`Error fetching stock data for ${symbol}:`, error)
      );
  };

  return (
    <View style={[styles.favEntire, themeStyles]}>
      <View style={styles.favoritesListContainer}>
        {favorites && favorites.length === 0 ? (
          <Text>No favorites found</Text>
        ) : (
          <ScrollView style={styles.favoritesList}>
            {favorites.map((symbol) => (
              <Favorites
                key={symbol.symbol}
                symbol={symbol.symbol}
                onClick={() => handleFetchStockData(symbol.symbol)}
                onDelete={() => deleteStockFromFavorites(symbol.symbol)}
              />
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  favEntire: {
    flex: 1,
    backgroundColor: '#ffffff', // Specify your background color
    paddingVertical: 5,
  },
  favoritesListContainer: {
    maxWidth: 800,
    margin: 40,
    padding: 20,
    backgroundColor: '#ffffff', // Specify your background color
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  favoritesList: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 5,
  },
});


export default FavoritesList;
