import { useEffect, useRef, useState } from "react";
import { Alert, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";

import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playersGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam";

import { PlayerCard } from "@components/PlayerCard";
import { ButtonIcon } from "@components/ButtonIcon";
import { ListEmpty } from "@components/ListEmpty";
import { Highlight } from "@components/Highlight";
import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Filter } from "@components/Filter";
import { Input } from "@components/Input";

import { AppError } from "@utils/AppError";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";

type RouteParamProps = {
  group: string;
}

export function Players(){
  const [newPlayerName, setNewPlayerName] = useState('');
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const route = useRoute();
  const newPlayerNameInput = useRef(null);
  const navigation = useNavigation();

  const { group } = route.params as RouteParamProps;

  async function handleAddNewPlayerName(){
    if(newPlayerName.trim().length === 0){
      return Alert.alert('Nova pessoa', 'Digite o nome de uma pessoa para adcionar.')
    }

    const newPlayer = {
      name: newPlayerName,
      team
    }

    try {
      await playerAddByGroup(newPlayer, group)
      setNewPlayerName('')
      newPlayerNameInput.current?.blur()
      fetchPlayerByTeam()
    } catch (error) {
      if(error instanceof AppError){
        Alert.alert('Nova pessoa', error.message)
      } else {
        Alert.alert('Nova pessoa', 'Não foi possível adicionar.')
      }
    }
  }

  async function handlePlayerRemove(playerName: string){
    try {
      await playerRemoveByGroup(playerName, group)
      fetchPlayerByTeam()
    } catch (error) {
      Alert.alert('Remover pessoa', 'Não foi possível remover esta pessoa.')
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group)
      navigation.navigate('groups')
    } catch (error) {
      Alert.alert('Remover turma', 'Não foi possível remover o turma.')
    }
  }

  async function handleGroupRemove(){
    Alert.alert('Remover turme', 'Deseja Remover este turma?',[
      {
        text: 'Não', style:'cancel'
      },
      {
        text: 'Sim', onPress:()=> {groupRemove()},
      }
    ])
  }

  async function fetchPlayerByTeam() {
    try {
      const playerByTeam = await playersGetByGroupAndTeam(group, team)
      setPlayers(playerByTeam)
    } catch (error) {
      console.log(error);
      Alert.alert('Pesoas', 'Filtro errado')
    }
  }

  useEffect(()=>{
    fetchPlayerByTeam()
  },[team])

  return (
    <Container>
      
      <Header showBackButton />

      <Highlight 
       title={group}
       subtitle="adicione a galera e separe os times"
      />

      <Form>
        <Input 
         placeholder="Nome do participante"
         autoCorrect={false}
         onChangeText={setNewPlayerName}
         value={newPlayerName}
         inputRef={newPlayerNameInput}
         onSubmitEditing={handleAddNewPlayerName}
         returnKeyType="done"
        />

        <ButtonIcon 
         icon="add" 
         onPress={handleAddNewPlayerName}
        />
      </Form>

      <HeaderList> 
        
        <FlatList 
         data={['Time A','Time B']}
         keyExtractor={item => item}
         renderItem={({item}) => (
          <Filter 
            title={item} 
            isActive={item == team}
            onPress={() => setTeam(item)}
          />
        )}
        horizontal
        />

        <NumbersOfPlayers>
          {players.length}
        </NumbersOfPlayers>

      </HeaderList>

      <FlatList
       data={players}
       keyExtractor={item => item.name}
       renderItem={({item}) => (
        <PlayerCard 
         name={item.name} 
         onRemove={()=>handlePlayerRemove(item.name)}
        />
       )}
       showsVerticalScrollIndicator={false}
       contentContainerStyle={[{paddingBottom: 100}, players.length === 0 && {flex: 1} ]}
       ListEmptyComponent={() => (
        <ListEmpty
          message='Não há players nesta turma'
        />
      )}
      />

      <Button 
       title="Remover Turma" 
       type="SECONDARY" 
       onPress={handleGroupRemove}
      />

    </Container>
  );
}