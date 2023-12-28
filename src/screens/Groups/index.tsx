import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { useState, useCallback } from 'react';
import { FlatList } from 'react-native';

import { Container } from './styles'

import { groupsGetAll } from '@storage/group/groupsGetAll';
import { GroupCard } from '@components/GroupCard';
import { Highlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';
import { Header } from '@components/Header';
import { Button } from '@components/Button';


export function Groups() {
  // Criando um estado para gerenciar a lista de Groups
  // 1° Armazena as items do Array
  // 2° É a função que controla os items do estado
  const [groups, setGroup] = useState<string[]>([]);

  // Hook para navegação
  const navigation = useNavigation();

  function handleNewGroup(){
    // Usando a função navigate e passando o nome da rota
    navigation.navigate('new')
  }

  // função para buscar dados no local storage do dispositivo
  async function fetchGroup(){
    try {
      const data = await groupsGetAll();
      setGroup(data)
    } catch (error) {
      console.log(error)
    }
  }

  function handleOpenGroup(group: string){
    navigation.navigate('players', {group})
  }

  // usando o hook que observa qual tela esta o foco e renderiza o componente dnv
   // usando o hook callBack para chamar dnv, neste caso a função que criamos.
  useFocusEffect(useCallback(() => {
    fetchGroup();
  }, []))

  return (
    <Container>
      <Header />

      <Highlight 
        title='Turmas'
        subtitle='Jogue com sua turma'
      />

      <FlatList 
        // Propriedade data passando qual a informação que deve renderizar
        data={groups}
        // Propriedade para definir a key de cada item
        keyExtractor={item => item}
        // Propriedade para renderizar o componente GroupCard com o title do estado Groups
        renderItem={({item}) => (
          <GroupCard 
           title={item}
           onPress={()=>handleOpenGroup(item)} 
          />
        )}
        // Propriedade para estilizar quando a list de group for vazia
        contentContainerStyle={ groups.length == 0 && { flex: 1}}
        // Propriedade para renderizar um component quando a lista for vazia
        ListEmptyComponent={() => (
          <ListEmpty
            message='Que tal cadastrar uma turma?'
          />
        )}
      />
      <Button 
       style={{marginRight:30, marginLeft: 30}}
       title='Criar nova turma'
       onPress={handleNewGroup}
      />
    </Container>
  );
}