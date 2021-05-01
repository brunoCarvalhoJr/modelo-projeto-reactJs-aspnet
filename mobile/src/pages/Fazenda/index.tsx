import React, { useEffect, useRef } from 'react';
import RNFS from 'react-native-fs';
import { View, StyleSheet } from 'react-native';
import { Card, CardItem, Text } from 'native-base';
import MapView, { LocalTile, MAP_TYPES, Polygon, PROVIDER_GOOGLE } from 'react-native-maps';
import { useState } from 'react';
import { getRealm } from '../../database/store';
import { Fazenda } from '../../database/schemas/FazendaSchema';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  indicator: {
    marginTop: 20,
    marginBottom: 20,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 20,
    color: '#465881',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  card: {
    marginTop: 10,
    marginBottom: 10,
  },
});

const TILES_FOLDER = `${RNFS.DocumentDirectoryPath}/mapa`;

const FazendaScreen: React.FC = ({ route, navigation }) => {
  const mapRef = useRef(null);
  const { fazendaid } = route.params;
  const [fazenda, setFazenda] = useState<Fazenda>();
  const [centro, setCentro] = useState({ latitude: 0, longitude: 0 });
  useEffect(() => {
    getRealm().then((instanceDB) => {
      const item = instanceDB.objects<Fazenda>(Fazenda.schema.name)
        .find((c) => c.id === fazendaid);
      setFazenda(item);
      if (item) {
        setCentro(JSON.parse(item.centro))
      }
    });
  }, [fazendaid]);

  return (
    <>
      <Card>
        <CardItem header>
          <Text style={styles.title}>{fazenda && fazenda.nome}</Text>
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
          }}>
          {fazenda && (
            <>
              <Polygon
                key={fazenda.id}
                coordinates={JSON.parse(fazenda.theGeom)}
                strokeColor="#ffee00"
                fillColor="rgba(255, 238, 0, 0.1)"
                strokeWidth={2}
                tappable={false}
              />
              {fazenda.talhoes &&
                fazenda.talhoes.map((talhao) => {
                  return (
                    <Polygon
                      key={talhao.id}
                      coordinates={JSON.parse(talhao.theGeom)}
                      strokeColor="#B3F0CC"
                      fillColor="rgba(179,240,204, 0.09)"
                      strokeWidth={2}
                      tappable={true}
                      onPress={(_event) => {
                        navigation.navigate('Talhao', {
                          talhaoid: talhao.id,
                        });
                      }}
                    />
                  );
                })}
            </>
          )}
          <LocalTile
            pathTemplate={`${TILES_FOLDER}/{z}/{x}/{y}.jpg`}
            tileSize={256}
            zIndex={-1}
          />
        </MapView>
      </View>
    </>
  );
};

export default FazendaScreen;
