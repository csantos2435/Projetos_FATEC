import React, { useEffect, useState } from 'react';
import { FaMapMarker, FaSun, FaCloud, FaSnowflake, FaUmbrella, FaTint, FaCloudShowersHeavy, FaWind, FaSmog } from 'react-icons/fa';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Bar, BarChart, Pie, PieChart, Cell } from 'recharts';
import '../Styles/Home.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const data = [
  { name: 'Janeiro', temperature: 12, umidade: 10, chuva: 5000 },
  { name: 'Fevereiro', temperature: 15, umidade: 60, chuva: 6000},
  { name: 'Março', temperature: 20, umidade: 50, chuva: 7000  },
  { name: 'Abril', temperature: 25, umidade: 20, chuva: 8000 },
  { name: 'Maio', temperature: 30, umidade: 30, chuva: 9000 },
 ];
 
 // Calcular a porcentagem de umidade para cada mês
 data.forEach(item => {
  item.umidade = item.umidade / 100;
 });
 
 const pieColors = [
  { value: 100, color: '#164863' },
  { value: 80, color: '#427D9D' },
  { value: 50, color: '#9BBEC8' },
  { value: 20, color: '#87C4FF' },
  { value: 0, color: '#000000' },
 ];

  const RainAnimation = () => (
  <div className="rain-animation">
      <FaCloudShowersHeavy className="rain-drop" />
  </div>
  );

function App() {
  // const { cidade } = useParams();
  const cidade = "Franca";
  const [cidadeInf, setcidadeInf] = useState('');
  const [temperatura, setTemperatura] = useState(null);
  const [temperaturaMax, setTemperaturaMax] = useState(null);
  const [temperaturaMin, setTemperaturaMin] = useState(null);
  const [umidade, setUmidade] = useState(null);
  const [pressao, setPressao] = useState(null);
  const [visibilidade, setVisibilidade] = useState(null);
  const [loading, setLoading] = useState(true);
  const posibilidadeSol = "5%";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataAtual = new Date().toISOString().slice(0, 10); 
        const response = await fetch(`http://localhost:3000/weathers/${cidade}/${dataAtual}`);
        const dadosDoBanco = await response.json();
          
        setcidadeInf(dadosDoBanco.name_city);
        setTemperatura(dadosDoBanco.temperature);
        setTemperaturaMax(dadosDoBanco.temperature_max);
        setTemperaturaMin(dadosDoBanco.temperature_min);
        setUmidade(dadosDoBanco.humidity); 
        setPressao(dadosDoBanco.pressure);
        setVisibilidade(dadosDoBanco.visibility);
        setLoading(false); // Indica que a carga foi concluída
      } catch (error) {
        console.error('Erro ao obter dados do banco:', error);
        setLoading(false); // Indica que a carga foi concluída mesmo em caso de erro
      }
    };

    fetchData();
  }, [cidade]);

  if (loading) {
    return <RainAnimation/>;
  }
  
  const getWeatherIcon = () => {
    if (temperatura > 30) {
      return FaSun;
    } else if (temperatura > 20) {
      return FaCloud;
    } else if (temperatura > 0) {
      return FaSnowflake;
    } else {
      return FaUmbrella;
    }
  };

  const WeatherIcon = getWeatherIcon();

  const getWeatherDetail = (Icon) => {
    switch (Icon) {
      case FaSun:
        return `${posibilidadeSol}`;
      case FaTint:
        return `${umidade} %`;
      case FaCloudShowersHeavy:
        return `${pressao} psi`;
      case FaWind:
        return `${visibilidade} km`;
      case FaSmog:
        return `${posibilidadeSol}`;
      default:
        return '';
    }
  };

  const getWeatherIcons = () => {
    if (temperatura > 30) {
      return [FaSun, FaTint, FaCloudShowersHeavy, FaWind, FaSmog];
    } else if (temperatura > 20) {
      return [FaCloud, FaTint, FaCloudShowersHeavy, FaWind, FaSmog];
    } else if (temperatura > 0) {
      return [FaSnowflake, FaTint, FaCloudShowersHeavy, FaWind, FaSmog];
    } else {
      return [FaUmbrella, FaTint, FaCloudShowersHeavy, FaWind, FaSmog];
    }
  };

  const weatherIcons = getWeatherIcons();

  return (
    <div className="app">
          <div className="centered-square">
            <div className="city-info">
              <div className="location-section">
                <FaMapMarker className="location-icon" />
                <h1 className="city-name">{cidadeInf}</h1>
              </div>
              <Link to="https://kessiarodrigues31.grafana.net/public-dashboards/e899469869a543c684fcb0ca4e496d1e" 
                className="custom-button" tabIndex="0">
                <div className="visible-content">Ver Dashboards</div>
                <div className="hidden-content">
                  <i className="right-arrow icon"></i>
                </div>
              </Link>
              <div className="horizontal-line"></div>
              <div className="weather-section">
                {WeatherIcon && <WeatherIcon className="weather-" />}
              </div>
              <p className="temperature">{temperatura}º</p>
              <p className="tempetarure-max-min">Máx.: {temperaturaMax}º | Mín.: {temperaturaMin}º</p>
              <div className="new-line"></div>
              <div className="weather-details">
                {weatherIcons.map((Icon, index) => (
                  <div key={index} className="weather-detail">
                    {Icon && <Icon className="weather-icon" />}
                    <span>{getWeatherDetail(Icon)}</span>
                  </div>
                ))}
              </div>
              <div className="line"></div>
              </div>
              <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="justify-content-around  mb-4 pb-3 pt-2">
                  {[
                    { temperature: 21, icon: FaSun, time: '12:00', period: 'PM' },
                    { temperature: 2, icon: FaSun, time: '1:00', period: 'PM' },
                    { temperature: 20, icon: FaCloud, time: '2:00', period: 'PM' },
                    { temperature: 19, icon: FaCloud, time: '3:00', period: 'PM' },
                    { temperature: 18, icon: FaCloudShowersHeavy, time: '4:00', period: 'PM' },
                  ].map((data, index) => (
                    <div key={index} className="weather-carousel-item">
                      <p className="small">
                        <strong>{`${data.temperature}°C`}</strong>
                      </p>
                      {data.icon && <data.icon className="fas fa-2x mb-3" style={{ color: '#ddd' }} />}
                      <p className="mb-0">
                        <strong>{data.time}</strong>
                      </p>
                      <p className="mb-0 text-muted" style={{ fontSize: '.65rem' }}>
                        {data.period}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
              <div className="graph">
                <h1 className="graph-title">Temperatura</h1>
                <LineChart width={500} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <Line type="monotone" dataKey="temperature" stroke="#001B79" strokeWidth={6} />
                  <CartesianGrid stroke="#ccc" strokeDasharray="9 9" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                </LineChart>
              </div>
              <div className="graph">   
              <h1 className="graph-title">Umidade</h1>   
                <PieChart width={600} height={400}>
                  <Pie dataKey="umidade" data={data} label={true}>
                    {
                      pieColors.map((entry, index) => <Cell key={index} fill={entry.color} />)
                    }
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
              <div className="graph last-graph">
              <h1 className="graph-title">Quantidade de Chuva</h1>
                <BarChart width={500} height={300} data={data} barSize={50}>
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="chuva" fill="#001B79" />
                </BarChart>
              </div>
            </div>
  );
}

export default App;
