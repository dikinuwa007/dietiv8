import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import { dietModel } from "../components/Image";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Body from "../components/Body";
import { useState } from "react";
import userStore from "../stores/userStore";

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [error, setError] = useState("");
  const login = userStore((state) => state.login);

  function removeMessage() {
    setError();
  }

  async function loginUser() {
    setEmailError("");
    setPassError("");
    setError("");
    if (!email) setEmailError("Email Cannot Be Empty");
    if (!password) setPassError("Password Cannot Be Empty");
    if (!email && !password) return 0;
    console.log(emailError);
    try {
      const success = await login({
        email,
        password,
      });
      if (success) navigation.navigate("maintab");
    } catch (error) {
      setError(error);
    }
  }
  return (
    <>
      <Body>
        {error ? <View style={styles.errorBackground}></View> : ""}
        {error ? (
          <View>
            <View style={styles.errorMessage}>
              <Text style={styles.errorText}>Invalid Email/Password</Text>
              <Pressable style={styles.button} onPress={removeMessage}>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "700",
                    fontSize: 20,
                  }}
                >
                  OK
                </Text>
              </Pressable>
            </View>
          </View>
        ) : (
          ""
        )}
        <View style={styles.container}>
          <Text style={{ fontSize: 28, fontWeight: "700", marginBottom: 12 }}>
            Login
          </Text>
          <Text style={{ fontSize: 18, color: "grey" }}>
            If you don't have an account,
          </Text>
          <Text
            style={{ fontSize: 18, color: "grey" }}
            onPress={() => navigation.navigate("Name")}
          >
            please start <Text style={{ color: "green" }}>here</Text>
          </Text>
          <View>
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              cursorColor={"#88bd1e"}
              disableFullscreenUI={true}
              inputMode="email"
              placeholder="email@example.com"
            />
            {emailError ? (
              <Text style={{ color: "#850c20" }}>{emailError}</Text>
            ) : (
              ""
            )}
            <TextInput
              style={[styles.input, { marginTop: 10 }]}
              onChangeText={setPassword}
              value={password}
              cursorColor={"#88bd1e"}
              disableFullscreenUI={true}
              inputMode="text"
              secureTextEntry={true}
              passwordRules={true}
              placeholder="input password here"
            />
            {passError ? (
              <Text style={{ color: "#850c20" }}>{passError}</Text>
            ) : (
              ""
            )}
          </View>
          <Pressable style={styles.button} onPress={loginUser}>
            <Text
              style={{
                color: "white",
                fontWeight: "700",
                fontSize: 20,
              }}
            >
              LOG IN
            </Text>
          </Pressable>
        </View>
      </Body>
      {/* <Image source={dietModel}></Image> */}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
  input: {
    marginTop: 30,
    fontSize: 16,
    textDecorationColor: "white",
    height: 50,
    margin: 12,
    padding: 10,
    width: 310,
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "white",
    borderRadius: 10,
  },
  button: {
    height: 60,
    marginTop: 90,
    width: 300,
    backgroundColor: "#55a64e",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  errorMessage: {
    position: "absolute",
    backgroundColor: "white",
    padding: "8%",
    top: 300,
    width: 400,
    textAlign: "center",
    zIndex: 2,
  },
  errorBackground: {
    backgroundColor: "black",
    position: "absolute",
    zIndex: 1,
    width: "100%",
    height: "100%",
    opacity: 0.5,
  },
  errorText: {
    alignContent: "center",
    justifyContent: "center",
    width: "100%",
    paddingTop: 20,
    fontSize: 29,
  },
});
