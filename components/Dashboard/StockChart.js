import React, { useEffect, useState } from 'react';
import { View, Text, Picker, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../ThemeContext';
import { LineChart } from 'react-native-chart-kit';
import Loader from './Loader';
import stockService from '../../services/stockService';
import { useRoute } from '@react-navigation/native';

const StockChart = () => {
  const route = useRoute();
  const symbol = route.params?.symbol;
  const { themeStyles } = useTheme();
  const [dates, setDates] = useState([]);
  const [selectedParam, setSelectedParam] = useState('Net Income');
  const [chartData, setChartData] = useState([]);
  const [stockData, setStockData] = useState();

  const fetchStockData = async () => {
    try {
      console.log('Fetching stock data for symbol:', symbol);
      const data = await stockService.getStockDataBySymbol(symbol);
      console.log('Fetched stock data:', data);
      setStockData(data);
    } catch (error) {
      console.error(`Error fetching stock chart data for ${symbol}:`, error);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        let data;
        switch (selectedParam) {
          case 'Net Income':
            data = await stockService.getStockCashFlow(symbol);
            console.log('Fetched Net Income data:', data);
            setChartData(data.map((entry) => entry.netIncome));
            break;
          case 'Cash Flow':
            data = await stockService.getStockCashFlow(symbol);
            console.log('Fetched Cash Flow data:', data);
            setChartData(data.map((entry) => entry.cashFlow));
            break;
          // Add cases for other parameters
          default:
            break;
        }
        if (data) {
          setDates(data.map((entry) => entry.fiscalDate));
        }
      } catch (error) {
        console.error(`Error fetching ${selectedParam} data:`, error);
      }
    };

    fetchDataFromApi();
  }, [symbol, selectedParam]);

  if (!stockData) {
    return <Loader />;
  }

  return (
    <View style={[styles.chartEntire, themeStyles]}>
      <View style={styles.stockChartContainer}>
        <Text>Explore about {stockData.symbol}</Text>
        <View style={styles.stockInfo}>
          <Text style={styles.paramSelectorLabel}>Select Parameter:</Text>
          <Picker
            selectedValue={selectedParam}
            style={styles.paramSelector}
            onValueChange={(itemValue) => setSelectedParam(itemValue)}
          >
            <Picker.Item label="Net Income" value="Net Income" />
            <Picker.Item label="Cash Flow" value="Cash Flow" />
          </Picker>
          {dates.length === 0 ? (
            <Text>--- no data found for graphical visuals ---</Text>
          ) : (
            <LineChart
              data={{
                labels: dates,
                datasets: [{ data: chartData }],
              }}
              width={Dimensions.get('window').width - 40}
              height={200}
              yAxisLabel="$"
              chartConfig={{
                backgroundGradientFrom: 'white',
                backgroundGradientTo: 'white',
                color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: { borderRadius: 16 },
              }}
              bezier
              style={{ marginVertical: 8, borderRadius: 16 }}
              withVerticalLines={false} 
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartEntire: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  stockChartContainer: {
    maxWidth: 1200,
    margin: 0,
    padding: 20,
    height: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  stockInfo: {
    flexDirection: 'column',
    paddingVertical: 20,
  },
  paramSelectorLabel: {
    marginTop: 10,
    fontSize: 18,
  },
  paramSelector: {
    padding: 8,
    fontSize: 16,
    maxWidth: 200,
  },
});

export default StockChart;
