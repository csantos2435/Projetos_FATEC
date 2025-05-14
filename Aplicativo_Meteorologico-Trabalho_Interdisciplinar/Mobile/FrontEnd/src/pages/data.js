import React, { Component } from 'react';
import { Container, Info, Title } from './style';
import { LineChartBicolor, LineChart } from 'react-native-gifted-charts';
import { ScrollView, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Data extends Component {

  state = {
    userName: '',
  };

  componentDidMount() {
    this.loadUserData();
  }

  loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      const { name: userName } = JSON.parse(userData);

      this.setState({ userName });
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  render() {
    const { route } = this.props;
    const { cidade, userName, selectedCityData  } = route.params;

    const data = selectedCityData && selectedCityData.data ? selectedCityData.data : [];
    const lineData = selectedCityData && selectedCityData.lineData ? selectedCityData.lineData : [];

    const lineData2 = selectedCityData && selectedCityData.lineData ? selectedCityData.lineData2 : [];
    const lineData3 = selectedCityData && selectedCityData.lineData ? selectedCityData.lineData3 : [];

    return (
      <Container>
        <Info>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 90, color: 'white' }}>
            Cidade: {cidade}
          </Text>
          {/* <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 3, color: 'white' }}>
            Usuário: {userName}
          </Text> */}
        </Info>
        <ScrollView>
          <View style={{ backgroundColor: '#fff', borderRadius: 20, marginBottom: 20 }}>
            <Text
              style={{
                fontSize: 20,
                color: '#1b292d',
                textAlign: 'center',
                marginTop: 15,
                marginBottom: 15
              }}>
              Umidade
            </Text>
            <LineChart
              width={300}
              height={200}
              initialSpacing={0}
              isAnimated
              data={lineData}
              spacing={45}
              textColor1="#1b292d"
              textShiftY={-8}
              textShiftX={-10}
              textFontSize={13}
              thickness={5}
              hideRules
              hideYAxisText
              yAxisColor="#0BA5A4"
              showVerticalLines
              verticalLinesColor="rgba(14,164,164,0.5)"
              xAxisColor="#0BA5A4"
              color="#0BA5A4"
            />
          </View>
          <View style={{ backgroundColor: '#fff', borderRadius: 20, marginBottom: 20 }}>
          <Text
              style={{
                fontSize: 20,
                color: '#1b292d',
                textAlign: 'center',
                marginTop: 15,
                marginBottom: 15
              }}>
              Temperatura Min x Max
            </Text>
          <LineChart
            areaChart
            curved
            data={lineData2}
            data2={lineData3}
            height={250}
            showVerticalLines
            spacing={44}
            initialSpacing={0}
            color1="skyblue"
            color2="orange"
            textColor1="green"
            hideDataPoints
            dataPointsColor1="blue"
            dataPointsColor2="red"
            startFillColor1="skyblue"
            startFillColor2="orange"
            startOpacity={0.8}
            endOpacity={0.3}
            />
          </View>
          <View style={{ backgroundColor: '#fff', borderRadius: 20 }}>
            <Text style={{ fontSize: 20, color: 'black', textAlign: 'center', marginTop: 'auto', marginBottom: 'auto' }}>Temperatura Média</Text>
            <LineChartBicolor
              width={300}
              height={250}
              data={data}
              areaChart
              colo
              color="red"
              colorNegative="blue"
              startFillColor="red"
              startFillColorNegative="blue"
              backgroundColor={'#fff'}
            />
          </View>
        </ScrollView>
      </Container>
    );
  }
}
