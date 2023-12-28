import { Container, Icon, ButtonIconStyledProps } from "./styles";
import { TouchableOpacityProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"

type Props = TouchableOpacityProps & {
  icon: keyof typeof MaterialIcons.glyphMap;
  type?: ButtonIconStyledProps;
}

export function ButtonIcon({ icon, type = 'PRIMARY', ...rest}: Props ){
  return (
    <Container {...rest}>
      <Icon 
        name={icon}
        type={type}
      />
    </Container>
  )
}