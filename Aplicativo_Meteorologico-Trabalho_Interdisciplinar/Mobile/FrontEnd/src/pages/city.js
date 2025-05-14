import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Keyboard, ActivityIndicator } from 'react-native';
import api from '../services/api';
import {
  Container,
  List,
  Cidade,
  Name,
  CityButton,
  CityButtonText,
} from './style';

export default class City extends Component {
  state = {
    newUser: '',
    users: [],
    loading: false,
  };

  cidades = ["Franca", "São Paulo", "Rio de Janeiro", 'Itirapuã', 'Brasília']

  renderCityButtons() {
    return this.cidades.map((cidade, index) => (
      <CityButton
        borderRadius={10}
        key={index}
        onPress={() => {
          const selectedCityData = this.getCityData(cidade);
          this.props.navigation.navigate('data', { cidade, selectedCityData });
        }}>
        <CityButtonText>{cidade}</CityButtonText>
      </CityButton>
    ));
  }

  getCityData = (city) => {
    const cityData = {
      Franca: {
        data: [
          { value: 27 },
          { value: 27 },
          { value: 28 },
          { value: 27 },
          { value: 28 },
          { value: 29 },
          { value: 28 },
        ],
        lineData: [
          { value: 0, dataPointText: '0%' },
          { value: 30, dataPointText: '30%' },
          { value: 60, dataPointText: '60%' },
          { value: 70, dataPointText: '70%' },
          { value: 90, dataPointText: '90%' },
          { value: 80, dataPointText: '80%' },
          { value: 80, dataPointText: '80%' },
          { value: 40, dataPointText: '40%' },
        ],
        lineData2: [
          { value: 0, dataPointText: '0°' },
          { value: 27, dataPointText: '27°' },
          { value: 27, dataPointText: '27°' },
          { value: 28, dataPointText: '28°' },
          { value: 27, dataPointText: '27°' },
          { value: 28, dataPointText: '28°' },
          { value: 29, dataPointText: '29°' },
          { value: 29, dataPointText: '29°' },
        ],
        lineData3: [
          { value: 0, dataPointText: '0°' },
          { value: 19, dataPointText: '19°' },
          { value: 19, dataPointText: '19°' },
          { value: 18, dataPointText: '18°' },
          { value: 18, dataPointText: '18°' },
          { value: 18, dataPointText: '18°' },
          { value: 18, dataPointText: '18°' },
          { value: 18, dataPointText: '18°' },
        ],
      },
      'São Paulo': {
        data: [
          { value: 29 },
          { value: 29 },
          { value: 21 },
          { value: 17 },
          { value: 21 },
          { value: 26 },
          { value: 27 },
        ],
        lineData: [
          { value: 0, dataPointText: '0%' },
          { value: 56, dataPointText: '56%' },
          { value: 77, dataPointText: '77%' },
          { value: 90, dataPointText: '90%' },
          { value: 90, dataPointText: '90%' },
          { value: 85, dataPointText: '85%' },
          { value: 80, dataPointText: '80%' },
          { value: 75, dataPointText: '75%' },
        ],
        lineData2: [
          { value: 0, dataPointText: '0°' },
          { value: 32, dataPointText: '32°' },
          { value: 29, dataPointText: '29°' },
          { value: 21, dataPointText: '21°' },
          { value: 17, dataPointText: '17°' },
          { value: 21, dataPointText: '21°' },
          { value: 26, dataPointText: '26°' },
          { value: 27, dataPointText: '27°' },
        ],
        lineData3: [
          { value: 0, dataPointText: '0°' },
          { value: 22, dataPointText: '22°' },
          { value: 19, dataPointText: '19°' },
          { value: 15, dataPointText: '15°' },
          { value: 15, dataPointText: '15°' },
          { value: 18, dataPointText: '18°' },
          { value: 20, dataPointText: '20°' },
          { value: 21, dataPointText: '21°' },
        ],
      },
      'Rio de Janeiro': {
        data: [
          { value: 34 },
          { value: 31 },
          { value: 26 },
          { value: 22 },
          { value: 23 },
          { value: 27 },
          { value: 28 },
        ],
        lineData: [
          { value: 0, dataPointText: '0%' },
          { value: 65, dataPointText: '65%' },
          { value: 79, dataPointText: '79%' },
          { value: 95, dataPointText: '95%' },
          { value: 79, dataPointText: '79%' },
          { value: 82, dataPointText: '82%' },
          { value: 80, dataPointText: '80%' },
          { value: 81, dataPointText: '81%' },
        ],
        lineData2: [
          { value: 0, dataPointText: '0°' },
          { value: 34, dataPointText: '34°' },
          { value: 31, dataPointText: '31°' },
          { value: 26, dataPointText: '26°' },
          { value: 22, dataPointText: '22°' },
          { value: 23, dataPointText: '23°' },
          { value: 27, dataPointText: '27°' },
          { value: 28, dataPointText: '28°' },
        ],
        lineData3: [
          { value: 0, dataPointText: '0°' },
          { value: 26, dataPointText: '26°' },
          { value: 24, dataPointText: '24°' },
          { value: 21, dataPointText: '21°' },
          { value: 21, dataPointText: '21°' },
          { value: 22, dataPointText: '22°' },
          { value: 23, dataPointText: '23°' },
          { value: 24, dataPointText: '24°' },
        ],
      },
      'Itirapuã': {
        data: [
          { value: 24 },
          { value: 29 },
          { value: 29 },
          { value: 35 },
          { value: 27 },
          { value: 29 },
          { value: 30 },
        ],
        lineData: [
          { value: 0, dataPointText: '0%' },
          { value: 76, dataPointText: '76%' },
          { value: 70, dataPointText: '70%' },
          { value: 75, dataPointText: '75%' },
          { value: 75, dataPointText: '75%' },
          { value: 71, dataPointText: '71%' },
          { value: 67, dataPointText: '67%' },
          { value: 66, dataPointText: '66%' },
        ],
        lineData2: [
          { value: 0, dataPointText: '0°' },
          { value: 29, dataPointText: '29°' },
          { value: 29, dataPointText: '29°' },
          { value: 29, dataPointText: '29°' },
          { value: 27, dataPointText: '27°' },
          { value: 29, dataPointText: '29°' },
          { value: 30, dataPointText: '30°' },
          { value: 29, dataPointText: '29°' },
        ],
        lineData3: [
          { value: 0, dataPointText: '0°' },
          { value: 20, dataPointText: '20°' },
          { value: 20, dataPointText: '20°' },
          { value: 19, dataPointText: '19°' },
          { value: 19, dataPointText: '19°' },
          { value: 19, dataPointText: '19°' },
          { value: 19, dataPointText: '19°' },
          { value: 19, dataPointText: '19°' },
        ],
      },
      'Brasília': {
        data: [
          { value: 22 },
          { value: 29 },
          { value: 30 },
          { value: 29 },
          { value: 29 },
          { value: 29 },
          { value: 31 },
        ],
        lineData: [
          { value: 0, dataPointText: '0%' },
          { value: 76, dataPointText: '76%' },
          { value: 59, dataPointText: '59%' },
          { value: 51, dataPointText: '51%' },
          { value: 54, dataPointText: '54%' },
          { value: 59, dataPointText: '59%' },
          { value: 54, dataPointText: '54%' },
          { value: 44, dataPointText: '44%' },
        ],
        lineData2: [
          { value: 0, dataPointText: '0°' },
          { value: 26, dataPointText: '26°' },
          { value: 29, dataPointText: '29°' },
          { value: 30, dataPointText: '30°' },
          { value: 29, dataPointText: '29°' },
          { value: 29, dataPointText: '29°' },
          { value: 29, dataPointText: '29°' },
          { value: 31, dataPointText: '31°' },
        ],
        lineData3: [
          { value: 0, dataPointText: '0°' },
          { value: 20, dataPointText: '20°' },
          { value: 19, dataPointText: '19°' },
          { value: 20, dataPointText: '20°' },
          { value: 20, dataPointText: '20°' },
          { value: 20, dataPointText: '20°' },
          { value: 19, dataPointText: '19°' },
          { value: 19, dataPointText: '19°' },
        ],
      },
    };

    return cityData[city] || cityData['default'];
  };

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');

    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  async componentDidUpdate(_, prevState) {
    const { users } = this.state;

    if (prevState.users !== users) {
      await AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleAddUser = async () => {
    try {
      const { users, newUser } = this.state;

      this.setState({ loading: true });

      const response = await api.get(`/users/${newUser}`);

      const data = {
        name: response.data.name,
      };

      this.setState({
        users: [...users, data],
        newUser: '',
        loading: false,
      });

      Keyboard.dismiss();
    } catch (error) {
      alert('Usuário não encontrado!');
      this.setState({ loading: false });
    }

    console.log(response.data);
  };

  render() {
    const { users, newUser, loading } = this.state;

    return (
      <Container>
        {this.renderCityButtons()}
        <List
          showsVerticalScrollIndicator={false}
          data={users}
          keyExtractor={user => user.login}
          renderItem={({ item }) => (
            <Cidade>
              <Name>{item.name}</Name>
            </Cidade>
          )}
        />
      </Container>
    );
  }
}
