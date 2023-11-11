import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212B36',
    paddingVertical: 20,
    backgroundColor: 'white',
    textAlign: 'left',
  },
  feedbackContainer: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'white',
    marginTop: '5%',
    marginLeft: '5%',
marginRight: '5%',
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    height: 200,
marginLeft: '5%',
marginRight: '5%',
backgroundColor: 'white',
  },
  feedbackItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  displayImage: {
    height: 200,
    aspectRatio: 2,
    marginRight: 10,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1677FF', // Change the background color as needed
    borderRadius: 10, // Use a percentage value for border radius
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'left',
    padding: 10,
    margin: '5%',
    width: '20%'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
