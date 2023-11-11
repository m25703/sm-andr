import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9F9F9',
    color: 'black',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  foodItemContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  foodItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  foodItemInfo: {
    flex: 1,
    backgroundColor: 'white',
    padding: '2%',
    borderRadius: 5,
  },
  foodItemName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  foodItemRatingLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 4,
    color: 'black',
  },
  foodItemRatingValue: {
    fontSize: 20,
    color: 'black',
  },
});
