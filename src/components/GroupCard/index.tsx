import { TouchableOpacityProps } from 'react-native';
import { Container, Title, Icon } from './styles'

// Juntando type Props com a Props do Touchable
type Props = TouchableOpacityProps & {
  title: string;
}

// Pessando as propriedades para o componente, title e o resto(Touchable)
export function GroupCard({ title, ...rest }: Props){
  return(
    // Passando a propriedade do Touchable para o componente
    <Container {...rest}>
      <Icon />
      <Title>
        {title}
      </Title>
    </Container>
  )
}