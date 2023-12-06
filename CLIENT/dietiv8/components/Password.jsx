import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Dimensions,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import registerStore from "../stores/registerStore";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Password() {
  const [text, onChangeText] = useState("");
  const navigation = useNavigation();
  const setPassword = registerStore((state) => state.setPassword)
  function goToMotivation() {
    setPassword(text)
    navigation.navigate("motivation")
  }
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>Enter your password?</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          autoFocus={true}
          cursorColor={"#88bd1e"}
          //   underlineColorAndroid="black"
          disableFullscreenUI={true}
          secureTextEntry={true}
          passwordRules={true}
        />
        {text && (
          <Pressable
            style={styles.button}
            onPress={goToMotivation}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "700",
                fontSize: 24,
              }}
            >
              Create Account
            </Text>
          </Pressable>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    marginTop: 70,
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center",
  },
  input: {
    marginTop: 120,
    fontSize: 60,
    textDecorationColor: "white",
    height: 100,
    margin: 12,
    padding: 10,
    width: 310,
  },
  button: {
    height: 60,
    marginTop: 90,
    width: windowWidth - 70,
    backgroundColor: "#55a64e",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
});
