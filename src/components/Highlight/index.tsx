import { Container, Subtitle, Title } from './styles'

type Props = {
  title: string;
  subtitle: string;
}

// Recebendo as props
export function Highlight({ title, subtitle }: Props){
  return(

    // Utilizando as props nos componentes Title e Subtitle
    <Container>
      <Title>
        {title}
      </Title>

      <Subtitle>
        {subtitle}
      </Subtitle>
    </Container>
  )
}