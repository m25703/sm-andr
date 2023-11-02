import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DashboardScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const _retrieveData = async () => {
    try {
      const user = await AsyncStorage.getItem('userInfo');
      if (user !== null) {
        setUserInfo(user);
        setIsLoggedIn(true);
      }
      console.log(userInfo);
      console.log(isLoggedIn)
    } catch (error) {
      console.error('Error retrieving user info:', error);
    }
  };
  useEffect(() => {
    _retrieveData();
  }, []);

  const days = {
    Monday: {
      Breakfast: [
        'Poha',
        'Sev / Namkeen',
        'Boiled Sweet Corn',
        'Omelette',
        'Banana',
        'Corn Flakes',
        'BBJ / Pickle',
        'Coffee / Bournvita / Milk',
      ],
      Lunch: [
        'Lemon Rice',
        'Plain Rice',
        'Moong Dal',
        'Rasam',
        'Torai Chana Dry',
        'Chole Masala',
        'Plain Roti / Fulka Roti',
        'Buttermilk',
        'Green Chilli / Lemon Slices',
        'Salad / Papad / Pickle',
      ],
      Snacks: [
        'Vada Pav',
        'Green Chutney & Dry Red Chutney',
        'Banana',
        'BBJ / Tea / Coffee',
      ],
      Dinner: [
        'Plain Rice',
        'Mix Dal',
        'Black Channa Masala Dry',
        'Aloo Rasewalla',
        'Poori',
        'Green Chilli / Lemon Slices',
        'Salad / Papad / Pickle',
        'Kheer',
      ],
    },
    Tuesday: {
      Breakfast: [
        'Upma / Sheera',
        'Coconut Chutney',
        'Boiled Peanuts',
        'Boiled Egg',
        'Banana',
        'Corn Flakes',
        'BBJ / Pickle',
        'Coffee / Bournvita / Milk',
      ],
      Lunch: [
        'Onion Fried Rice',
        'Plain Rice',
        'Arhar Dal',
        'Sambhar',
        'Moong Masala Dry',
        'Gobi Mutter Rasewalla',
        'Plain Roti / Butter Roti',
        'Buttermilk',
        'Green Chilli / Lemon Slices',
        'Salad / Papad / Pickle',
      ],
      Snacks: ['Dahi Wada', 'Banana', 'BBJ / Tea / Coffee'],
      Dinner: [
        'Corn Rice',
        'Plain Rice',
        'Moong Dal',
        'Paneer Kohlapuri',
        'Plain Roti / Fulka Roti',
        'Green Chilli / Lemon Slices',
        'Salad / Papad / Pickle',
        'Gulab Jamun',
      ],
    },
    Wednesday: {
      Breakfast: [
        'Methi Paratha',
        'Veg Korma',
        'Channa Masala',
        'Egg Bhurji',
        'Banana',
        'Corn Flakes',
        'BBJ / Pickle',
        'Coffee / Bournvita / Milk',
      ],
      Lunch: [
        'Curd Rice',
        'Plain Rice',
        'Masoor Dal',
        'Rasam',
        'Cabbage Capsicum Dry',
        'Manchurian Gravy',
        'Plain Roti / Butter Roti',
        'Lassi',
        'Green Chilli / Lemon Slices',
        'Salad / Papad / Pickle',
      ],
      Snacks: ['Veg Cutlet', 'Red Chutney', 'Banana', 'BBJ / Tea / Coffee'],
      Dinner: [
        'Plain Rice',
        'Dal Tadka',
        'Kashmiri Dum Aloo',
        'Chawali Masala',
        'Plain Roti / Fulka Roti',
        'Green Chilli / Lemon Slices',
        'Salad / Papad / Pickle',
        'Ice Cream / Kulfi',
      ],
    },
    Thursday: {
      Breakfast: [
        'Idli Vada',
        'Sambar / Chutney',
        'Black Channa Sprouts',
        'Boiled Egg',
        'Banana',
        'Corn Flakes',
        'BBJ / Pickle',
        'Coffee / Bournvita / Milk',
      ],
      Lunch: [
        'Lemon Rice',
        'Plain Rice',
        'Dal Palak',
        'Sambhar',
        'Bhindi Fry',
        'Soya Chunks Masala Dry',
        'Plain Roti / Butter Roti',
        'Curd',
        'Green Chilli / Lemon Slices',
        'Salad / Papad / Pickle',
      ],
      Snacks: [
        'Pav Bhaji',
        'Chopped Onion & Lemon',
        'Banana',
        'BBJ / Tea / Coffee',
      ],
      Dinner: [
        'Plain Rice',
        'Jeera Rice',
        'Dal Tadka',
        'Paneer Chilli',
        'Plain Roti / Fulka Roti',
        'Green Chilli / Lemon Slices',
        'Salad / Papad / Pickle',
        'Moong Dal Halwa',
      ],
    },
    Friday: {
      Breakfast: [
        'Poori',
        'Chole',
        'Green Moong Sprouts',
        'Banana',
        'Corn Flakes',
        'BBJ / Pickle',
        'Coffee / Bournvita / Milk',
      ],
      Lunch: [
        'Veg Biryani',
        'Egg Biryani',
        'Veg Raita',
        'Mix Veg Curry',
        'Plain Roti / Fulka Roti',
        'Rasna',
        'Green Chilli / Lemon Slices',
        'Salad / Papad / Pickle',
      ],
      Snacks: ['Veg Maggi', 'Banana', 'BBJ / Tea / Coffee'],
      Dinner: [
        'Tomato Rice',
        'Plain Rice',
        'Mix Dal',
        'Mushroom Masala',
        'Rajma Masala',
        'Plain Roti / Fulka Roti',
        'Green Chilli / Lemon Slices',
        'Salad / Papad / Pickle',
        'Fruit Custard',
      ],
    },
    Saturday: {
      Breakfast: [
        'Masala Dosa',
        'Sambar / Chutney',
        'Matki Sprouts',
        'Boiled Egg',
        'Banana',
        'Corn Flakes',
        'BBJ / Pickle',
        'Coffee / Bournvita / Milk',
      ],
      Lunch: [
        'Jeera Rice',
        'Dal Tadka',
        'Sambhar',
        'Gawar Masala Dry',
        'Aloo Mutter',
        'Plain Roti / Butter Roti',
        'Buttermilk',
        'Green Chilli / Lemon Slices',
        'Salad / Papad / Pickle',
      ],
      Snacks: [
        'Samosa',
        'Green Chilli & Red Chutney',
        'Banana',
        'BBJ / Tea / Coffee',
      ],
      Dinner: [
        'Onion Masala Rice',
        'Plain Rice',
        'Dal Panchratna',
        'Matki Masala Dry',
        'Veg Kadhai Gravy',
        'Plain Roti / Fulka Roti',
        'Green Chilli / Lemon Slices',
        'Salad / Papad / Pickle',
        'Ice Cream',
      ],
    },
    Sunday: {
      Breakfast: [
        'Aloo Paratha',
        'Curd',
        'Green Moong Sprouts',
        'Banana',
        'Corn Flakes',
        'BBJ / Pickle',
        'Coffee / Bournvita / Milk',
      ],
      Lunch: [
        'Plain Rice',
        'Toor Dal',
        'Egg Curry',
        'Paneer Tawa Masala',
        'Plain Roti / Butter Roti',
        'Mango Rasna',
        'Green Chilli / Lemon Slices',
        'Salad / Papad / Pickle',
      ],
      Snacks: ['Pakoda', 'Green Chutney', 'Banana', 'BBJ / Tea / Coffee'],
      Dinner: [
        'Veg Pulao',
        'Raita',
        'Green Chawli Subzi',
        'Mix Veg Curry',
        'Plain Roti / Fulka Roti',
        'Green Chilli / Lemon Slices',
        'Salad / Papad / Pickle',
        'Kala Jamun',
      ],
    },
  };

  const [ser, setSer] = useState('');
  const reqDate = new Date();
  console.log(reqDate.toLocaleTimeString());
  useEffect(() => {}, []);

  function getMealTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    if (hours >= 7 && hours < 10) {
      setSer('Breakfast');
    } else if (hours >= 12 && hours < 15) {
      setSer('Lunch');
    } else if (hours >= 16 && hours < 18) {
      setSer('Snacks');
    } else if (hours >= 19 && hours < 21) {
      setSer('Dinner');
    } else {
      setSer('');
    }
  }

  useEffect(() => {
    getMealTime();
    const interval = setInterval(() => {
      getMealTime();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  console.log(`It's currently ${ser} time.`);

  const getCurrentDayMenu = () => {
    const currentDayIndex = new Date().getDay();
    const currentDayName = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ][currentDayIndex];
    return days[currentDayName];
  };

  const MealBox = ({ mealType, items, bgColor, textColor }) => {
    return (
      <View style={[styles.container, { backgroundColor: bgColor }]}>
        <View style={styles.titleContainer}>
          {/* <Icon name="cutlery" size={24} color="white" /> Replace with the appropriate knife and fork icon */}
          <Text style={[styles.title, { color: textColor }]}>{mealType}</Text>
        </View>
        
        <FlatList
  data={items}
  keyExtractor={(item, index) => `${mealType}-${index}`}
  renderItem={({ item }) => (
    <Text style={[styles.item, { color: textColor }]}>{item}</Text>
  )}
/>

      </View>
    );
  };  

  const currentDayMenu = getCurrentDayMenu();
  // console.log(currentDayMenu);

  return (
    <View style={styles.pageContainer}>
      <MealBox mealType="Breakfast" items={currentDayMenu.Breakfast} bgColor="#D1E9FC" textColor="#3E548E"/>
      <MealBox mealType="Lunch" items={currentDayMenu.Lunch} bgColor="#E9FCD4" textColor="#479044"/>
      <MealBox mealType="Snacks" items={currentDayMenu.Snacks} bgColor="#FFF7CD" textColor="#A68745"/>
      <MealBox mealType="Dinner" items={currentDayMenu.Dinner} bgColor="#FFE7D9" textColor="#9F495D"/>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  container: {
    backgroundColor: '#F9FAFB',
    padding: 10,
    margin: 10,
    width: '80%',
    alignContent: 'center',
    alignItems: 'center',
    // alignSelf: 'center',
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  item: {
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    margin: 1,
    fontSize: 14,
  },
});


export default DashboardScreen;