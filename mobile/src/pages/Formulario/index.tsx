import React, {useEffect} from 'react';
import {View, TouchableOpacity, PermissionsAndroid} from 'react-native';
import {
  Button,
  Card,
  CardItem,
  Icon,
  Text,
  Form,
  Item,
  Body,
  Thumbnail,
  Picker,
  Input,
} from 'native-base';
import {StyleSheet, Dimensions} from 'react-native';
import {useState} from 'react';
import {getRealm} from '../../database/store';
import {Formulario} from '../../database/schemas/FormularioSchema';
import {FormularioItem} from '../../database/schemas/FormularioItemSchema';
import {Alternativa} from '../../database/schemas/AlternativaSchema';
import {Localizacao} from '../../database/schemas/LocalizacaoSchema';
import {Foto} from '../../database/schemas/FotoSchema';
import * as ImagePicker from 'react-native-image-picker';
import {useCadastro} from '../../contexts/cadastro';
import CheckBox from '@react-native-community/checkbox';
import {FlatList, TouchableWithoutFeedback} from 'react-native-gesture-handler';

var width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  subTitle: {
    fontSize: 20,
  },

  listSeparator: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  formItem: {
    paddingTop: 10,
    flexDirection: 'column',
  },
  formItemLabel: {
    width: width * 0.8,
    height: 30,
  },
  formItemField: {
    width: '100%',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  form: {
    width: '99%',
  },
  viewCheckboxes: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 10,
  },
  constainerThumbnail: {
    width: '99%',
  },
  fullscreenImage: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },

  closeFullscreenButton: {
    backgroundColor: 'red',
  },

  listThumbnail: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  listThumbnailPhone: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  thumbnail: {
    borderRadius: 5,
    marginLeft: 6,
  },
  thumbnailDisabled: {
    opacity: 0.1,
  },
  textButton: {
    marginLeft: -25,
  },
  formNavigator: {
    backgroundColor: '#aab5cf',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },

  title: {
    flex: 1,
    color: '#465881',
    fontSize: 25,
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },

  button: {
    flex: 0.2,
    marginRight: 5,
    backgroundColor: '#465881',
    color: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 50,
  },

  buttonIcon: {
    color: '#ffffff',
    fontSize: 20,
  },
});

