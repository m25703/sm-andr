import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const OngoingMealScreen = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const _retrieveData = async () => {
    try {
      const data = await AsyncStorage.getItem('isLoggedIn');
      if (data !== null) {
        setIsLoggedIn(JSON.parse(data)); 
      }
      const user = await AsyncStorage.getItem('userInfo');
      const userInfoString = await AsyncStorage.getItem('userInfo');
      if (userInfoString !== null) {
        const userInfo = JSON.parse(userInfoString);
        setUserInfo(userInfo);
      }
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
        { Name: "POHA", Image: null },
        { Name: "SEV / NAMKEEN", Image: null },
        { Name: "BOILED SWEET CORN", Image: null },
        { Name: "OMELETTE", Image: null },
        { Name: "BANANA", Image: null },
        { Name: "CORN FLAKES", Image: null },
        { Name: "BBJ / PICKLE", Image: null },
        { Name: "COFFEE", Image: null },
        { Name: "BOURNVITA", Image: null },
        { Name: "MILK", Image: null },
      ],
      Lunch: [
        {
          Name: "LEMON RICE",
          Image:
            "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/12/jeera-rice-recipe.jpg",
        },
        {
          Name: "PLAIN RICE",
          Image:
            "https://static01.nyt.com/images/2018/02/21/dining/00RICEGUIDE8/00RICEGUIDE8-master768.jpg?w=1280&q=75",
        },

        {
          Name: "MOONG DAL",
          Image:
            "https://holycowvegan.net/wp-content/uploads/2020/12/panchmel-dal-panchratan-dahl-1-500x375.jpg",
        },
        { Name: "RASAM", Image: null },
        { Name: "TORAI CHANA DRY", Image: null },
        {
          Name: "CHOLE MASALA",
          Image:
            "https://www.vegrecipesofindia.com/wp-content/uploads/2021/04/kala-chana-recipe-1.jpg",
        },
        {
          Name: "PLAIN ROTI / FULKA ROTI",
          Image:
            "https://i.pinimg.com/736x/00/ff/79/00ff79c11627274d94d631b7d10ec8b6.jpg",
        },
        {
          Name: "BUTTERMILK",
          Image:
            "https://www.cookwithmanali.com/wp-content/uploads/2017/06/Masala-Chaas-Recipe.jpg",
        },
        { Name: "GREEN CHILLI / LEMON SLICES", Image: null },
        { Name: "SALAD / PAPAD / PICKLE", Image: null },
      ],
      Snacks: [
        { Name: "VADA PAV", Image: "https://sameeraskitchen.files.wordpress.com/2023/04/screenshot_20210615-193507__01-2.jpg" },
        {
          Name: "GREEN CHUTNEY & DRY RED CHUTNEY",
          Image:
            "https://aartimadan.com/wp-content/uploads/2020/09/Red-Green-Chutney.jpg",
        },
        { Name: "BANANA", Image: null },
        {
          Name: "BBJ",
          Image:
            "https://iamamitava.files.wordpress.com/2009/07/clx0606cook39dg-de.jpg",
        },

        {
          Name: "TEA",
          Image:
            "https://www.thesun.co.uk/wp-content/uploads/2016/09/nintchdbpict000247428630.jpg",
        },
        {
          Name: "COFFEE",
          Image:
            "https://www.tasteofhome.com/wp-content/uploads/2018/01/Honey-Coffee_EXPS_CISMZ19_37409_E01_08_-4b.jpg",
        },
      ],
      Dinner: [
        {
          Name: "PLAIN RICE",
          Image:
            "https://static01.nyt.com/images/2018/02/21/dining/00RICEGUIDE8/00RICEGUIDE8-master768.jpg?w=1280&q=75",
        },

        {
          Name: "MIX DAL",
          Image:
            "https://geekrobocook.com/wp-content/uploads/2021/03/39.-Punjab-Style-Mixed-Dal.jpg",
        },
        { Name: "BLACK CHANNA MASALA DRY", Image: null },
        { Name: "ALOO RASEWALLA", Image: null },
        { Name: "POORI", Image: null },
        { Name: "GREEN CHILLI / LEMON SLICES", Image: null },
        { Name: "SALAD / PAPAD / PICKLE", Image: null },
        { Name: "KHEER", Image: null },
      ],
    },
    Tuesday: {
      Breakfast: [
        { Name: "UPMA / SHEERA", Image: null },
        { Name: "COCONUT CHUTNEY", Image: null },
        { Name: "BOILED PEANUTS", Image: null },
        { Name: "BOILED EGG", Image: null },
        { Name: "BANANA", Image: null },
        { Name: "CORN FLAKES", Image: null },
        { Name: "BBJ / PICKLE", Image: null },
        { Name: "COFFEE", Image: null },
        { Name: "BOURNVITA", Image: null },
        { Name: "MILK", Image: null },
      ],
      Lunch: [
        { Name: "ONION FRIED RICE", Image: null },
        {
          Name: "PLAIN RICE",
          Image:
            "https://static01.nyt.com/images/2018/02/21/dining/00RICEGUIDE8/00RICEGUIDE8-master768.jpg?w=1280&q=75",
        },

        {
          Name: "ARHAR DAL",
          Image:
            "https://holycowvegan.net/wp-content/uploads/2020/12/panchmel-dal-panchratan-dahl-1-500x375.jpg",
        },
        { Name: "SAMBHAR", Image: null },
        {
          Name: "MOONG MASALA DRY",
          Image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfVb-ZikkR0r43H5SkRB8UE3cXosfhJ5r5ZQlA1995-Q&s",
        },
        { Name: "GOBI MUTTER RASEWALLA", Image: null },
        {
          Name: "PLAIN ROTI / BUTTER ROTI",
          Image:
            "https://i.pinimg.com/736x/00/ff/79/00ff79c11627274d94d631b7d10ec8b6.jpg",
        },
        {
          Name: "BUTTERMILK",
          Image:
            "https://www.cookwithmanali.com/wp-content/uploads/2017/06/Masala-Chaas-Recipe.jpg",
        },
        { Name: "GREEN CHILLI / LEMON SLICES", Image: null },
        { Name: "SALAD / PAPAD / PICKLE", Image: null },
      ],
      Snacks: [
        { Name: "DAHI WADA", Image: null },
        { Name: "BANANA", Image: null },
        {
          Name: "BBJ",
          Image:
            "https://iamamitava.files.wordpress.com/2009/07/clx0606cook39dg-de.jpg",
        },

        {
          Name: "TEA",
          Image:
            "https://www.thesun.co.uk/wp-content/uploads/2016/09/nintchdbpict000247428630.jpg",
        },
        {
          Name: "COFFEE",
          Image:
            "https://www.tasteofhome.com/wp-content/uploads/2018/01/Honey-Coffee_EXPS_CISMZ19_37409_E01_08_-4b.jpg",
        },
      ],
      Dinner: [
        { Name: "CORN RICE", Image: null },
        {
          Name: "PLAIN RICE",
          Image:
            "https://static01.nyt.com/images/2018/02/21/dining/00RICEGUIDE8/00RICEGUIDE8-master768.jpg?w=1280&q=75",
        },

        {
          Name: "MOONG DAL",
          Image:
            "https://holycowvegan.net/wp-content/uploads/2020/12/panchmel-dal-panchratan-dahl-1-500x375.jpg",
        },
        { Name: "PANEER KOHLAPURI", Image: null },
        {
          Name: "PLAIN ROTI / FULKA ROTI",
          Image:
            "https://i.pinimg.com/736x/00/ff/79/00ff79c11627274d94d631b7d10ec8b6.jpg",
        },

        { Name: "GREEN CHILLI / LEMON SLICES", Image: null },
        { Name: "SALAD / PAPAD / PICKLE", Image: null },
        { Name: "GULAB JAMUN", Image: null },
      ],
    },
    Wednesday: {
      Breakfast: [
        { Name: "METHI PARATHA", Image: null },
        { Name: "VEG KORMA", Image: null },
        { Name: "CHANNA MASALA", Image: null },
        { Name: "EGG BHURJI", Image: null },
        { Name: "BANANA", Image: null },
        { Name: "CORN FLAKES", Image: null },
        { Name: "BBJ / PICKLE", Image: null },
        { Name: "COFFEE", Image: null },
        { Name: "BOURNVITA", Image: null },
        { Name: "MILK", Image: null },
      ],
      Lunch: [
        { Name: "CURD RICE", Image: null },
        {
          Name: "PLAIN RICE",
          Image:
            "https://static01.nyt.com/images/2018/02/21/dining/00RICEGUIDE8/00RICEGUIDE8-master768.jpg?w=1280&q=75",
        },

        {
          Name: "MASOOR DAL",
          Image:
            "https://holycowvegan.net/wp-content/uploads/2020/12/panchmel-dal-panchratan-dahl-1-500x375.jpg",
        },
        { Name: "RASAM", Image: null },
        { Name: "CABBAGE CAPSICUM DRY", Image: null },
        { Name: "MANCHURIAN GRAVY", Image: null },
        {
          Name: "PLAIN ROTI / BUTTER ROTI",
          Image:
            "https://i.pinimg.com/736x/00/ff/79/00ff79c11627274d94d631b7d10ec8b6.jpg",
        },
        { Name: "LASSI", Image: null },
        { Name: "GREEN CHILLI / LEMON SLICES", Image: null },
        { Name: "SALAD / PAPAD / PICKLE", Image: null },
      ],
      Snacks: [
        { Name: "VEG CUTLET", Image: null },
        { Name: "RED CHUTNEY", Image: null },
        { Name: "BANANA", Image: null },
        {
          Name: "BBJ",
          Image:
            "https://iamamitava.files.wordpress.com/2009/07/clx0606cook39dg-de.jpg",
        },

        {
          Name: "TEA",
          Image:
            "https://www.thesun.co.uk/wp-content/uploads/2016/09/nintchdbpict000247428630.jpg",
        },
        {
          Name: "COFFEE",
          Image:
            "https://www.tasteofhome.com/wp-content/uploads/2018/01/Honey-Coffee_EXPS_CISMZ19_37409_E01_08_-4b.jpg",
        },
      ],
      Dinner: [
        {
          Name: "PLAIN RICE",
          Image:
            "https://static01.nyt.com/images/2018/02/21/dining/00RICEGUIDE8/00RICEGUIDE8-master768.jpg?w=1280&q=75",
        },

        {
          Name: "DAL TADKA",
          Image:
            "https://holycowvegan.net/wp-content/uploads/2020/12/panchmel-dal-panchratan-dahl-1-500x375.jpg",
        },
        { Name: "KASHMIRI DUM ALOO", Image: null },
        { Name: "CHAWALI MASALA", Image: null },
        {
          Name: "PLAIN ROTI / FULKA ROTI",
          Image:
            "https://i.pinimg.com/736x/00/ff/79/00ff79c11627274d94d631b7d10ec8b6.jpg",
        },

        { Name: "GREEN CHILLI / LEMON SLICES", Image: null },
        { Name: "SALAD / PAPAD / PICKLE", Image: null },
        { Name: "ICE CREAM / KULFI", Image: null },
      ],
    },
    Thursday: {
      Breakfast: [
        { Name: "IDLI VADA", Image: null },
        { Name: "SAMBAR / CHUTNEY", Image: null },
        { Name: "BLACK CHANNA SPROUTS", Image: null },
        { Name: "BOILED EGG", Image: null },
        { Name: "BANANA", Image: null },
        { Name: "CORN FLAKES", Image: null },
        { Name: "BBJ / PICKLE", Image: null },
        { Name: "COFFEE", Image: null },
        { Name: "BOURNVITA", Image: null },
        { Name: "MILK", Image: null },
      ],
      Lunch: [
        { Name: "LEMON RICE", Image: null },
        {
          Name: "PLAIN RICE",
          Image:
            "https://static01.nyt.com/images/2018/02/21/dining/00RICEGUIDE8/00RICEGUIDE8-master768.jpg?w=1280&q=75",
        },

        {
          Name: "DAL PALAK",
          Image:
            "https://holycowvegan.net/wp-content/uploads/2020/12/panchmel-dal-panchratan-dahl-1-500x375.jpg",
        },
        { Name: "SAMBHAR", Image: null },
        { Name: "BHINDI FRY", Image: null },
        { Name: "SOYA CHUNKS MASALA DRY", Image: null },
        {
          Name: "PLAIN ROTI / BUTTER ROTI",
          Image:
            "https://i.pinimg.com/736x/00/ff/79/00ff79c11627274d94d631b7d10ec8b6.jpg",
        },
        { Name: "CURD", Image: null },
        { Name: "GREEN CHILLI / LEMON SLICES", Image: null },
        { Name: "SALAD / PAPAD / PICKLE", Image: null },
      ],
      Snacks: [
        { Name: "PAV BHAJI", Image: null },
        { Name: "CHOPPED ONION & LEMON", Image: null },
        { Name: "BANANA", Image: null },
        {
          Name: "BBJ",
          Image:
            "https://iamamitava.files.wordpress.com/2009/07/clx0606cook39dg-de.jpg",
        },

        {
          Name: "TEA",
          Image:
            "https://www.thesun.co.uk/wp-content/uploads/2016/09/nintchdbpict000247428630.jpg",
        },
        {
          Name: "COFFEE",
          Image:
            "https://www.tasteofhome.com/wp-content/uploads/2018/01/Honey-Coffee_EXPS_CISMZ19_37409_E01_08_-4b.jpg",
        },
      ],
      Dinner: [
        {
          Name: "PLAIN RICE",
          Image:
            "https://static01.nyt.com/images/2018/02/21/dining/00RICEGUIDE8/00RICEGUIDE8-master768.jpg?w=1280&q=75",
        },

        {
          Name: "JEERA RICE",
          Image:
            "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/12/jeera-rice-recipe.jpg",
        },
        {
          Name: "DAL TADKA",
          Image:
            "https://holycowvegan.net/wp-content/uploads/2020/12/panchmel-dal-panchratan-dahl-1-500x375.jpg",
        },
        { Name: "PANEER CHILLI", Image: null },
        {
          Name: "PLAIN ROTI / FULKA ROTI",
          Image:
            "https://i.pinimg.com/736x/00/ff/79/00ff79c11627274d94d631b7d10ec8b6.jpg",
        },

        { Name: "GREEN CHILLI / LEMON SLICES", Image: null },
        { Name: "SALAD / PAPAD / PICKLE", Image: null },
        { Name: "MOONG DAL HALWA", Image: null },
      ],
    },
    Friday: {
      Breakfast: [
        { Name: "POORI", Image: null },
        {
          Name: "CHOLE",
          Image:
            "https://t4.ftcdn.net/jpg/03/94/99/83/360_F_394998333_oUSrAfdOXSJVUFk9RUWMkbhLtIhx1jQf.jpg",
        },
        {
          Name: "GREEN MOONG SPROUTS",
          Image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfVb-ZikkR0r43H5SkRB8UE3cXosfhJ5r5ZQlA1995-Q&s",
        },
        { Name: "BANANA", Image: null },
        { Name: "CORN FLAKES", Image: null },
        { Name: "BBJ / PICKLE", Image: null },
        { Name: "COFFEE", Image: null },
        { Name: "BOURNVITA", Image: null },
        { Name: "MILK", Image: null },
      ],
      Lunch: [
        {
          Name: "VEG BIRYANI",
          Image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6MUI3XcEDIRKd1YECj6DaL_7HXK5nRBr1eQ0CTkMrxA&s",
        },
        {
          Name: "EGG BIRYANI",
          Image:
            "https://vismaifood.com/storage/app/uploads/public/f14/664/f87/thumb__1200_0_0_0_auto.jpg",
        },
        { Name: "VEG RAITA", Image: null },
        { Name: "MIX VEG CURRY", Image: null },
        {
          Name: "PLAIN ROTI / FULKA ROTI",
          Image:
            "https://i.pinimg.com/736x/00/ff/79/00ff79c11627274d94d631b7d10ec8b6.jpg",
        },

        {
          Name: "RASNA",
          Image:
            "https://cpimg.tistatic.com/05951660/b/4/Instant-Nimbu-Pani-Lemonade-Premix-Powder.jpg",
        },
        { Name: "GREEN CHILLI / LEMON SLICES", Image: null },
        { Name: "SALAD / PAPAD / PICKLE", Image: null },
      ],
      Snacks: [
        {
          Name: "VEG MAGGI",
          Image:
            "https://vegecravings.com/wp-content/uploads/2020/01/Vegetable-Masala-Maggi-Recipe-Step-By-Step-Instructions-scaled.jpg",
        },
        { Name: "BANANA", Image: null },
        {
          Name: "BBJ",
          Image:
            "https://iamamitava.files.wordpress.com/2009/07/clx0606cook39dg-de.jpg",
        },

        {
          Name: "TEA",
          Image:
            "https://www.thesun.co.uk/wp-content/uploads/2016/09/nintchdbpict000247428630.jpg",
        },
        {
          Name: "COFFEE",
          Image:
            "https://www.tasteofhome.com/wp-content/uploads/2018/01/Honey-Coffee_EXPS_CISMZ19_37409_E01_08_-4b.jpg",
        },
      ],
      Dinner: [
        {
          Name: "TOMATO RICE",
          Image:
            "https://www.spiceupthecurry.com/wp-content/uploads/2019/06/tomato-rice-recipe-12.jpg",
        },
        {
          Name: "PLAIN RICE",
          Image:
            "https://static01.nyt.com/images/2018/02/21/dining/00RICEGUIDE8/00RICEGUIDE8-master768.jpg?w=1280&q=75",
        },

        {
          Name: "MIX DAL",
          Image:
            "https://geekrobocook.com/wp-content/uploads/2021/03/39.-Punjab-Style-Mixed-Dal.jpg",
        },
        {
          Name: "MUSHROOM MASALA",
          Image:
            "https://www.cookingcarnival.com/wp-content/uploads/2018/09/Mushroom-masala-4.jpg",
        },
        {
          Name: "RAJMA MASALA",
          Image:
            "https://www.vegrecipesofindia.com/wp-content/uploads/2021/05/rajma-recipe-2.jpg",
        },
        {
          Name: "PLAIN ROTI / FULKA ROTI",
          Image:
            "https://i.pinimg.com/736x/00/ff/79/00ff79c11627274d94d631b7d10ec8b6.jpg",
        },

        { Name: "GREEN CHILLI / LEMON SLICES", Image: null },
        { Name: "SALAD / PAPAD / PICKLE", Image: null },
        { Name: "FRUIT CUSTARD", Image: null },
      ],
    },
    Saturday: {
      Breakfast: [
        {
          Name: "MASALA DOSA",
          Image:
            "https://vismaifood.com/storage/app/uploads/public/8b4/19e/427/thumb__1200_0_0_0_auto.jpg",
        },
        { Name: "SAMBAR / CHUTNEY", Image: null },
        { Name: "MATKI SPROUTS", Image: null },
        { Name: "BOILED EGG", Image: null },
        { Name: "BANANA", Image: null },
        { Name: "CORN FLAKES", Image: null },
        { Name: "BBJ / PICKLE", Image: null },
        { Name: "COFFEE", Image: null },
        { Name: "BOURNVITA", Image: null },
        { Name: "MILK", Image: null },
      ],
      Lunch: [
        {
          Name: "JEERA RICE",
          Image:
            "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/12/jeera-rice-recipe.jpg",
        },
        {
          Name: "DAL TADKA",
          Image:
            "https://holycowvegan.net/wp-content/uploads/2020/12/panchmel-dal-panchratan-dahl-1-500x375.jpg",
        },
        { Name: "SAMBHAR", Image: null },
        {
          Name: "GAWAR MASALA DRY",
          Image:
            "https://i.pinimg.com/736x/57/5f/ad/575fad98e7fbceeb9d5facbaf42a86f0.jpg",
        },
        { Name: "ALOO MUTTER", Image: null },
        {
          Name: "PLAIN ROTI / BUTTER ROTI",
          Image:
            "https://i.pinimg.com/736x/00/ff/79/00ff79c11627274d94d631b7d10ec8b6.jpg",
        },
        {
          Name: "BUTTERMILK",
          Image:
            "https://www.cookwithmanali.com/wp-content/uploads/2017/06/Masala-Chaas-Recipe.jpg",
        },
        { Name: "GREEN CHILLI / LEMON SLICES", Image: null },
        { Name: "SALAD / PAPAD / PICKLE", Image: null },
      ],
      Snacks: [
        {
          Name: "SAMOSA",
          Image:
            "https://static.toiimg.com/thumb/61050397.cms?imgsize=246859&width=800&height=800",
        },
        {
          Name: "GREEN CHILLI & RED CHUTNEY",
          Image:
            "https://aartimadan.com/wp-content/uploads/2020/09/Red-Green-Chutney.jpg",
        },
        { Name: "BANANA", Image: null },
        {
          Name: "BBJ",
          Image:
            "https://iamamitava.files.wordpress.com/2009/07/clx0606cook39dg-de.jpg",
        },

        {
          Name: "TEA",
          Image:
            "https://www.thesun.co.uk/wp-content/uploads/2016/09/nintchdbpict000247428630.jpg",
        },
        {
          Name: "COFFEE",
          Image:
            "https://www.tasteofhome.com/wp-content/uploads/2018/01/Honey-Coffee_EXPS_CISMZ19_37409_E01_08_-4b.jpg",
        },
      ],
      Dinner: [
        {
          Name: "ONION MASALA RICE",
          Image:
            "https://blogexplore.com/wp-content/uploads/2020/05/blogexplore.com-onion-rice.jpg",
        },
        {
          Name: "PLAIN RICE",
          Image:
            "https://static01.nyt.com/images/2018/02/21/dining/00RICEGUIDE8/00RICEGUIDE8-master768.jpg?w=1280&q=75",
        },

        {
          Name: "DAL PANCHRATNA",
          Image:
            "https://holycowvegan.net/wp-content/uploads/2020/12/panchmel-dal-panchratan-dahl-1-500x375.jpg",
        },
        {
          Name: "MATKI MASALA DRY",
          Image: "https://i.ytimg.com/vi/t5It9N8XPoE/maxresdefault.jpg",
        },
        { Name: "VEG KADHAI GRAVY", Image: null },
        {
          Name: "PLAIN ROTI / FULKA ROTI",
          Image:
            "https://i.pinimg.com/736x/00/ff/79/00ff79c11627274d94d631b7d10ec8b6.jpg",
        },

        { Name: "GREEN CHILLI / LEMON SLICES", Image: null },
        { Name: "SALAD / PAPAD / PICKLE", Image: null },
        { Name: "ICE CREAM", Image: null },
      ],
    },
    Sunday: {
      Breakfast: [
        {
          Name: "ALOO PARATHA",
          Image:
            "https://www.vegrecipesofindia.com/wp-content/uploads/2009/08/aloo-paratha-recipe-2.jpg",
        },
        { Name: "CURD", Image: null },
        { Name: "GREEN MOONG SPROUTS", Image: null },
        { Name: "BANANA", Image: null },
        { Name: "CORN FLAKES", Image: null },
        { Name: "BBJ / PICKLE", Image: null },
        { Name: "COFFEE", Image: null },
        { Name: "BOURNVITA", Image: null },
        { Name: "MILK", Image: null },
      ],
      Lunch: [
        {
          Name: "PLAIN RICE",
          Image:
            "https://static01.nyt.com/images/2018/02/21/dining/00RICEGUIDE8/00RICEGUIDE8-master768.jpg?w=1280&q=75",
        },
        {
          Name: "TOOR DAL",
          Image:
            "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/nithya.anantham/Sindhi_Toor_Dal_Recipe-6.jpg",
        },
        {
          Name: "EGG CURRY",
          Image:
            "https://www.sharmispassions.com/wp-content/uploads/2015/06/EggCurry5.jpg",
        },
        {
          Name: "PANEER TAWA MASALA",
          Image:
            "https://www.vegrecipesofindia.com/wp-content/uploads/2021/03/tawa-paneer-2.jpg",
        },
        {
          Name: "PLAIN ROTI / BUTTER ROTI",
          Image:
            "https://i.pinimg.com/736x/00/ff/79/00ff79c11627274d94d631b7d10ec8b6.jpg",
        },
        {
          Name: "MANGO RASNA",
          Image:
            "https://cpimg.tistatic.com/05951660/b/4/Instant-Nimbu-Pani-Lemonade-Premix-Powder.jpg",
        },
        { Name: "GREEN CHILLI / LEMON SLICES", Image: null },
        { Name: "SALAD / PAPAD / PICKLE", Image: null },
      ],
      Snacks: [
        { Name: "PAKODA", Image: null },
        {
          Name: "GREEN CHUTNEY & RED CHUTNEY",
          Image:
            "https://aartimadan.com/wp-content/uploads/2020/09/Red-Green-Chutney.jpg",
        },
        { Name: "BANANA", Image: null },
        {
          Name: "BBJ",
          Image:
            "https://iamamitava.files.wordpress.com/2009/07/clx0606cook39dg-de.jpg",
        },
        {
          Name: "TEA",
          Image:
            "https://www.thesun.co.uk/wp-content/uploads/2016/09/nintchdbpict000247428630.jpg",
        },
        {
          Name: "COFFEE",
          Image:
            "https://www.tasteofhome.com/wp-content/uploads/2018/01/Honey-Coffee_EXPS_CISMZ19_37409_E01_08_-4b.jpg",
        },
      ],
      Dinner: [
        {
          Name: "VEG PULAO",
          Image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdEVRItXn4bVSFR81IJC42rt4kFxVwhPXL4w&usqp=CAU",
        },
        { Name: "RAITA", Image: null },
        {
          Name: "GREEN CHAWLI SUBZI",
          Image:
            "https://www.cookingcarnival.com/wp-content/uploads/2018/09/Mushroom-masala-4.jpg",
        },
        { Name: "MIX VEG CURRY", Image: null },
        {
          Name: "PLAIN ROTI / FULKA ROTI",
          Image:
            "https://i.pinimg.com/736x/00/ff/79/00ff79c11627274d94d631b7d10ec8b6.jpg",
        },

        { Name: "GREEN CHILLI / LEMON SLICES", Image: null },
        { Name: "SALAD / PAPAD / PICKLE", Image: null },
        { Name: "KALA JAMUN", Image: null },
      ],
    },
  };

  const getCurrentMeal = () => {
    const currentDayIndex = new Date().getDay();
    const currentDayName = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][currentDayIndex];
    const currentDayMenu = days[currentDayName];

    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    let currentMeal;

    if (currentHour >= 7 && currentHour < 11) {
      currentMeal = "Breakfast";
    } else if (currentHour >= 11 && currentHour < 15) {
      currentMeal = "Lunch";
    } else if (currentHour >= 15 && currentHour < 18) {
      currentMeal = "Snacks";
    } else {
      currentMeal = "Dinner";
    }

    return currentDayMenu[currentMeal];
  };

  const [ongoingMeal, setOngoingMeal] = useState(getCurrentMeal());

  useEffect(() => {
    const interval = setInterval(() => {
      const currentMeal = getCurrentMeal();
      setOngoingMeal(currentMeal);
    }, 1000 * 60); // Update every minute

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Ongoing Meal</Text>
      <View style={styles.mealContainer}>
        <Text style={styles.mealText}>Current Meal:</Text>
        <View style={styles.mealItemsContainer}>
          {ongoingMeal.map((item, index) => (
            <View key={index} style={styles.mealItem}>
              <Text style={styles.mealItemText}>{item.Name}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  mealContainer: {
    alignItems: "center",
  },
  mealText: {
    fontSize: 18,
    marginBottom: 10,
  },
  mealItemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  mealItem: {
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
  },
  mealItemText: {
    fontSize: 14,
    textAlign: "center",
  },
});

export default OngoingMealScreen;
