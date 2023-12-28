import { useNavigation } from '@react-navigation/native'
import { Container, Content, Icon } from './styles'

import { Highlight } from '@components/Highlight'
import { Header } from '@components/Header'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { useState } from 'react'
import { groupCreate } from '@storage/group/groupCreate'
import { AppError } from '@utils/AppError'
import { Alert } from 'react-native'

export function NewGroup(){
  const [group, setGroups] = useState('');

  const navigation = useNavigation();
  
  async function handleNew(){
    // usando a função de criar e armazenar a info local no dispositivo.
    try {
      if(group.trim().length === 0){
        return Alert.alert('Novo Grupo', 'Digite o nome da turma.')
      }

      await groupCreate(group);
      // O segundo parametro da função navigate é as propriedades que a rota espera.
      navigation.navigate('players', {group})
    } catch (error) {
      if(error instanceof AppError){
        Alert.alert('Novo Grupo', error.message)
      }else{
        Alert.alert('Novo Grupo', 'Já existe um grupo criado.')
      }
    }
    
  }

  return (
    
    <Container>
      <Header showBackButton />
      
      <Content>
        <Icon />

       <Highlight 
          title='nova Turma'
          subtitle='crie a turma para adicionar pessoas'
        />

        <Input 
          placeholder='Nome da nova turma'
          onChangeText={setGroups}
        />

        <Button 
          title='Criar' 
          style={{ marginTop: 20}} 
          onPress={handleNew}
        />
        
      </Content>

    </Container>
  )
}