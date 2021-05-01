import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useAuth} from '../../contexts/auth';
import Sincronizacao from '../../database/sync/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#003f5c',
  },
  text: {
    fontSize: 24,
  },
  textSincronizando: {
    fontSize: 24,
    color: '#009688',
  },
  btn: {
    width: '80%',
    backgroundColor: '#009688',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
});

const Configuracoes: React.FC = ({navigation}) => {
  const [sincronizando, setSincronizando] = useState(false);
  const {user, signOut} = useAuth();

  function handleSignOut() {
    signOut();
  }

  function handleSincronizar() {
    setSincronizando(true);
    Sincronizacao(user?.email, () => {
      setSincronizando(false);
    });
  }

  function handlePropriedades() {
    navigation.navigate('Propriedades');
  }

  return (
    <View style={styles.container}>
      {sincronizando && (
        <Text style={styles.textSincronizando}>
          {'Aguarde sincronizando...'}
        </Text>
      )}
      {!sincronizando && (
        <>
          <TouchableOpacity onPress={handlePropriedades} style={styles.btn}>
            <Text style={styles.text}>Propriedades</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSincronizar} style={styles.btn}>
            <Text style={styles.text}>Sincronizar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSignOut} style={styles.btn}>
            <Text style={styles.text}>Sair</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Configuracoes;
