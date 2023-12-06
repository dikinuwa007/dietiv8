import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState, useRef } from "react";
import { recomendation } from "../components/Image";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import userStore from "../stores/userStore";
import LottieView from "lottie-react-native";

import Body from "../components/Body";
// import { useIsFocused } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const baseUrl = "http://13.250.41.248/";

export default function Home() {
  const getAcc = userStore((state) => state.getAccessToken);
  const accessToken = userStore((state) => state.access_token);
  const [food, setFood] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
    snack: false,
  });

  const [checklist, setChecklist] = useState({});
  const [menu, setMenu] = useState({});
  const [usermenu, setUsermenu] = useState({});
  const [loading, setLoading] = useState(true);
  const [menuDatabase, setMenuDatabase] = useState(false);
  const [historyId, setHistoryId] = useState(0);

  const addSnack = async (foods) => {
    try {
      console.log(foods);
      const dayEat = foods;
      const nameFood = menu[foods];
      const calorieFood = menu[foods + "Calorie"];
      const patchFoodData = {
        name: nameFood,
        eaten: dayEat,
        calorie: calorieFood,
      };
      console.log(patchFoodData);
      const { data } = await axios({
        method: "PATCH",
        url: baseUrl + "menus/" + historyId,
        data: patchFoodData,
        headers: {
          access_token: accessToken,
        },
      });
      const whatEaten = foods + "Eaten";
      setMenu((menu) => {
        return { ...menu, [whatEaten]: true };
      });
      setFood((food) => {
        return { ...food, [foods]: true };
      });
    } catch (error) {}
  };

  const fetchHistory = async (access_token) => {
    try {
      setLoading(true);
      const { data } = await axios.get(baseUrl + "histories/now", {
        headers: {
          access_token,
        },
      });
      setHistoryId(data.id);
      if (!data?.Menu) throw { name: "kosong" };
      const menuData = data.Menu;
      console.log(menuData);
      setMenu(menuData);
      setMenuDatabase(true);
      return true;
    } catch (error) {
      console.log(error?.response?.data);
      setMenuDatabase(false);
      return false;
    }
  };

  const getRecomend = async () => {
    const token = await getAcc();
    const checkMenu = await fetchHistory(token);
    // fetch history menu
    // history menu ada ga jalan
    // kalo ga ada yang bawah jalan
    try {
      //! Ini fungsi ketika fetch berjalan lama maka akan throw error
      function newAbortSignal(timeoutMs) {
        const abortController = new AbortController();
        setTimeout(() => abortController.abort(), timeoutMs || 0);

        return abortController.signal;
      }

      console.log(checkMenu, "<<<<<<<<<<<<<<<<<<<<<<<<<<<,");
      if (checkMenu) throw { name: "menu_database" };
      console.log("jalan fetch aii");
      setLoading(true);
      const { data } = await axios.get(baseUrl + "openai/menu", {
        headers: {
          access_token: accessToken,
        },
        // timeout: 5000,
        signal: newAbortSignal(5000), // ini nyambung sama yang fungsi fetch berjalan lama
      });
      console.log("<-- setelah fetch");
      if (
        !data.breakfast ||
        !data.breakfastCalorie ||
        !data.lunch ||
        !data.lunchCalorie ||
        !data.dinner ||
        !data.dinnerCalorie ||
        !data.snack ||
        !data.snackCalorie
      ) {
        throw { name: "data kosong" };
      }
      setMenu(data);
      setChecklist(() => {
        return {
          ...data,
        };
      });
    } catch (error) {
      console.log(error, "<-- error di catch");
      if (error.code === "ECONNABORTED") {
        console.log(error, "dari axios timeout");
      } else if (error.name === "menu_database") {
        console.log("Ada Menu Dari Database ");
        return;
      } else {
        console.log(error?.response?.data);
      }
      const menuDefault = {
        breakfast: "Bubur Ayam",
        breakfastCalorie: 250,
        lunch: "Ikan Panggang",
        lunchCalorie: 200,
        dinner: "Salad",
        dinnerCalorie: 165,
        snack: "Apple Fruit",
        snackCalorie: 52,
      };
      setMenu(menuDefault);
      setChecklist(menuDefault);
    } finally {
      console.log("<-- sampai finally");
      setTimeout(() => {
        setLoading(false);
        console.log("masuk sini");
      }, 2000);
    }
  };

  const addFood = async () => {
    console.log("awal");
    try {
      const { data } = await axios({
        method: "post",
        url: baseUrl + "menus/" + historyId,
        data: checklist,
        headers: {
          access_token: accessToken,
        },
      });
      console.log("jalan");
      setUsermenu(data);
      setMenuDatabase(true);
    } catch (error) {
      console.log(error?.response?.data, "<<<< error add food");
    } finally {
      // setLoading(false);
      // setTimeout(() => {
      //   setLoading(false);
      // }, 5000);
    }
  };

  useEffect(() => {
    getRecomend();
    console.log("halaman mealplan <<<<<<<<");
    console.log(usermenu, "<<data usermenu");
  }, []);

  // useEffect(() => {
  //   console.log(checklist, "<<<< ini POST BOS");
  // }, [checklist]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LottieView
          autoPlay
          style={{
            width: 400,
            height: 400,
          }}
          source={require("../assets/loading.json")}
        />
      </View>
    );
  }

  return (
    <>
      <Body>
        <View style={styles.recomendationContainer}>
          <SafeAreaView>
            <View style={{ marginTop: 50 }}>
              <Text style={styles.title}>Recommended Food</Text>
              <Text style={styles.title}>Personalized</Text>
              <Text
                style={[styles.title, { color: "#ffb12b", fontWeight: "800" }]}
              >
                For You
              </Text>
            </View>
          </SafeAreaView>
          <Image source={recomendation} style={styles.image}></Image>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 20,
            marginTop: 20,
            marginBottom: 5,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "500", marginRight: 10 }}>
            List Food
          </Text>
          {!menuDatabase ? (
            <Pressable onPress={getRecomend}>
              <FontAwesome name="refresh" size={24} color="green" />
            </Pressable>
          ) : (
            ""
          )}
        </View>
        {!menuDatabase ? (
          <Pressable
            style={{
              backgroundColor: "green",
              marginLeft: 20,
              padding: 5,
              width: 70,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 7,
              flexDirection: "row",
            }}
            onPress={addFood}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
                color: "white",
                marginRight: 10,
              }}
            >
              Add
            </Text>
            <FontAwesome name="spoon" size={24} color="white" />
          </Pressable>
        ) : (
          ""
        )}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.containerContent}>
            {/* Breakfast */}
            <View style={styles.listFood}>
              <View>
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: 16,
                    marginBottom: 5,
                    marginTop: -20,
                    color: "grey",
                    alignSelf: "flex-start",
                  }}
                >
                  Breakfast
                </Text>
                <Text style={{ fontWeight: "600", fontSize: 22 }}>
                  {menu?.breakfast || ""}
                </Text>
                <Text style={{ fontSize: 14 }}>
                  {menu?.breakfastCalorie || 0} Calories
                </Text>
              </View>
              {menuDatabase ? (
                menu.breakfastEaten ? (
                  <AntDesign name="checkcircle" size={30} color="#60935D" />
                ) : (
                  <MaterialCommunityIcons
                    name="food-fork-drink"
                    size={35}
                    color="#60935D"
                    onPress={() => addSnack("breakfast")}
                  />
                )
              ) : (
                ""
              )}
            </View>

            {/* Lunch */}
            <View style={styles.listFood}>
              <View>
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: 16,
                    marginBottom: 5,
                    marginTop: -20,
                    color: "grey",
                    alignSelf: "flex-start",
                  }}
                >
                  Lunch
                </Text>
                <Text style={{ fontWeight: "600", fontSize: 22 }}>
                  {menu?.lunch || ""}
                </Text>
                <Text style={{ fontSize: 14 }}>
                  {menu?.lunchCalorie || 0} Calories
                </Text>
              </View>
              {menuDatabase ? (
                menu.lunchEaten ? (
                  <AntDesign name="checkcircle" size={30} color="#60935D" />
                ) : (
                  <MaterialCommunityIcons
                    name="food-fork-drink"
                    size={35}
                    color="#60935D"
                    onPress={() => addSnack("lunch")}
                  />
                )
              ) : (
                ""
              )}
            </View>

            {/* Dinner */}
            <View style={styles.listFood}>
              <View>
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: 16,
                    marginBottom: 5,
                    marginTop: -20,
                    color: "grey",
                    alignSelf: "flex-start",
                  }}
                >
                  Dinner
                </Text>
                <Text style={{ fontWeight: "600", fontSize: 22 }}>
                  {menu?.dinner || ""}
                </Text>
                <Text style={{ fontSize: 14 }}>
                  {menu?.dinnerCalorie || 0} Calories
                </Text>
              </View>
              {menuDatabase ? (
                menu.dinnerEaten ? (
                  <AntDesign name="checkcircle" size={30} color="#60935D" />
                ) : (
                  <MaterialCommunityIcons
                    name="food-fork-drink"
                    size={35}
                    color="#60935D"
                    onPress={() => addSnack("dinner")}
                  />
                )
              ) : (
                ""
              )}
            </View>
            {/* Snack */}
            <View style={styles.listFood}>
              <View>
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: 16,
                    marginBottom: 5,
                    marginTop: -20,
                    color: "grey",
                    alignSelf: "flex-start",
                  }}
                >
                  Snack
                </Text>
                <Text style={{ fontWeight: "600", fontSize: 22 }}>
                  {menu?.snack || ""}
                </Text>
                <Text style={{ fontSize: 14 }}>
                  {menu?.snackCalorie || 0} Calories
                </Text>
              </View>
              {menuDatabase ? (
                menu.snackEaten ? (
                  <AntDesign name="checkcircle" size={30} color="#60935D" />
                ) : (
                  <MaterialCommunityIcons
                    name="food-fork-drink"
                    size={35}
                    color="#60935D"
                    onPress={() => addSnack("snack")}
                  />
                )
              ) : (
                ""
              )}
            </View>
          </View>
        </ScrollView>
      </Body>
    </>
  );
}

const styles = StyleSheet.create({
  recomendationContainer: {
    flexDirection: "row",
    height: 280,
    backgroundColor: "#60935D",
    borderBottomRightRadius: 150,
    zIndex: 2,
  },
  image: {
    width: 350,
    height: 350,
    marginTop: 50,
    marginLeft: -50,
    zIndex: 2,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
    marginLeft: 20,
  },
  containerContent: {
    padding: 20,
    paddingTop: 0,
    zIndex: -1,
    // backgroundColor: "red",
  },
  listFood: {
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    flexDirection: "row",
    marginTop: 20,
    backgroundColor: "white",
    height: 130,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4.59,
    elevation: 5,
    overflow: "hidden",
  },
  button: {
    backgroundColor: "transparent",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    padding: 10,
    backgroundColor: "blue",
  },
});
