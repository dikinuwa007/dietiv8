import { StatusBar } from "expo-status-bar";
// import {Navi} from '@react-navigation/native'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
  Button,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Recipes from "../components/Recipes";
import Food from "../assets/food.png";
import HistoryFood from "../components/HistoryFood";
import userStore from "../stores/userStore";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const baseUrl = "http://13.250.41.248/";

export default function Home() {
  const getAcc = userStore((state) => state.getAccessToken);
  const accessToken = userStore((state) => state.access_token);
  const dataHistory = userStore((state) => state.dataHistory);
  const [history, setHistory] = useState({});
  const [calorie, setCalorie] = useState("");
  const [user, setUser] = useState({});
  const [bmi, setBmi] = useState({});

  const getFood = async () => {
    await getAcc();
    try {
      const { data } = await axios.get(baseUrl + "histories/now", {
        headers: {
          access_token: accessToken,
        },
      });
      setHistory(data.Food);
      setCalorie(data.calorieLimit);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getUser = async () => {
    try {
      const { data } = await axios.get(baseUrl + "users/1", {
        headers: {
          access_token: accessToken,
        },
      });
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getBMI = async () => {
    try {
      const { data } = await axios.get(baseUrl + "fitnes/bmi", {
        headers: {
          access_token: accessToken,
        },
      });
      setBmi(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFood();
    getUser();
    getBMI();
  }, []);

  return (
    <>
      <Recipes>
        <View
          style={{
            backgroundColor: "white",
            flex: 1,
            marginTop: 100,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            padding: 30,
          }}
        >
          <Image source={Food} style={styles.food}></Image>
          <Text style={styles.txt}>Your food</Text>
          <Text style={styles.txt}>
            eaten <Text style={{ color: "#FF8811" }}>today</Text>
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 30,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome5 name="fire" size={22} color="#60935D" />
              <Text
                style={{
                  marginLeft: 5,
                  color: "#60935D",
                  fontWeight: "500",
                  fontSize: 14,
                }}
              >
                {calorie} cal
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome5 name="weight" size={20} color="#60935D" />
              <Text
                style={{
                  marginLeft: 5,
                  color: "#60935D",
                  fontWeight: "500",
                  fontSize: 14,
                }}
              >
                {user.weight} kg
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="weight-lifter"
                size={26}
                color="#60935D"
              />
              <Text
                style={{
                  marginLeft: 5,
                  color: "#60935D",
                  fontWeight: "500",
                  fontSize: 14,
                }}
              >
                {bmi.bmi} bmi
              </Text>
            </View>
          </View>
          <View style={styles.card}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "500",
                color: "#084205",
                marginBottom: 10,
              }}
            >
              History
            </Text>
            <FlatList
              data={history}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <HistoryFood key={index} item={item} />
              )}
            />
          </View>
          {/* <HistoryFood /> */}
        </View>
      </Recipes>
    </>
  );
}

const styles = StyleSheet.create({
  food: {
    height: 350,
    width: 350,
    position: "absolute",
    top: -200,
    right: -120,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    // elevation: 8,
  },
  txt: {
    fontWeight: "700",
    fontSize: 30,
  },
  card: {
    marginTop: 30,
    height: 470,
    width: 350,
    // backgroundColor: "red",
    // borderRadius: 12,
  },
  icon: {
    height: 55,
    width: 55,
    marginRight: 10,
    backgroundColor: "#fff7f2",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
  },
});
