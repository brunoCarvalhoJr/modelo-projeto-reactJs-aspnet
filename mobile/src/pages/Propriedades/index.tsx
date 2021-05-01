import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Card} from 'native-base';
import {getRealm} from '../../database/store';
import {Fazenda} from '../../database/schemas/FazendaSchema';
import {useFocusEffect} from '@react-navigation/native';

const styles = StyleSheet.create({
  card: {
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
  text: {
    paddingTop: 2,
    alignSelf: 'flex-start',
    fontSize: 20,
    fontWeight: 'bold',
  },

  header: {
    paddingLeft: 10,
    color: 'black',
  },
});

const Propriedades: React.FC = ({navigation}) => {
  const [items, setItems] = useState<Fazenda[]>([]);

  useEffect(() => {
    getRealm().then((instanceDB) => {
      const item = instanceDB.objects<Fazenda>(Fazenda.schema.name);
      setItems([...item]);
    });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getRealm().then((instanceDB) => {
        const item = instanceDB.objects<Fazenda>(Fazenda.schema.name);
        setItems([...item]);
      });
      return () => {};
    }, []),
  );

  return (
    <View>
      <SwipeListView
        testID="lista"
        rightOpenValue={-120}
        previewRowKey="0"
        previewOpenValue={-40}
        previewOpenDelay={3000}
        disableRightSwipe
        recalculateHiddenLayout
        keyExtractor={(item) => item.id.toString()}
        data={items}
        renderItem={({item}) => (
          <Card>
            <TouchableHighlight
              testID="cardItem"
              style={styles.card}
              activeOpacity={0.9}
              onPress={() =>
                navigation.navigate('Fazenda', {
                  fazendaid: item.id.toString(),
                })
              }>
              <View>
                <Text style={[styles.header, styles.text]}>{item.nome}</Text>
              </View>
            </TouchableHighlight>
          </Card>
        )}
      />
    </View>
  );
};

export default Propriedades;
