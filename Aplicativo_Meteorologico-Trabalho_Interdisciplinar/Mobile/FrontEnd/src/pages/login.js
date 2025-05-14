import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleLogin = async () => {
    const storedUserData = await AsyncStorage.getItem('userData');
    const userData = JSON.parse(storedUserData);

    if (!userData || email !== userData.email || password !== userData.password) {
      alert('E-mail ou senha inválidos!');
    } else {
      navigation.navigate('city');
    }
  };

  const handleRegister = () => {
    navigation.navigate('register');
  };

  return (
    <View style={styles.container}>
     <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Não possui cadastro?</Text>
      <TouchableOpacity style={styles.buttonRegister} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registre-se</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#455458',
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: '80%',
    fontSize: 15,
    backgroundColor: '#fff',
  },
  buttonLogin: {
    backgroundColor: '#1b292d',
    borderRadius: 10,
    padding: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 20,
  },
  buttonRegister: {
    backgroundColor: '#1b292d',
    borderRadius: 10,
    padding: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  text: {
    color: 'black',
    marginVertical: 10,
    fontSize: 17,
  },
});

export default Login;
