import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Dimensions,
  ProgressBarAndroid,
  Image,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  TouchableHighlight,
} from "react-native";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Card } from "@rneui/themed";
import * as Progress from "react-native-progress";
import axios from "axios";

import { FontAwesome } from "@expo/vector-icons";
import Body from "../components/Body";
import {
  Foundation,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useEffect, useState } from "react";
import userStore from "../stores/userStore";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const data = {
  // labels: ["Swim", "Bike", "Run"], // optional
  data: [0.4, 0.6, 0.8],
};

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

export default function Home({ navigation }) {
  const [user, setUser] = useState({});
  const [calorie, setCalorie] = useState({});
  const [percentageCal, setPercentagecal] = useState(0);
  const [colorProgress, setColorProgress] = useState("#60935D");

  const baseUrl = "http://13.250.41.248/";
  const getAcc = userStore((state) => state.getAccessToken);
  const access_token = userStore((state) => state.access_token);

  const dataUser = async () => {
    try {
      await getAcc();
      const { data } = await axios.get(baseUrl + "users/1", {
        headers: { access_token },
      });
      setUser(data);
    } catch (error) {
      console.log(error.response, "<<<<<<>>>>>>>");
    }
  };

  const dataCalorie = async () => {
    try {
      const { data } = await axios.get(baseUrl + "histories/now", {
        headers: { access_token },
      });
      const percentage =
        Math.round((data?.calorieGain / data?.calorieLimit) * 100) / 100;
      if (data?.calorieGain > data?.calorieLimit - 250) {
        setColorProgress("#A71D31");
      } else {
        setColorProgress("#60935D");
      }
      setPercentagecal(percentage);
      setCalorie(data);
    } catch (error) {
      console.log(error.response, "========");
    }
  };

  useEffect(() => {
    // dataUser();
    // dataCalorie();
    getAcc();
  }, []);

  useEffect(() => {
    dataUser();
    dataCalorie();
  }, [access_token]);

  const touchNutrition = () => {
    console.log("You touch Nutrition");
    navigation.navigate("Recipes");
  };

  const touchWeight = () => {
    console.log("You touch Weight");
    navigation.navigate("Graph", { user: user });
  };

  return (
    <>
      <View style={{ flex: 1, backgroundColor: "#F7F7F7" }}>
        <SafeAreaView style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerName}>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                Hello, {user?.username}!
              </Text>
            </View>

            <ImageBackground
              source={require("../assets/BackgroundProfile.png")}
              style={{
                flex: 1.7,
                width: windowWidth * 0.9,
                alignItems: "center",
              }}
              borderRadius={20}
            >
              <Card
                containerStyle={{
                  flex: 1.7,
                  justifyContent: "center",
                  borderRadius: 20,
                  marginTop: 0,
                  backgroundColor: "transparent",
                  shadowColor: "transparent",
                  width: windowWidth * 0.9,
                  alignItems: "center",
                }}
                wrapperStyle={{
                  backgroundColor: "transparent",
                  width: windowWidth * 0.95,
                  padding: 20,
                }}
              >
                <View style={{ marginVertical: 10, marginHorizontal: 8 }}>
                  <Text
                    style={{ color: "white", fontWeight: "600", fontSize: 30 }}
                  >
                    Feeling Better!
                  </Text>
                  <Text style={{ color: "white" }}>
                    Keep you healthy life with
                  </Text>
                  <Text style={{ color: "white" }}>healthy food!</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 10,
                    marginHorizontal: 8,
                  }}
                >
                  <View style={{ marginRight: 10 }}>
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "600",
                        fontSize: 20,
                      }}
                    >
                      {user?.targetWeight}
                      <Text style={{ fontSize: 15 }}>kg</Text>
                    </Text>
                    <Text style={{ color: "white" }}>Target Weight</Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "600",
                        fontSize: 20,
                      }}
                    >
                      {calorie?.calorieLimit}
                      <Text style={{ fontSize: 15 }}>cal</Text>
                    </Text>
                    <Text style={{ color: "white" }}>Calories Limit</Text>
                  </View>
                </View>
              </Card>
            </ImageBackground>
          </View>

          {/* Nutrition */}
          <View style={styles.nutrition}>
            <View
              style={{
                width: windowWidth * 0.8,
                marginLeft: 15,
                marginBottom: -10,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "500" }}>Nutrition</Text>
            </View>
            <Pressable onPress={() => touchNutrition()}>
              <Card
                containerStyle={{
                  borderRadius: 20,
                  marginBottom: 0,
                  marginHorizontal: 10,
                }}
                wrapperStyle={{ height: windowHeight * 0.13 }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "start",
                    alignItems: "center",
                    height: windowHeight * 0.2,
                    flex: 1,
                  }}
                >
                  <View style={{ flex: 1.5, alignItems: "center" }}>
                    <Progress.Pie
                      progress={percentageCal}
                      size={90}
                      borderWidth={2}
                      color={colorProgress}
                    />
                  </View>
                  <View
                    style={{
                      flex: 3,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <Text style={{ fontSize: 18, fontWeight: "500" }}>
                        {calorie?.calorieGain} of {calorie?.calorieLimit}
                      </Text>
                      <Text style={{ color: "grey", fontSize: 10 }}>
                        Cal Eaten
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: colorProgress,
                        marginRight: 20,
                        width: 30,
                        height: 30,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 50,
                      }}
                    >
                      <Foundation name="graph-bar" size={20} color="white" />
                    </View>
                  </View>
                </View>
              </Card>
            </Pressable>
          </View>
          {/* Weight */}
          <View style={styles.weight}>
            <View
              style={{
                width: windowWidth * 0.8,
                marginLeft: 15,
                marginBottom: -10,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "500" }}>Weight</Text>
            </View>
            <Pressable onPress={() => touchWeight()}>
              <Card
                containerStyle={{
                  borderRadius: 20,
                  marginBottom: 0,
                  marginHorizontal: 10,
                }}
                wrapperStyle={{ height: windowHeight * 0.13 }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "start",
                    alignItems: "center",
                    height: windowHeight * 0.2,
                    flex: 1,
                  }}
                >
                  <View style={{ flex: 1.5, alignItems: "center" }}>
                    <FontAwesome5 name="weight" size={50} color="purple" />
                  </View>
                  <View
                    style={{
                      flex: 3,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <View>
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>
                          {user?.weight}{" "}
                          <Text style={{ fontSize: 15 }}>kg</Text>
                        </Text>
                      </View>
                      <Text style={{ color: "grey", fontSize: 10 }}>
                        Loss {user?.weight - user?.targetWeight} kg
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: "purple",
                        marginRight: 20,
                        width: 30,
                        height: 30,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 50,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="weight-kilogram"
                        size={20}
                        color="white"
                      />
                    </View>
                  </View>
                </View>
              </Card>
            </Pressable>
          </View>

          {/* Carousel Tips */}
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={false}
            style={styles.carousel}
          >
            <Card
              containerStyle={styles.containerCardCarousel}
              wrapperStyle={styles.wrapperCardCarousel}
            >
              <ImageBackground
                style={styles.carouselImage}
                source={require("../assets/QuotesGreen.png")}
                borderRadius={20}
              >
                <Text style={{ color: "white", fontWeight: "600" }}>
                  "Life is a tragedy of nutrition."
                </Text>
                <Text style={{ color: "white" }}>-Arnold Ehret</Text>
              </ImageBackground>
            </Card>
            <Card
              containerStyle={styles.containerCardCarousel}
              wrapperStyle={styles.wrapperCardCarousel}
            >
              <ImageBackground
                style={styles.carouselImage}
                source={require("../assets/QuotesCream.png")}
                borderRadius={20}
              >
                <Text style={{ color: "#60935D", fontWeight: "600" }}>
                  "When in doubt, use nutrition first"
                </Text>
                <Text style={{ color: "#60935D" }}>-Roger Williams</Text>
              </ImageBackground>
            </Card>
            <Card
              containerStyle={styles.containerCardCarousel}
              wrapperStyle={styles.wrapperCardCarousel}
            >
              <ImageBackground
                style={styles.carouselImage}
                source={require("../assets/QuotesGreen.png")}
                borderRadius={20}
              >
                <Text style={{ color: "white", fontWeight: "600" }}>
                  "You are what you eat. What
                </Text>
                <Text style={{ color: "white", fontWeight: "600" }}>
                  would YOU like to be?"
                </Text>
                <Text style={{ color: "white" }}>-Julie Murphy</Text>
              </ImageBackground>
            </Card>
            <Card
              containerStyle={styles.containerCardCarousel}
              wrapperStyle={styles.wrapperCardCarousel}
            >
              <ImageBackground
                style={styles.carouselImage}
                source={require("../assets/QuotesCream.png")}
                borderRadius={20}
              >
                <Text style={{ color: "#60935D", fontWeight: "600" }}>
                  "A healthy outside starts{" "}
                </Text>
                <Text style={{ color: "#60935D", fontWeight: "600" }}>
                  from the inside."
                </Text>

                <Text style={{ color: "#60935D" }}>-Robert Urich</Text>
              </ImageBackground>
            </Card>
          </ScrollView>
        </SafeAreaView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 8,
  },
  header: { flex: 2, alignItems: "center", marginHorizontal: 8 },
  headerName: {
    marginTop: 15,
    marginLeft: 15,
    justifyContent: "center",
    alignSelf: "flex-start",
    flex: 0.3,
  },
  carousel: { flex: 0.8 },
  containerCardCarousel: {
    borderRadius: 20,
    padding: 0,
    margin: 10,
    marginVertical: 0,
    justifyContent: "center",
    width: windowWidth * 0.8,
    height: windowHeight * 0.12,
  },
  carouselImage: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.12,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapperCardCarousel: { justifyContent: "center", alignItems: "center" },
  nutrition: { flex: 1.5, justifyContent: "center", margin: 0 },
  weight: { flex: 1.5 },
});
