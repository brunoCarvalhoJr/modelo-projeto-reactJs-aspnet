import React, { useEffect, useRef, useState } from 'react';
import RNFS from 'react-native-fs';
import Realm from 'realm';
import { View, Alert, StyleSheet } from 'react-native';
import { Button, Card, CardItem, Icon, Text } from 'native-base';
import MapView, { Callout, LocalTile, MapEvent, MAP_TYPES, Marker, Polygon, PROVIDER_GOOGLE } from 'react-native-maps';
import { getRealm } from '../../database/store';
import { Talhao } from '../../database/schemas/TalhaoSchema';
import { Localizacao } from '../../database/schemas/LocalizacaoSchema';
import { useCadastro } from '../../contexts/cadastro';
import Geolocation from '@react-native-community/geolocation';
import { OcorrenciaCategoria } from '../../database/schemas/OcorrenciaCategoriaSchema';
import { Ocorrencia } from '../../database/schemas/OcorrenciaSchema';
import { FormularioItem } from '../../database/schemas/FormularioItemSchema';
import { Formulario } from '../../database/schemas/FormularioSchema';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  toolbar: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  background: {
    marginBottom: 5,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  save: {
    marginTop: 15,
    marginBottom: 5,
  },
  icon: {
    height: 30,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  button: {
    color: '#FFFFFF',
  },
  modal: {
    flex: 1,
    width: '100%',
    padding: 20,
  },
  multiline: {
    minHeight: 64,
    textAlignVertical: 'top',
  },
  buttons: {
    marginTop: 10,
    flexDirection: 'row',
  },
  buttonLeft: {
    flex: 1,
    marginRight: 10,
  },
  buttonRight: {
    flex: 1,
    marginLeft: 10,
  },
  horizontal: {
    flexDirection: 'row',
  },
  bold: {
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    color: '#465881',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  callout: {
    flex: 1,
    position: 'relative',
    width: 300,
    borderRadius: 5,
    padding: 10,
  },
});

const TILES_FOLDER = `${RNFS.DocumentDirectoryPath}/mapa`;

function TalhaoScreen({ route, navigation }) {
  const mapRef = useRef(null);
  const { selecioneLocalizacao } = useCadastro();
  const { talhaoid } = route.params;
  const [inserindoLocalizacao, setInserindoLocalizacao] = useState<boolean>();
  const [talhao, setTalhao] = useState<Talhao>(
    new Talhao('', '', 0, undefined),
  );
  const [localizacao, setLocalizacao] = useState<Localizacao>(
    new Localizacao(),
  );
  const [centro, setCentro] = useState({ latitude: 0, longitude: 0 });
  useEffect(() => {
    getRealm().then((instanceDB) => {
      if (instanceDB.isInTransaction) {
        instanceDB.cancelTransaction();
      }
      const talhaoDb = instanceDB
        .objects<Talhao>(Talhao.schema.name)
        .find((c) => c.id === talhaoid);
      setTalhao(talhaoDb || talhao);
      if (talhaoDb) {
        console.log(talhaoDb.centro);
        setCentro(JSON.parse(talhaoDb.centro))
      }
    });
  }, [talhaoid]);

  const onPressEditar = (localizacao: Localizacao) => {
    selecioneLocalizacao(localizacao);
    navigation.navigate('Compartilhar');
  };

  const getColor = (tipo: string) => {
    return tipo.includes(Localizacao.CODIGO.ANOTACAO) ? '#41a6c5' : '#df3805';
  };

  function onMapPress(event: MapEvent) {
    if (!inserindoLocalizacao) {
      return;
    }
    const geojson = {
      longitude: event.nativeEvent.coordinate.longitude,
      latitude: event.nativeEvent.coordinate.latitude,
    };
    localizacao.formularios = [];
    localizacao.theGeom = JSON.stringify(geojson);
    setLocalizacao({ ...localizacao });
  }

  const salvarLocalizacaoAnotacao = (tipo: string, navigate: string) => {
    getRealm().then((instanceDB) => {
      instanceDB.write(() => {
        const ocorrenciaCategoria = instanceDB
          .objects<OcorrenciaCategoria>(OcorrenciaCategoria.schema.name)
          .find((c) => c.tipo === tipo);
        ocorrenciaCategoria?.ocorrencias.forEach((value: Ocorrencia) => {
          if (value) {
            const itemsFormularios = value.perguntas.map((pergunta) => {
              return new FormularioItem(pergunta);
            });

            const formulario = new Formulario(value.nome, itemsFormularios);
            localizacao.formularios.push(formulario);
          }
        });
        localizacao.tipo = tipo;
        localizacao.talhao = talhao.id;
        talhao.localizacoes?.push(localizacao);
        selecioneLocalizacao(localizacao);
        instanceDB.create<Talhao>(
          Talhao.schema.name,
          talhao,
          Realm.UpdateMode.All,
        );
        navigation.navigate(navigate);
      });
    });
  };

  const salvarLocalizacao = (tipo: string, navigate: string) => {
    if (!localizacao.theGeom) {
      Alert.alert('Cadastro', 'Deve escolher o pronto antes de cadastrar');
      return;
    }
    getRealm().then((instanceDB) => {
      instanceDB.write(() => {
        localizacao.tipo = tipo;
        localizacao.talhao = talhao.id;
        talhao.localizacoes?.push(localizacao);
        instanceDB.create<Talhao>(
          Talhao.schema.name,
          talhao,
          Realm.UpdateMode.All,
        );
        selecioneLocalizacao(localizacao);
        navigation.navigate(navigate, {
          localizacaoid: localizacao.id,
        });
      });
    });
  };

  const onPressAnotacao = () => {
    salvarLocalizacaoAnotacao(Localizacao.CODIGO.ANOTACAO, 'Formulario');
  };

  const onPressOcorrencia = () => {
    salvarLocalizacao(Localizacao.CODIGO.OCORRENCIA, 'OcorrenciaCategoria');
  };

  const onPressLocalizacao = () => {
    Geolocation.getCurrentPosition(
      (info) => {
        localizacao.theGeom = JSON.stringify({
          longitude: info.coords.longitude,
          latitude: info.coords.latitude,
        });
        localizacao.formularios = [];
        setLocalizacao({ ...localizacao });
      },
      (error) => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  };

  return (
    <>
      <Card>
        <CardItem header>
          <Text style={styles.title}>{talhao?.nome}</Text>
        </CardItem>
      </Card>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          minZoomLevel={6}
          maxZoomLevel={16}
          rotateEnabled={false}
          style={styles.container}
          mapType={MAP_TYPES.NONE}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: centro.latitude,
            longitude: centro.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
          }}
          onPress={onMapPress}>
          {talhao && talhao.theGeom && (
            <>
              <Polygon
                coordinates={JSON.parse(talhao.theGeom)}
                strokeColor="#B3F0CC"
                fillColor="rgba(179,240,204, 0.09)"
                strokeWidth={2}
              />
              {talhao.localizacoes &&
                !inserindoLocalizacao &&
                talhao.localizacoes.map((localizacao) => (
                  <React.Fragment>
                    <Marker
                      coordinate={JSON.parse(localizacao.theGeom || '')}
                      pinColor={getColor(localizacao.tipo)}>
                      <Callout
                        style={styles.callout}
                        onPress={() => onPressEditar(localizacao)}>
                        <View>
                          <Text style={styles.title}>
                            Clique para visualizar os detalhes
                          </Text>
                          <View style={styles.horizontal}></View>
                        </View>
                      </Callout>
                    </Marker>
                  </React.Fragment>
                ))}
            </>
          )}

          {localizacao && localizacao.theGeom && (
            <React.Fragment>
              <Marker
                coordinate={JSON.parse(localizacao.theGeom || '')}
                pinColor={'#076e26'}
              />
            </React.Fragment>
          )}
          <LocalTile
            pathTemplate={`${TILES_FOLDER}/{z}/{x}/{y}.jpg`}
            tileSize={256}
            zIndex={-1}
          />
        </MapView>
        {!inserindoLocalizacao && (
          <View style={styles.toolbar}>
            <View style={styles.background}>
              <Button
                success
                onPress={() => setInserindoLocalizacao(!inserindoLocalizacao)}>
                <Icon name="enviroment" type="AntDesign" />
              </Button>
            </View>
          </View>
        )}
        {inserindoLocalizacao && (
          <View style={styles.toolbar}>
            <View style={styles.background}>
              <Button info onPress={onPressAnotacao}>
                <Icon name="form" type="AntDesign" />
              </Button>
            </View>
            <View style={styles.background}>
              <Button danger onPress={onPressOcorrencia}>
                <Icon name="bug" type="FontAwesome" />
              </Button>
            </View>
            <View style={styles.background}>
              <Button light onPress={onPressLocalizacao}>
                <Icon name="crosshairs" type="FontAwesome5" />
              </Button>
            </View>
            <View style={styles.background}>
              <Button
                warning
                onPress={() => {
                  localizacao.formularios = [];
                  localizacao.theGeom = undefined;
                  setInserindoLocalizacao(!inserindoLocalizacao);
                  setLocalizacao(localizacao);
                }}>
                <Icon name="reply" type="FontAwesome" />
              </Button>
            </View>
          </View>
        )}
      </View>
    </>
  );
}

export default TalhaoScreen;
