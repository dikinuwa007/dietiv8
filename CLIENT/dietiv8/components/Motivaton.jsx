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
import { sadModel, happyModel } from "./Image";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Motivation() {
  const [text, onChangeText] = useState("");
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>Become the best</Text>
        <Text style={[styles.text, { marginTop: 0 }]}>
          version of yourself!
        </Text>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.cardSad}>
            <View>
              <Text style={styles.textMood}>Before</Text>
              <Text style={{ marginLeft: 15, marginTop: 13, fontSize: 12 }}>
                ❌ Body dislike
              </Text>
              <Text style={{ marginLeft: 15, marginTop: 13, fontSize: 12 }}>
                ❌ Lack of energy
              </Text>
              <Text style={{ marginLeft: 15, marginTop: 13, fontSize: 12 }}>
                ❌ Ineffective fitness
              </Text>
              <Text style={{ marginLeft: 15, marginTop: 13, fontSize: 12 }}>
                ❌ Body discomfort
              </Text>
            </View>
            <View style={{ alignItems: "center", width: 170 }}>
              <Image source={sadModel} style={styles.img} />
            </View>
          </View>
          <View style={styles.cardHappy}>
            <View>
              <Text style={[styles.textMood, { color: "green" }]}>Before</Text>
              <Text
                style={{
                  marginLeft: 15,
                  marginTop: 11,
                  fontWeight: 400,
                  fontSize: 12,
                }}
              >
                ✅ Goal weight met
              </Text>
              <Text
                style={{
                  marginLeft: 15,
                  marginTop: 11,
                  fontWeight: 400,
                  fontSize: 12,
                }}
              >
                ✅ My personal meal plan, my faves
              </Text>
              <Text
                style={{
                  marginLeft: 15,
                  marginTop: 11,
                  fontWeight: 400,
                  fontSize: 12,
                }}
              >
                ✅ Launch a new phase of life
              </Text>
              <Text
                style={{
                  marginLeft: 15,
                  marginTop: 11,
                  fontWeight: 400,
                  fontSize: 12,
                }}
              >
                ✅ More energetic
              </Text>
              <Text
                style={{
                  marginLeft: 15,
                  marginTop: 11,
                  fontWeight: 400,
                  fontSize: 12,
                }}
              >
                ✅ Confident and happy
              </Text>
            </View>
            <View style={{ alignItems: "center", width: 170 }}>
              <Image source={happyModel} style={styles.img} />
            </View>
          </View>
        </View>
        <Pressable
          style={styles.btn}
          onPress={() => navigation.navigate("profile")}
        >
          <Text style={styles.txtBtn}> Let's go!</Text>
        </Pressable>
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
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
  },
  cardSad: {
    marginTop: 50,
    marginRight: -7,
    height: 370,
    width: 180,
    borderRadius: 10,
    justifyContent: "space-between",
    backgroundColor: "#fad9d9",
    flexWrap: "wrap",
    shadowColor: "#fa0505",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.21,
    shadowRadius: 8.19,
    elevation: 11,
  },
  cardHappy: {
    marginTop: 100,
    marginLeft: -7,
    height: 410,
    width: 180,
    borderRadius: 10,
    justifyContent: "space-between",
    backgroundColor: "#e1fcde",
    flexWrap: "wrap",
    shadowColor: "#18ff03",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.21,
    shadowRadius: 8.19,
    elevation: 11,
  },
  textMood: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 10,
    fontWeight: "600",
    color: "#fc4e4e",
  },
  img: {
    height: 210,
    width: 90,
  },
  btn: {
    marginTop: 60,
    width: windowWidth - 40,
    height: 60,
    backgroundColor: "#55a64e",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  txtBtn: {
    color: "white",
    fontSize: 22,
    fontWeight: "800",
  },
});
