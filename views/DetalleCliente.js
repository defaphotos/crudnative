import React from 'react';
import {View, StyleSheet, Alert, Platform} from 'react-native';
import {Headline, Text, Subheading, Button, FAB} from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';

const DetalleCliente = ({navigation, route}) => {
  const {nombre, telefono, correo, empresa, id} = route.params.item;
  const {guardarConsultar} = route.params;
  const mostrarConfirmacion = () => {
    Alert.alert(
      '¿Deseas eliminar este cliente?',
      'Un contacto eliminado no se puede recuperar',
      [
        {
          text: 'Si, eliminar',
          onPress: () => eliminarContacto(),
        },
        {text: 'Cancelar', style: 'cancel'},
      ],
    );
  };
  const eliminarContacto = async () => {
    try {
      if (Platform.OS === 'android') {
        await axios.delete(`http://10.0.2.2:3001/cliente/${id}`);
      } else if (Platform.OS === 'ios') {
        await axios.delete(`http://localhost:3001/cliente/${id}`);
      }
      guardarConsultar(true);
      navigation.navigate('Inicio');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>{nombre}</Headline>
      <Text style={styles.texto}>
        Telefono: <Subheading>{telefono}</Subheading>
      </Text>
      <Text style={styles.texto}>
        Correo: <Subheading>{correo}</Subheading>
      </Text>
      <Text style={styles.texto}>
        Empresa: <Subheading>{empresa}</Subheading>
      </Text>
      <Button
        onPress={mostrarConfirmacion}
        style={styles.boton}
        mode="contained"
        icon="cancel">
        Eliminar Cliente
      </Button>
      <FAB
        onPress={() =>
          navigation.navigate('NuevoCliente', {
            cliente: route.params.item,
            guardarConsultar,
          })
        }
        icon="pencil"
        style={globalStyles.fab}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  texto: {
    marginBottom: 20,
    fontSize: 18,
  },
  boton: {
    marginTop: 100,
    backgroundColor: 'red',
  },
});

export default DetalleCliente;