function HeaderFormulario({onPress}) {
  return (
    <View style={styles.formNavigator}>
      <View style={styles.header}>
        <Text style={styles.title}>{'Formulário'}</Text>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Icon type="FontAwesome5" name="save" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const FormularioScreen: React.FC = ({navigation}) => {
  const {localizacao} = useCadastro();
  const [formularios, setFormularios] = useState<Formulario[]>([]);
  const [refresh, setRefresh] = useState(1);

  useEffect(() => {
    getRealm().then((instanceDB) => {
      const localizacaoDb =
        instanceDB
          .objects<Localizacao>(Localizacao.schema.name)
          .find((c) => c.id === localizacao?.id) || ({} as Localizacao);

      setFormularios([...localizacaoDb.formularios]);
    });
  }, [localizacao]);

  const addFoto = async (formulario: Formulario) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Monitoramento',
          message: 'O aplicativo precisa de permisão para acessa a camera',
          buttonNeutral: 'Me pergunte mais tarde',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        ImagePicker.launchCamera(
          {mediaType: 'photo', includeBase64: true, quality: 0.5},
          async (response) => {
            if (response.errorMessage) {
              console.log('ImagePicker Error: ', response.errorMessage);
            } else {
              getRealm().then((instanceDB) => {
                instanceDB.write(() => {
                  const foto = {
                    id: 'id',
                    uri: response.uri,
                    nome: response.fileName,
                    path: response.base64,
                    type: response.type,
                  };
                  formulario.fotos.push(
                    new Foto(
                      foto.uri || '',
                      foto.nome || 'Foto',
                      foto.path || 'Path',
                    ),
                  );
                  setRefresh(refresh + 1);
                });
              });
            }
          },
        );
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const onPress = () => {
    navigation.navigate('Compartilhar');
  };

  const ImageItem = (foto: Foto) => (
    <TouchableOpacity key={foto.id.toString()}>
      <Thumbnail
        style={[styles.thumbnail]}
        square
        small
        source={{uri: foto.uri}}
      />
    </TouchableOpacity>
  );

  const selecione = (formularioItem: FormularioItem, item: Alternativa) => {
    getRealm().then((instanceDb) => {
      instanceDb.write(() => {
        if (!formularioItem.alternativas?.some((c) => c.id === item.id)) {
          formularioItem.alternativas?.push(item);
        } else {
          var indexOf = formularioItem.alternativas.indexOf(item);
          formularioItem.alternativas = formularioItem.alternativas.splice(
            indexOf,
            1,
          );
        }
        setRefresh(refresh + 1);
      });
    });
  };

  const checkSelecionado = (
    formularioItem: FormularioItem,
    item: Alternativa,
  ) => {
    return formularioItem.alternativas?.some((c) => c.id === item.id);
  };

  return (
    <View style={styles.container}>
      <HeaderFormulario onPress={onPress} />
      <FlatList
        testID="perguntas-list"
        data={formularios}
        renderItem={({item}) => (
          <Card>
            <CardItem header bordered>
              <Text style={styles.subTitle}>{item.nome}</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Form style={styles.form}>
                  {item.itens.map((formularioItem) => (
                    <View style={styles.formItem}>
                      <View style={styles.formItemLabel}>
                        <Text style={styles.label}>
                          {formularioItem.pergunta.nome}
                        </Text>
                      </View>
                      {formularioItem.pergunta.tipo === 'text' && (
                        <View style={styles.formItemField}>
                          <Item regular>
                            <Input
                              defaultValue={formularioItem.valor}
                              onChangeText={(value) => {
                                getRealm().then((instanceDb) => {
                                  instanceDb.write(() => {
                                    formularioItem.valor = value;
                                    setRefresh(refresh + 1);
                                  });
                                });
                              }}
                            />
                          </Item>
                        </View>
                      )}
                      {formularioItem.pergunta.tipo === 'select' && (
                        <View style={styles.formItemField}>
                          <Item regular>
                            <Picker
                              selectedValue={formularioItem.valor}
                              onValueChange={(value) => {
                                getRealm().then((instanceDb) => {
                                  instanceDb.write(() => {
                                    formularioItem.valor = value;
                                    setRefresh(refresh + 1);
                                  });
                                });
                              }}>
                              {formularioItem.pergunta.alternativas &&
                                formularioItem.pergunta.alternativas.length >
                                  0 &&
                                formularioItem.pergunta.alternativas.map(
                                  (item) => (
                                    <Picker.Item
                                      label={item.nome}
                                      value={item.id}
                                      key={item.id}
                                    />
                                  ),
                                )}
                            </Picker>
                          </Item>
                        </View>
                      )}
                      {formularioItem.pergunta.tipo === 'multiselect' &&
                        formularioItem.pergunta.alternativas &&
                        formularioItem.pergunta.alternativas.length > 0 && (
                          <View style={styles.formItemField}>
                            <FlatList
                              data={formularioItem.pergunta.alternativas}
                              extraData={formularioItem.alternativas}
                              renderItem={({item}) => (
                                <View style={styles.viewCheckboxes}>
                                  <CheckBox
                                    tintColors={{ true: '#465881', false: '#465881' }}
                                    value={checkSelecionado(
                                      formularioItem,
                                      item,
                                    )}
                                    onValueChange={() =>
                                      selecione(formularioItem, item)
                                    }
                                  />
                                  <TouchableWithoutFeedback
                                    onPress={() =>
                                      selecione(formularioItem, item)
                                    }>
                                    <Text>{item.nome}</Text>
                                  </TouchableWithoutFeedback>
                                </View>
                              )}
                              keyExtractor={(item) => item.id.toString()}
                            />
                          </View>
                        )}
                    </View>
                  ))}
                </Form>
                <View style={styles.constainerThumbnail}>
                  <View style={styles.listThumbnailPhone}>
                    <Button
                      style={styles.button}
                      block
                      onPress={() => addFoto(item)}>
                      <Icon style={styles.buttonIcon} type="FontAwesome5" name="camera" />
                    </Button>
                    {refresh !== 0 &&
                      item.fotos &&
                      item.fotos.map((foto) => ImageItem(foto))}
                  </View>
                </View>
              </Body>
            </CardItem>
          </Card>
        )}
        extraData={refresh}
        keyExtractor={(item) => item.id.toString()} // ID PERGUNTA
        ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
      />
    </View>
  );
};

export default FormularioScreen;
