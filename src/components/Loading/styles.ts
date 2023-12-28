import styled from "styled-components/native";

// Estilizando os atributos do ActivityIndicator atraves do .attrs()
//  com o theme ja definido

export const Container = styled.ActivityIndicator.attrs(({theme}) => ({
  color: theme.COLORS.GRAY_700
}))`
  flex: 1;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.COLORS.GRAY_600}
`