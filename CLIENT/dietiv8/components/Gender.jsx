import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Dimensions,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { male, female, malee, femalee } from "./Image";
import registerStore from "../stores/registerStore";
import userStore from "../stores/userStore";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Gender() {
  const navigation = useNavigation();
  const getAll = registerStore((state) => state.getAll);
  const setGender = registerStore((state) => state.setGender);
  const register = registerStore((state) => state.register);
  const login = userStore((state) => state.login);
  const [colors, setColors] = useState("#d9d9d9");
  const [colors2, setColors2] = useState("#d9d9d9");
  const [textColor, setTextColor] = useState("black");
  const [textColor2, setTextColor2] = useState("black");
  const [gender, setGenderPage] = useState("");
  const change = (gender) => {
    setGenderPage(gender);
    if (gender === "male") {
      setColors("#55a64e");
      setColors2("#d9d9d9");
      setTextColor2("black");
    } else if (gender === "female") {
      setColors2("#55a64e");
      setColors("#d9d9d9");
      setTextColor("black");
    }
  };
  const [error, setError] = useState("");
  async function goToMainTab() {
    try {
      setGender(gender);
      const state = getAll();
      const userRegister = {
        username: state.username,
        email: state.email,
        password: state.password,
        weight: state.weight,
        height: state.height,
        dateBirth: state.dateBirth,
        activityLevel: state.activityLevel,
        targetWeight: state.targetWeight,
        extra: state.extra,
        gender: state.gender,
      };
      console.log(userRegister);
      const test = await register(userRegister);
      await login({
        email: userRegister.email,
        password: userRegister.password,
      });
      navigation.navigate("maintab");
    } catch (error) {
      setError(error);
      console.log(error.response.data);
    }
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>What's your gender?</Text>
        <View style={styles.containerContent}>
          {/* {error ? <Text>{error}</Text>: ""} */}
          <View
            style={{
              height: 600,
              justifyContent: "center",
            }}
          >
            <Pressable
              style={[styles.weight, { backgroundColor: colors }]}
              onPress={() => {
                change("male");
              }}
            >
              <View style={styles.activity}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View style={styles.icon}>
                    <FontAwesome5 name="male" size={28} color="#092342" />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontWeight: "600",
                        color: textColor,
                        fontSize: 20,
                      }}
                    >
                      Male
                    </Text>
                  </View>
                </View>
                <Image
                  source={male}
                  style={{
                    height: 85,
                    width: 82,
                    marginRight: -20,
                    transform: [{ rotate: "-90deg" }],
                  }}
                ></Image>
              </View>
            </Pressable>

            <Pressable
              style={[styles.weight, { backgroundColor: colors2 }]}
              onPress={() => {
                change("female");
              }}
            >
              <View style={styles.activity}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View style={[styles.icon, { backgroundColor: "#ffe6ea" }]}>
                    <FontAwesome5 name="female" size={28} color="#c14c5f" />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontWeight: "600",
                        color: textColor2,
                        fontSize: 20,
                      }}
                    >
                      Male
                    </Text>
                  </View>
                </View>
                <Image
                  source={female}
                  style={{
                    height: 87,
                    width: 64,
                    marginRight: -10,
                    transform: [{ rotate: "-220deg" }],
                  }}
                ></Image>
              </View>
            </Pressable>
          </View>
          <View style={{ height: 50 }}>
            {gender ? (
              <Pressable style={styles.btn} onPress={goToMainTab}>
                <Text style={styles.txtBtn}>Continue</Text>
              </Pressable>
            ) : (
              ""
            )}
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  containerContent: {
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    width: windowWidth,
  },
  text: {
    marginTop: 70,
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center",
  },
  weight: {
    marginTop: 20,
    height: 80,
    paddingLeft: 10,
    borderRadius: 7,
    padding: 5,
    justifyContent: "center",
    overflow: "hidden",
  },
  kg: {
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 30,
    margin: 12,
    // borderWidth: 1,
    // borderColor: "grey",
    padding: 5,
    textAlign: "center",
    fontWeight: "500",
  },
  txtBtn: {
    color: "white",
    fontSize: 22,
    fontWeight: "800",
  },
  btn: {
    width: windowWidth - 40,
    height: 60,
    backgroundColor: "#55a64e",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  activity: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 90,
  },
  icon: {
    height: 45,
    width: 45,
    backgroundColor: "#ebf4ff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight: 10,
  },
});
