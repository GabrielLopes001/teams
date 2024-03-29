import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { UsersThree } from "phosphor-react-native";


export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
`;

export const Content = styled.View`
  flex: 1;
  padding: 24px;
  justify-content: center;
`;

export const Icon = styled(UsersThree).attrs(({ theme }) => ({
  color: theme.COLORS.GREEN_700,
  size: 32
}))`align-self: center`;