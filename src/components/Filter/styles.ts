import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export type FilterStyledProps = {
  isActive?: boolean;
}

export const Container = styled(TouchableOpacity)<FilterStyledProps>`
  border: 1px solid ${({ theme, isActive }) => (
    isActive ? theme.COLORS.GREEN_700 : 'transparent'
  )};

  border-radius: 4px;
  margin-right: 12px;

  height: 38px;
  width: 70px;

  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  color: ${({ theme }) => (theme.COLORS.WHITE)};

  font-size: ${({ theme }) => (theme.FONT_SIZE.SM)}px;
  font-family: ${({ theme }) => (theme.FONT_FAMILY.BOLD)};


`