import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useDispatch} from 'react-redux';
import * as authAction from '../store/actions/authAction';

const formSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
});

const LoginScreen = (navData) => {
  const dispatch = useDispatch();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={formSchema}
        onSubmit={(values) => {
          dispatch(authAction.loginUser(values))
            .then((result) => {
              if (result.success) {
                console.log('message = ', result.message);

                // await AsyncStorage.setItem('token', result.token);
                navData.navigation.navigate('Main');
                console.log('main');
              } else {
                Alert.alert(result.message);
              }
            })
            .catch((err) => console.log(err));
        }}>
        {(props) => (
          <View style={styles.container}>
            <View style={styles.logo}>
              <Image
                source={require('../assets/logo.png')}
                style={styles.image}
              />
            </View>
            <View>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#fff"
                keyboardType="email-address"
                onChangeText={props.handleChange('email')}
                value={props.values.email}
                onBlur={props.handleBlur('email')}
              />
              <Text style={styles.error}>
                {props.touched.email && props.errors.email}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#fff"
                secureTextEntry={true}
                onChangeText={props.handleChange('password')}
                value={props.values.password}
                onBlur={props.handleBlur('password')}
              />
              <Text style={styles.error}>
                {props.touched.password && props.errors.password}
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={props.handleSubmit}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>Don't have account?</Text>
                <TouchableOpacity
                  onPress={() => navData.navigation.navigate('Register')}>
                  <Text style={styles.registerButton}>Register</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

LoginScreen.navigationOptions = {
  headerTitle: 'Login'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  logo: {
    alignItems: 'center',
    marginBottom: 40,
  },
  image: {
    width: 100,
    height: 100,
  },
  input: {
    width: 300,
    backgroundColor: '#D0D0D0',
    borderRadius: 25,
    padding: 16,
    fontSize: 16,
    marginVertical: 10,
  },
  button: {
    width: 300,
    backgroundColor: '#4a148c',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  registerContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
  },
  registerText: {
    color: '#4a148c',
    fontSize: 16,
  },
  registerButton: {
    color: '#4a148c',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
  },
});

export default LoginScreen;
