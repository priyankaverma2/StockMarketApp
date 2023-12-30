import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import StockCard from './StockCard';
import stockService from '../../services/stockService';
import { addToFavorites, removeFromFavorites } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../ThemeContext';
import Loader from './Loader';

const StockList = () => {
  const { themeStyles } = useTheme();
  const [symbols, setSymbols] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const stocksPerPage = 10;
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state);

  useEffect(() => {
    // Fetch stock symbols
    stockService
      .getStockSymbols()
      .then((symbols) => {
        setSymbols(symbols);
        setSearchResults(symbols); // Set initial search results to all symbols
      })
      .catch((error) => console.error('Error fetching stock symbols:', error));
  }, []);

  if (!symbols || symbols.length === 0) {
    return <Loader />;
  }

  const indexOfLastStock = currentPage * stocksPerPage;
  const indexOfFirstStock = indexOfLastStock - stocksPerPage;
  const currentStocks = searchResults.slice(indexOfFirstStock, indexOfLastStock);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchClick = () => {
    // Trigger the search when the button is clicked
    // Perform the search logic here
    const results = symbols.filter((symbol) =>
      symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  const deleteStockFromFavorites = (symbolToDelete) => {
    dispatch(removeFromFavorites(symbolToDelete));
  };

  const saveStockDataToFavorites = async (symbol) => {
    try {
      const stockDataResponse = await stockService.getStockDataBySymbol(symbol);
      const { symbol: stockSymbol, companyName, latestPrice } = stockDataResponse;
      const isSymbolInFavorites = favorites.some((fav) => fav.symbol === stockSymbol);

      if (!isSymbolInFavorites) {
        dispatch(addToFavorites({ symbol: stockSymbol, companyName, latestPrice }));
      } else {
        console.warn(`${stockSymbol} is already in favorites.`);
      }
    } catch (error) {
      console.error('Error saving stock data to favorites:', error);
    }
  };

  return (
    <View style={[styles.stockListContainer, themeStyles]}>
      <View style={styles.dashboardSearch}>
        <TextInput
          style={styles.dashboardSearchInput}
          placeholder="Search stocks..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <TouchableOpacity
          style={styles.dashboardFilterButton}
          onPress={handleSearchClick}
        >
          <Text style={{ color: '#ffffff' }}>Search</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.stockListStockCards}>
        {currentStocks.map((symbol) => (
          <StockCard
            key={symbol}
            symbol={symbol}
            onDelete={() => deleteStockFromFavorites(symbol)}
            onSave={() => saveStockDataToFavorites(symbol)}
          />
        ))}
      </ScrollView>

      <View style={styles.stockListPagination}>
        <TouchableOpacity
          onPress={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          style={styles.stockListPageButton}
        >
          <Text style={{ color: '#ffffff' }}>Previous</Text>
        </TouchableOpacity>
        <Text style={styles.stockListPageInfo}>Page {currentPage}</Text>
        <TouchableOpacity
          onPress={() => paginate(currentPage + 1)}
          disabled={indexOfLastStock >= searchResults.length}
          style={styles.stockListPageButton}
        >
          <Text style={{ color: '#ffffff' }}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stockListContainer: {
    flex: 1,
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  stockListStockCards: {
    marginVertical: 10,
  },
  stockListPagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  stockListPageButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 4,
    marginHorizontal: 10,
  },
  stockListPageInfo: {
    fontSize: 18,
    color: 'black',
  },
  dashboardSearch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dashboardSearchInput: {
    flex: 1,
    padding: 8,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginBottom: 10,
  },
  dashboardFilterButton: {
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 4,
    marginLeft: 10,
    marginBottom: 6,
  },
});

export default StockList;
