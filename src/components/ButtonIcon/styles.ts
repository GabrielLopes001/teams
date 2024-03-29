import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export type ButtonIconStyledProps = "PRIMARY" | "SECONDARY"

type Props = {
  type: ButtonIconStyledProps;
}

export const Container = styled(TouchableOpacity)`
  height: 56px;
  width: 56px;

  align-items: center;
  justify-content: center;

  margin-left: 12px;
`;

export const Icon = styled(MaterialIcons).attrs<Props>(({ theme, type}) => ({
  size: 24,
  color: type == 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED
}))``;
