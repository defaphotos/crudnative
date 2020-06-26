import React, {useEffect, useState} from 'react';
import {View, Platform, FlatList} from 'react-native';
import {List, Headline, Button, FAB} from 'react-native-paper';
import axios from 'axios';
import globalStyles from '../styles/global';
const Inicio = ({navigation}) => {
  const [clientes, guardarClientes] = useState([]);
  const [consultar, guardarConsultar] = useState(true);
  useEffect(() => {
    const consultarAPI = async () => {
      try {
        let resultado;
        if (Platform.OS === 'android') {
          resultado = await axios.get('http://10.0.2.2:3001/cliente');
        } else if (Platform.OS === 'ios') {
          resultado = await axios.get('http://localhost:3001/cliente');
        }
        guardarClientes(resultado.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (consultar) {
      consultarAPI();
      guardarConsultar(false);
    }
  }, [consultar]);
  return (
    <View style={globalStyles.contenedor}>
      <Button
        icon="plus-circle"
        onPress={() => navigation.navigate('NuevoCliente', {guardarConsultar})}>
        Nuevo Cliente
      </Button>
      <Headline style={globalStyles.titulo}>
        {clientes.length > 0 ? 'Clientes' : 'AUn no hay Clientes'}
      </Headline>
      <FlatList
        keyExtractor={cliente => cliente.id.toString()}
        data={clientes}
        renderItem={({item}) => {
          return (
            <List.Item
              onPress={() =>
                navigation.navigate('DetalleCliente', {item, guardarConsultar})
              }
              title={item.nombre}
              description={item.empresa}
            />
          );
        }}
      />
      <FAB
        onPress={() => navigation.navigate('NuevoCliente', {guardarConsultar})}
        icon="plus"
        style={globalStyles.fab}
      />
    </View>
  );
};

export default Inicio;
