import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  Input,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {Overlay} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';

const YourComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleValidation = () => {
    let isValid = true;

    if (name.trim() === '') {
      isValid = false;
      setNameError('Please input name of Food Item');
    } else {
      setNameError('');
    }

    if (email.trim() === '') {
      isValid = false;
      setEmailError('Please input the link to image of Food Item');
    } else {
      setEmailError('');
    }

    if (password.trim() === '') {
      isValid = false;
      setPasswordError('Please input category of Food Item');
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      // Handle form submission
      // This function is called when all fields are filled
      // You can perform your action here, e.g., sending data to a server
    }
  };

  return (
    <View style={styles.container}>
      <View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.asterisk}> * </Text><Text style={styles.label}>Name of Food Item</Text>
        </View>
        
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={text => setName(text)}
        />
        {nameError ? (
          <Text style={styles.errorText}>{nameError}</Text>
        ) : (
          <Text style={styles.errorText}> </Text>
        )}
      </View>

      <View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.asterisk}> * </Text><Text style={styles.label}>Image of Food Item</Text>
        </View>
        
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        {emailError ? (
          <Text style={styles.errorText}>{emailError}</Text>
        ) : (
          <Text style={styles.errorText}> </Text>
        )}
      </View>

      <View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.asterisk}> * </Text>
          <Text style={styles.label}>Food Item Category</Text>
        </View>

        <View
          style={{
            borderWidth: 1,
            backgroundColor: 'white',
            borderRadius: 5,
            marginBottom: '5%',
            borderColor: '#D9D9D9',
            height: 50,
          }}>
          <Picker
            selectedValue={password}
            onValueChange={itemValue => setPassword(itemValue)}>
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
          </Picker>
        </View>
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}
      </View>

      <TouchableOpacity
        style={{ ...styles.button, width: '30%' }}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
};

const YourComponent2 = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleValidation = () => {
    let isValid = true;

    if (name.trim() === '') {
      isValid = false;
      setNameError('Please input name of Food Item');
    } else {
      setNameError('');
    }

    if (email.trim() === '') {
      isValid = false;
      setEmailError('Please input the link to image of Food Item');
    } else {
      setEmailError('');
    }

    if (password.trim() === '') {
      isValid = false;
      setPasswordError('Please input category of Food Item');
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      // Handle form submission
      // This function is called when all fields are filled
      // You can perform your action here, e.g., sending data to a server
    }
  };

  return (
    <View style={styles.container}>
      <View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.asterisk}> * </Text><Text style={styles.label}>Day</Text>
        </View>
        
        <View
          style={{
            borderWidth: 1,
            backgroundColor: 'white',
            borderRadius: 5,
            margin: '2%',
            borderColor: '#D9D9D9',
            height: 50,
          }}>
          <Picker
            selectedValue={name}
            onValueChange={itemValue => setName(itemValue)}>
            <Picker.Item label="Monday" value="Monday" />
            <Picker.Item label="Tuesday" value="Tuesday" />
            <Picker.Item label="Wednesday" value="Wednesday" />
            <Picker.Item label="Thursday" value="Thursday" />
            <Picker.Item label="Friday" value="Friday" />
            <Picker.Item label="Saturday" value="Saturday" />
            <Picker.Item label="Sunday" value="Sunday" />
          </Picker>
        </View>

        
        {nameError ? (
          <Text style={styles.errorText}>{nameError}</Text>
        ) : (
          <Text style={styles.errorText}> </Text>
        )}
      </View>

      <View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.asterisk}> * </Text><Text style={styles.label}>Meal type</Text>
        </View>
        
        <View
          style={{
            borderWidth: 1,
            backgroundColor: 'white',
            borderRadius: 5,
            margin: '2%',
            borderColor: '#D9D9D9',
            height: 50,
          }}>
          <Picker
            selectedValue={email}
            onValueChange={itemValue => setEmail(itemValue)}>
            <Picker.Item label="Breakfast" value="Breakfast" />
            <Picker.Item label="Lunch" value="Lunch" />
            <Picker.Item label="Snacks" value="Snacks" />
            <Picker.Item label="Dinner" value="Dinner" />
          </Picker>
        </View>

        {emailError ? (
          <Text style={styles.errorText}>{emailError}</Text>
        ) : (
          <Text style={styles.errorText}> </Text>
        )}
      </View>

      <View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.asterisk}> * </Text>
          <Text style={styles.label}>Food Items</Text>
        </View>

        <View
          style={{
            borderWidth: 1,
            backgroundColor: 'white',
            borderRadius: 5,
            margin: '2%',
            borderColor: '#D9D9D9',
            height: 50,
          }}>
          <Picker
            selectedValue={password}
            onValueChange={itemValue => setPassword(itemValue)}>
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
          </Picker>
        </View>
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}
      </View>

      <TouchableOpacity
        style={{ ...styles.button, width: '30%' }}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  asterisk: {
    color: 'red',
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 5, 
  },
  input: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    marginBottom: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
    margin: '2%',
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    margin: 1
  },
  button: {
    backgroundColor: '#1677FF', // Change the background color as needed
    borderRadius: 10, // Use a percentage value for border radius
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

const CustomButton = ({title, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        width: '70%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 7,
        margin: '2%',
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 5,
      }}
      onPress={onPress}>
      <Text style={{color: 'black'}}>{title}</Text>
    </TouchableOpacity>
  );
};

const ComplaintsScreen = () => {
  const [visible, setVisible] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);

  const toggleHelloBox = () => {
    setVisible(!visible);
    setFormVisible(false);
    setImageVisible(false);
  };

  const toggleForm = () => {
    setVisible(false);
    setFormVisible(!formVisible);
    setImageVisible(false);
  };

  const toggleImage = () => {
    setVisible(false);
    setFormVisible(false);
    setImageVisible(!imageVisible);
  };

  return (
    <View
      style={{
        margin: 0,
        backgroundColor: 'white',
        flex: 1,
      }}>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-around',
          marginBottom: '5%',
        }}>
        <CustomButton title="Create A New Food Item" onPress={toggleHelloBox} />
        <CustomButton title="Add Food To Time Table" onPress={toggleForm} />
        <CustomButton
          title="Delete Food From Time Table"
          onPress={toggleImage}
        />
      </View>

      {visible && (
        <View>
          <Text
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: '#212B36',
              margin: '5%',
            }}>
            {' '}
            Create New Food Item{' '}
          </Text>
          <YourComponent />

        </View>
      )}

      {formVisible && (
        <View>
          <Text
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: '#212B36',
              margin: '5%',
            }}>
            {' '}
            Add Food To Time Table
          </Text>
          <YourComponent2 />

        </View>
      )}

      {imageVisible && (
        <View>
          <Text
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: '#212B36',
              margin: '5%',
            }}>
            {' '}
            Delete Food From Time Table{' '}
          </Text>
        </View>
      )}
    </View>
  );
};

export default ComplaintsScreen;
