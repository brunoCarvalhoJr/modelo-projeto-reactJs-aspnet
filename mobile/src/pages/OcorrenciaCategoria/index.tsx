import React, {useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Card, Icon, Text, Container} from 'native-base';
import {StyleSheet} from 'react-native';
import {useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {getRealm} from '../../database/store';
import {Localizacao} from '../../database/schemas/LocalizacaoSchema';
import {OcorrenciaCategoria} from '../../database/schemas/OcorrenciaCategoriaSchema';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },

  cardContainer: {
    borderRadius: 15,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#465881',
  },

  content: {
    padding: 20,
    margin: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  text: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 26,
  },

  icon: {
    fontSize: 75,
    color: 'white',
  },
});

const OcorrenciaCategoriaScreen: React.FC = ({route, navigation}) => {
  const {localizacaoid} = route.params;
  const [ocorrencias, setOcorrencias] = useState<OcorrenciaCategoria[]>([]);
  useEffect(() => {
    getRealm().then((instanceDB) => {
      const localizacao = instanceDB
        .objects<Localizacao>(Localizacao.schema.name)
        .find((c) => c.id === localizacaoid);

      const ocorrenciasCategorias = instanceDB
        .objects<OcorrenciaCategoria>(OcorrenciaCategoria.schema.name)
        .filter((c) => c.tipo === localizacao?.tipo)
        .sort((c) => c.ordem);

      setOcorrencias([...ocorrenciasCategorias]);
    });
  }, [localizacaoid]);

  const action = (item: OcorrenciaCategoria) => {
    navigation.navigate('Ocorrencia', {
      ocorrenciacategoriaid: item.id,
      localizacaoid: localizacaoid,
    });
  };

  return (
    <>
      <Container style={styles.mainContainer}>
        <FlatList
          data={ocorrencias}
          renderItem={({item}) => (
            <TouchableOpacity
              key={item.id.toString()}
              testID="modulo-button"
              onPress={() => {
                action(item);
              }}>
              <Card style={styles.cardContainer}>
                <View style={styles.content}>
                  <Text style={styles.text}> {item.nome} </Text>
                  <Icon
                    type="FontAwesome5"
                    name={item.icone}
                    style={styles.icon}
                  />
                </View>
              </Card>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </Container>
    </>
  );
};

export default OcorrenciaCategoriaScreen;
