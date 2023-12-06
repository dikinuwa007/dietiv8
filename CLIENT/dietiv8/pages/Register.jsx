import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { dietModel } from "../components/Image";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import userStore from "../stores/userStore";
import { useEffect } from "react";

export default function Register({ coba }) {
  const navigation = useNavigation();
  const getAccessToken = userStore((state) => state.getAccessToken);

  async function checkLogin() {
    const access = await getAccessToken();
    if (access) navigation.navigate("maintab");
  }

  useEffect(() => {
    checkLogin();
  }, []);
  return (
    <>
      <View style={styles.container}>
        <LinearGradient colors={["#ffff", "#60935d"]} style={styles.container}>
          <View>
            <SafeAreaView>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  style={{
                    color: "#60935d",
                    textAlign: "center",
                    marginTop: 90,
                    fontSize: 30,
                    width: 280,
                    // borderRadius: 7,
                    // padding: 7,
                    // backgroundColor: "#60935d",
                    fontWeight: "800",
                  }}
                >
                  Welcome to DIETIV8
                </Text>
                <Text
                  style={{
                    color: "#60935d",
                    textAlign: "center",
                    fontSize: 26,
                    width: 280,
                    // borderRadius: 7,
                    // padding: 7,
                    // backgroundColor: "#60935d",
                    fontWeight: "800",
                    marginBottom: 20,
                  }}
                >
                  Nutrition Program
                </Text>
                <Text
                  style={{
                    color: "#60935d",
                    textAlign: "center",
                    textAlignVertical: "center",
                    marginTop: 110,
                    fontSize: 30,
                    width: 280,
                    height: 65,
                    borderRadius: 10,
                    padding: 5,
                    backgroundColor: "white",
                    fontWeight: "500",
                  }}
                  onPress={() => navigation.navigate("Name")}
                >
                  Get Started
                </Text>
                <Text style={{ color: "green", marginTop: 10, fontSize: 15 }}>
                  Already have an account?{" "}
                  <Text
                    style={{
                      color: "green",
                      fontWeight: "700",
                      textDecorationLine: "underline",
                    }}
                    onPress={() => navigation.navigate("Login")}
                  >
                    Log in
                  </Text>
                </Text>
              </View>
            </SafeAreaView>
          </View>
          <View style={styles.image}>
            <Image source={dietModel} style={styles.img}></Image>
          </View>
        </LinearGradient>
      </View>
      {/* <Image source={dietModel}></Image> */}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "red",
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  img: {
    height: 400,
    width: 350,
  },
});
