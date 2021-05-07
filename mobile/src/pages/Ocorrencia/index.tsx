import React, { useEffect } from 'react';
import Realm from 'realm';
import { View, TouchableOpacity, Alert } from 'react-native';
import { Button, Icon, Text } from 'native-base';
import CheckBox from '@react-native-community/checkbox';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { getRealm } from '../../database/store';
import { Ocorrencia } from '../../database/schemas/OcorrenciaSchema';
import { Localizacao } from '../../database/schemas/LocalizacaoSchema';
import { OcorrenciaCategoria } from '../../database/schemas/OcorrenciaCategoriaSchema';
import { Formulario } from '../../database/schemas/FormularioSchema';
import { FormularioItem } from '../../database/schemas/FormularioItemSchema';
import { useCadastro } from '../../contexts/cadastro';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  listSeparator: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  item: {
    paddingTop: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  form: {
    marginLeft: 5,
    marginRight: 5,
  },
  viewCheckboxes: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 10,
  },

  formNavigator: {
    backgroundColor: '#aab5cf',
    marginBottom: 20
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
  },
});

function HeaderSelecao({ onPress }) {
  return (
    <View style={styles.formNavigator}>
      <View style={styles.header}>
        <Text style={styles.title}>{'Selecione os tipos para continuar'}</Text>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Icon type="FontAwesome5" name="save" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const SelecionarSubGrupo: React.FC = ({ navigation, route }) => {
  const { ocorrenciacategoriaid } = route.params;
  const { localizacao } = useCadastro();
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [ocorrenciasSelecionadas, setOcorrenciasSelecionadas] = useState<
    Ocorrencia[]
  >([]);

  useEffect(() => {
    getRealm().then((instanceDB) => {
      const ocorrenciacategoria = instanceDB
        .objects<OcorrenciaCategoria>(OcorrenciaCategoria.schema.name)
        .find((c) => c.id === ocorrenciacategoriaid);

      const ocorrenciasCategorias = ocorrenciacategoria?.ocorrencias || [];
      setOcorrencias([...ocorrenciasCategorias]);
    });
  }, [ocorrenciacategoriaid, localizacao]);

  const salvar = () => {
    getRealm().then((instanceDB) => {
      instanceDB.write(() => {
        const localizacaoDb =
          instanceDB
            .objects<Localizacao>(Localizacao.schema.name)
            .find((c) => c.id === localizacao?.id) || ({} as Localizacao);
        ocorrenciasSelecionadas.forEach((value: Ocorrencia) => {
          if (value) {
            const itemsFormularios = value.perguntas.map((pergunta) => {
              return new FormularioItem(pergunta);
            });

            const formulario = new Formulario(value.nome, false, value.ordem, itemsFormularios);
            localizacaoDb.formularios.push(formulario);
            instanceDB.create<Localizacao>(
              Localizacao.schema.name,
              localizacaoDb,
              Realm.UpdateMode.All,
            );
          }
        });
        if (ocorrenciasSelecionadas.length > 0) {
          navigation.navigate('Formulario');
        } else {
          Alert.alert('Ocorrência', 'Deve selecionar uma ocorrência');
        }
      });
    });
  };

  const selecione = (item: Ocorrencia) => {
    if (!ocorrenciasSelecionadas?.some((c) => c.id === item.id)) {
      setOcorrenciasSelecionadas((olds) => [...olds, item]);
    } else {
      setOcorrenciasSelecionadas([
        ...ocorrenciasSelecionadas.filter(
          (itemFilter) => !(itemFilter.id === item.id),
        ),
      ]);
    }
  };

  const checkSelecionado = (item: Ocorrencia) => {
    return ocorrenciasSelecionadas.some((c) => c.id === item.id);
  };

  return (
    <>
      <HeaderSelecao onPress={salvar} />
      <FlatList
        data={ocorrencias.sort((a, b) => a.ordem - b.ordem)}
        extraData={ocorrenciasSelecionadas}
        renderItem={({ item }) => (
          <View style={styles.viewCheckboxes}>
            <CheckBox
              tintColors={{ true: '#465881', false: '#465881' }}
              value={checkSelecionado(item)}
              onValueChange={() => selecione(item)}
            />
            <TouchableWithoutFeedback onPress={() => selecione(item)}>
              <Text>{item.nome}</Text>
            </TouchableWithoutFeedback>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </>
  );
};

export default SelecionarSubGrupo;
