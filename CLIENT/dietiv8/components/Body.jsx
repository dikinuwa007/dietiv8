import { View } from "react-native";

export default function Body({ children }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#e8e8e8",
      }}
    >
      {children}
    </View>
  );
}
