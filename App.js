import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import Inicio from './views/Inicio';
import NuevoCliente from './views/NuevoCliente';
import DetalleCliente from './views/DetalleCliente';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import BarraSuperior from './components/ui/Barra';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1774f2',
    accent: '#0655bf',
  },
};

const App = () => {
  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Inicio"
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTintColor: theme.colors.surface,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerTitleAlign: 'center',
            }}>
            <Stack.Screen
              options={({navigation, route}) => ({
                /* headerLeft: props => (
                  <BarraSuperior
                    {...props}
                    navigation={navigation}
                    route={route}
                  />
                ), */
              })}
              component={Inicio}
              name="Inicio"
            />
            <Stack.Screen
              component={NuevoCliente}
              options={{
                title: 'Nuevo Cliente',
              }}
              name="NuevoCliente"
            />
            <Stack.Screen
              component={DetalleCliente}
              options={{
                title: 'Detalle Cliente',
              }}
              name="DetalleCliente"
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
