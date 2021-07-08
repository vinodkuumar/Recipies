import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text,Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import jwtDecode from 'jwt-decode';


const HomeScreen = props => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
  
    const loadProfile = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        props.navigation.navigate('Login');
      }
      const decoded = jwtDecode(token);
      setFullName(decoded.fullName);
      setEmail(decoded.email);
    };
    useEffect(() => {
      loadProfile();
    });
  
    const logout = props => {
        AsyncStorage.removeItem('token')
        .then(() => {
            props.navigation.replace('Login')
        })
        .catch(err => console.log(err))
    }
  
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>Welcome {fullName ? fullName : ''}</Text>
        </View>
        <View>
          <Text style={styles.text}>Your email is {email ? email : ''}</Text>
        </View>
        <View>
            <Button 
              title="Logout"
              onPress={() => logout(props)}
            />
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
      container:{
          flex: 1,
          padding: 40
      },
      text: {
          fontSize: 22,
          marginBottom: 20
      }
  });
  
  export default HomeScreen;
  