import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

const ViewFeedbackScreen = () => {
  const [averageRatings, setAverageRatings] = useState({});
  const [ratingsFetched, setRatingsFetched] = useState(false);

  useEffect(() => {
    const apiUrl = 'http://192.168.80.21:3000';

    axios
      .get(`${apiUrl}/ratings`)
      .then((response) => {
        const ratings = response.data.ratings;
        console.log('Successfully fetched ratings');
        console.log(ratings);

        // Calculate average ratings
        const calculatedAverages = calculateAverageRatings(ratings);
        setAverageRatings(calculatedAverages);

        // Set ratingsFetched to true after ratings are fetched
        setRatingsFetched(true);
      })
      .catch((error) => {
        console.log('Error fetching ratings', error);
      });
  }, []);

  const calculateAverageRatings = (ratings) => {
    const ratingsByFoodItem = {};

    ratings.forEach((rating) => {
      const { FoodItem, Rating } = rating;

      if (!ratingsByFoodItem[FoodItem]) {
        ratingsByFoodItem[FoodItem] = {
          totalRating: 0,
          count: 0,
        };
      }

      ratingsByFoodItem[FoodItem].totalRating += Rating;
      ratingsByFoodItem[FoodItem].count += 1;
    });

    const calculatedAverages = {};

    for (const foodItem in ratingsByFoodItem) {
      calculatedAverages[foodItem] =
        ratingsByFoodItem[foodItem].totalRating /
        ratingsByFoodItem[foodItem].count;
    }

    return calculatedAverages;
  };

  return (
    <View>
      {ratingsFetched ? (
        <View>
          {Object.keys(averageRatings).map((foodItem) => (
            <View key={foodItem} style={styles.ratingBox}>
              <Text style={styles.ratingItem}>{foodItem}</Text>
              <Text style={styles.ratingValue}>{averageRatings[foodItem]}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text>Loading ratings...</Text>
      )}
    </View>
  );
};

const styles = {
  ratingBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    margin: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  ratingItem: {
    fontWeight: 'bold',
  },
  ratingValue: {
    fontSize: 16, // Adjust the font size as needed
  },
};

export default ViewFeedbackScreen;
