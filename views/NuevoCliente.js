import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {
  TextInput,
  Headline,
  Button,
  Paragraph,
  Dialog,
  Portal,
} from 'react-native-paper';
import axios from 'axios';
import globalStyles from '../styles/global';
const NuevoCliente = ({navigation, route}) => {
  const {guardarConsultar} = route.params;
  const [nombre, guardarNombre] = useState('');
  const [telefono, guardarTelefono] = useState('');

  const [correo, guardarCorreo] = useState('');

  const [empresa, guardarEmpresa] = useState('');
  const [alerta, guardarAlerta] = useState(false);

  useEffect(() => {
    if (route.params.cliente) {
      guardarNombre(route.params.cliente.nombre);
      guardarTelefono(route.params.cliente.telefono);
      guardarCorreo(route.params.cliente.correo);
      guardarEmpresa(route.params.cliente.empresa);
    }
  }, []);

  const guardarCliente = async () => {
    if (
      nombre.trim() === '' ||
      telefono.trim() === '' ||
      correo.trim() === '' ||
      empresa.trim() === ''
    ) {
      guardarAlerta(true);
      return;
    }

    const cliente = {nombre, telefono, correo, empresa};

    if (route.params.cliente) {
      try {
        const {id} = route.params.cliente;
        cliente.id = id;
        if (Platform.OS === 'android') {
          await axios.put(`http://10.0.2.2:3001/cliente/${id}`, cliente);
        } else if (Platform.OS === 'ios') {
          await axios.put(`http://localhost:3001/cliente/${id}`, cliente);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        if (Platform.OS === 'android') {
          await axios.post('http://10.0.2.2:3001/cliente', cliente);
        } else if (Platform.OS === 'ios') {
          await axios.post('http://localhost:3001/cliente', cliente);
        }
      } catch (error) {
        console.log(error);
      }
    }

    guardarNombre('');
    guardarTelefono('');
    guardarCorreo('');
    guardarEmpresa('');
    guardarConsultar(true);
    navigation.navigate('Inicio');
  };
  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>Añadir Nuevo Cliente</Headline>
      <TextInput
        style={styles.input}
        label="Nombre"
        placeholder="Daniel"
        onChangeText={value => guardarNombre(value)}
        value={nombre}
      />
      <TextInput
        style={styles.input}
        label="Telefono"
        placeholder="1234567890"
        onChangeText={value => guardarTelefono(value)}
        value={telefono}
      />
      <TextInput
        style={styles.input}
        label="Correo"
        placeholder="correo@correo.com"
        onChangeText={value => guardarCorreo(value)}
        value={correo}
      />
      <TextInput
        style={styles.input}
        label="Empresa"
        placeholder="Nombre Empresa"
        onChangeText={value => guardarEmpresa(value)}
        value={empresa}
      />
      <Button
        icon="plus-circle"
        mode="contained"
        onPress={() => guardarCliente()}>
        Guardar Cliente
      </Button>
      <Portal>
        <Dialog onDismiss={() => guardarAlerta(false)} visible={alerta}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Todos los campos son obligatorios</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => guardarAlerta(false)}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
});

export default NuevoCliente;
