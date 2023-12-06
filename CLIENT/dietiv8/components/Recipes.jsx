import { View } from "react-native";

export default function Recipes({ children }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#60935D",
      }}
    >
      {children}
    </View>
  );
}
