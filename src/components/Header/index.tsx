import { useNavigation } from '@react-navigation/native';
import { BackButton, BackIcon, Container, Logo } from './styles'
import logoImg from '@assets/logo.png'

type Props = {
  showBackButton?: boolean;
}

export function Header({showBackButton = false} : Props){

  const navigation = useNavigation()

  // Implementando função de retorno para "Home" em todo lugar que usar o componente Header
  function handleGoHome(){
    navigation.navigate('groups');
  }

  return(
    // Renderizando os botões apenas se a propriedade for true
    <Container>
      {
        showBackButton &&
        <BackButton onPress={handleGoHome}>
          <BackIcon />
        </BackButton>
      }
     <Logo source={ logoImg } />
   </Container>
  )
  
}