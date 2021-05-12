import React, { useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  Button,
  Card,
  CardItem,
  Icon,
  Text,
  Col,
  Right,
  Form,
  Body,
  Thumbnail,
  Input,
  Item,
  Picker,
} from 'native-base';
//OCORRENCIA
import { StyleSheet, Dimensions } from 'react-native';
import { useState } from 'react';
import Share from 'react-native-share';
import { FlatList } from 'react-native-gesture-handler';
//REALM
import { getRealm } from '../../database/store';
import { Localizacao } from '../../database/schemas/LocalizacaoSchema';
import { Formulario } from '../../database/schemas/FormularioSchema';
import { Foto } from '../../database/schemas/FotoSchema';
import { FormularioItem } from '../../database/schemas/FormularioItemSchema';
import { useCadastro } from '../../contexts/cadastro';

var width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  subTitle: {
    fontSize: 20,
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

  buttons: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    marginBottom: 5,
  },
  textStyle: {
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
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
  formItemInput: {
    backgroundColor: '#ccc',
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
});

function HeaderCompartilhar({ onPress, onPressContinuar }) {
  return (
    <View style={styles.formNavigator}>
      <View style={styles.header}>
        <Text style={styles.title}>{'Resumo das informações'}</Text>
        <Button style={styles.button} onPress={onPress}>
          <Icon style={styles.buttonIcon} type="FontAwesome5" name="whatsapp" />
        </Button>
        <Button style={styles.button} onPress={onPressContinuar}>
          <Icon style={styles.buttonIcon} type="FontAwesome5" name="check" />
        </Button>
      </View>
    </View>
  );
}

const ImageItem = (foto: Foto) => {
  return (
    <TouchableOpacity key={foto.id.toString()}>
      <Thumbnail
        style={[styles.thumbnail]}
        square
        small
        source={{ uri: `data:image/png;base64,${foto.path}` }}
      />
    </TouchableOpacity>
  )
}


const retornaReposta = (itemFormulario: FormularioItem) => {
  if (itemFormulario.pergunta.tipo === 'text') {
    return itemFormulario.valor || '';
  }
  if (itemFormulario.pergunta.tipo === 'select') {
    const alternativa = itemFormulario.pergunta.alternativas.filter(c => c.id === itemFormulario.valor)[0];
    return alternativa?.nome || '';
  }
  if (itemFormulario.pergunta.tipo === 'multiselect') {
    return itemFormulario.alternativas?.map(c => c.nome).join('; ') || '';
  }
  return ""
}


const CompartilharScreen: React.FC = ({ navigation }) => {

  const [formularios, setFormularios] = useState<Formulario[]>([]);
  const { localizacao } = useCadastro();
  useEffect(() => {
    getRealm().then((instanceDB) => {
      const localizacaoDb =
        instanceDB
          .objects<Localizacao>(Localizacao.schema.name)
          .find((c) => c.id === localizacao?.id) || ({} as Localizacao);

      const formulariosLocalizacao = localizacaoDb.formularios || [];

      setFormularios([...formulariosLocalizacao]);
    });
  }, [localizacao]);

  const onPress = () => {
    const imagens: string[] = [];
    let message: string = "";
    formularios.forEach((formulario) => {
      message += `${localizacao?.tipo} - ${formulario.nome} \n`
      formulario.fotos.forEach((c) => imagens.push(`data:image/png;base64,${c.path}`));
      formulario.itens.forEach((item) => {
        if (item)
          message += `${item.pergunta.nome}: ${retornaReposta(item)} \n`
      });
    });

    const shareOptions = {
      title: 'Sistema de Monitoramento de pragas',
      message: message,
      subject: 'Pragas',
      social: Share.Social.WHATSAPP,
      failOnCancel: false,
      urls: imagens,
    };

    Share.shareSingle(shareOptions);
  };

  const onPressConcluir = () => {
    navigation.navigate('Propriedades');
  };

  return (
    <View style={styles.container}>
      <HeaderCompartilhar
        onPress={onPress}
        onPressContinuar={onPressConcluir}
      />
      <FlatList
        testID="perguntas-list"
        data={formularios.sort((a, b) => a.ordem - b.ordem)}
        renderItem={({ item }) => (
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
                          <Item regular disabled>
                            <Input
                              style={styles.formItemInput}
                              disabled={true}
                              defaultValue={formularioItem.valor}
                              onChangeText={(value) => {
                                getRealm().then((instanceDb) => {
                                  instanceDb.write(() => {
                                    formularioItem.valor = value;
                                  });
                                });
                              }}
                            />
                          </Item>
                        </View>
                      )}
                       {formularioItem.pergunta.tipo === 'numeric' && (
                          <View style={styles.formItemField}>
                            <Item regular>
                              <Input
                                style={styles.formItemInput}
                                disabled={true}
                                keyboardType="numeric"
                                defaultValue={formularioItem.valor}
                              />
                            </Item>
                          </View>
                        )}
                      {formularioItem.pergunta.tipo === 'select' && (
                        <View style={styles.formItemField}>
                          <Item regular disabled>
                            <Picker
                              enabled={false}
                              style={styles.formItemInput}
                              selectedValue={formularioItem.valor}
                              onValueChange={(value) => {
                                getRealm().then((instanceDb) => {
                                  instanceDb.write(() => {
                                    formularioItem.valor = value;
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
                        formularioItem.alternativas &&
                        formularioItem.alternativas.length > 0 && (
                          <View style={styles.formItemField}>
                            <FlatList
                              data={formularioItem.alternativas}
                              extraData={formularioItem.alternativas}
                              renderItem={(formularioItemMultiseleted) => (
                                <View style={styles.viewCheckboxes}>
                                  <Text>
                                    {formularioItemMultiseleted.item.nome}
                                  </Text>
                                </View>
                              )}
                              keyExtractor={(formularioItemMultiseleted) =>
                                formularioItemMultiseleted.id.toString()
                              }
                            />
                          </View>
                        )}
                    </View>
                  ))}
                </Form>
                <View style={styles.constainerThumbnail}>
                  <View style={styles.listThumbnailPhone}>
                    {item.fotos && (item.fotos.map((foto) => ImageItem(foto)))}
                  </View>
                </View>
              </Body>
            </CardItem>
          </Card>
        )}
        keyExtractor={(item) => item.id.toString()} // ID PERGUNTA
        ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
      />
    </View>
  );
};

export default CompartilharScreen;
