import { Container, Title, FilterStyledProps } from './styles'
import { TouchableOpacityProps } from 'react-native'

type Props = TouchableOpacityProps & FilterStyledProps & {
  title: string;
}

export function Filter({ title, isActive = false, ...rest}: Props){
  return (
    <Container 
     isActive={isActive}
     {...rest}>
      <Title>
        {title}
      </Title>
    </Container>
  )
}