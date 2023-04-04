import { useState } from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  StatusBar
} from 'react-native';

import img from "./assets/raio.jpg"

export default function App() {

  const apik = 'bb6750d9c53579318c71c588a6944bb7';
  const [tempo, setTempo] = useState({});
  const [lugar, setLugar] = useState('');

  const getTempo = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${lugar}&units=metric&appid=${apik}`;
    axios
      .get(url)
      .then((response) => {
        const data = {
          cdd: response.data.name,
          ds: response.data.weather[0].main,
          grau: Math.round(response.data.main.temp),
        };
        setTempo(data);
        setLugar('');
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={img}
        style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }}>


        <View style={styles.WeatherContainer}>
          <StatusBar />
          <Text style={styles.Cidade}>{tempo.cdd}</Text>
          <Text style={styles.Tempo}>{tempo.ds}</Text>
          <Text style={styles.Graus}> {tempo.grau}°</Text>
          <TextInput style={styles.inputStyle}
            placeholder='Search any city' placeholderTextColor="rgba(255,255,255,0.5)"
            onChangeText={setLugar}
            onSubmitEditing={getTempo}
            value={lugar} />
        </View>




      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  WeatherContainer: {
    alignItems: 'center'
  },
  Cidade: {
    color: 'white',
    fontSize: 40
  },
  Tempo: {
    color: 'white',
    fontSize: 18
  },
  Graus: {
    color: 'white',
    fontSize: 46
  },
  inputStyle: {
    color: "rgba(255,255,255,1)",
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    width: '75%'
  }

});