import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export type ButtonStyledProps = "PRIMARY" | "SECONDARY"

type Props ={
  type: ButtonStyledProps;
}

// Criando componente TouchableOpacity e passando a tipagem
export const Container = styled(TouchableOpacity) <Props>`
  flex: 1;

  min-height: 56px;
  max-height: 56px;

  border-radius: 6px;

  background-color: ${({ theme, type}) => type == "PRIMARY" ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK};

  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;