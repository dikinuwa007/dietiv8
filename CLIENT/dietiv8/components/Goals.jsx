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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Goals() {
  const navigation = useNavigation();
  const [colors, setColors] = useState("#d9d9d9");
  const [colors2, setColors2] = useState("#d9d9d9");
  const [colors3, setColors3] = useState("#d9d9d9");
  const [textColor, setTextColor] = useState("black");
  const [textColor2, setTextColor2] = useState("black");
  const [textColor3, setTextColor3] = useState("black");
  const [goals, setGoals] = useState("");

  const change = (lvl) => {
    setGoals(lvl);
    if (lvl === 1) {
      setColors("#850c20");
      setColors2("#d9d9d9");
      setColors3("#d9d9d9");
      setTextColor("white");
      setTextColor2("black");
      setTextColor3("black");
    } else if (lvl === 2) {
      setColors2("#b36902");
      setColors("#d9d9d9");
      setColors3("#d9d9d9");
      setTextColor("black");
      setTextColor2("white");
      setTextColor3("black");
    } else {
      setColors3("#55a64e");
      setColors("#d9d9d9");
      setColors2("#d9d9d9");
      setTextColor("black");
      setTextColor2("black");
      setTextColor3("white");
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>Choose your speed,</Text>
        <Text style={[styles.text, { marginTop: 0 }]}>reach your goals!</Text>
        <Text
          style={{
            marginTop: 10,
            width: 320,
            fontSize: 16,
            textAlign: "center",
            color: "grey",
          }}
        >
          Based on your information, an Unhurried pace is recommended, but you
          can modify it if necessary
        </Text>
        <View style={styles.containerContent}>
          <View
            style={{
              height: 500,
              //   justifyContent: "center",
            }}
          >
            <Pressable
              style={[styles.weight, { backgroundColor: colors }]}
              onPress={() => {
                change(1);
              }}
            >
              <View style={styles.activity}>
                <View style={styles.icon}>
                  <MaterialCommunityIcons
                    name="snail"
                    size={26}
                    color="#ff4538"
                  />
                </View>
                <View>
                  <Text style={{ fontWeight: "600", color: textColor }}>
                    Unhurried
                  </Text>
                  <Text style={{ fontWeight: "400", color: textColor }}>
                    Smaller changes, slower pace
                  </Text>
                </View>
              </View>
            </Pressable>

            <Pressable
              style={[styles.weight, { backgroundColor: colors2 }]}
              onPress={() => {
                change(2);
              }}
            >
              <View style={styles.activity}>
                <View style={[styles.icon, { backgroundColor: "#ffebd9" }]}>
                  <FontAwesome5 name="cat" size={24} color="#ff9430" />
                </View>
                <View>
                  <Text style={{ fontWeight: "500", color: textColor2 }}>
                    Progressive
                  </Text>
                  <Text style={{ fontWeight: "400", color: textColor2 }}>
                    Moderate and sustainable pace
                  </Text>
                </View>
              </View>
            </Pressable>

            <Pressable
              style={[styles.weight, { backgroundColor: colors3 }]}
              onPress={() => {
                change(3);
              }}
            >
              <View style={styles.activity}>
                <View style={[styles.icon, { backgroundColor: "#f3fff2" }]}>
                  <MaterialCommunityIcons
                    name="horse-variant-fast"
                    size={25}
                    color="#55a64e"
                  />
                </View>
                <View>
                  <Text style={{ fontWeight: "500", color: textColor3 }}>
                    Agressive
                  </Text>
                  <Text style={{ fontWeight: "400", color: textColor3 }}>
                    Bigger changes, quicker results
                  </Text>
                </View>
              </View>
            </Pressable>
          </View>
          <View style={{ height: 50 }}>
            {goals ? (
              <Pressable
                style={styles.btn}
                onPress={() => navigation.navigate("gender")}
              >
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
    paddingRight: 10,
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
    height: 90,
  },
  icon: {
    height: 45,
    width: 45,
    backgroundColor: "#ffdbd9",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight: 10,
  },
});
