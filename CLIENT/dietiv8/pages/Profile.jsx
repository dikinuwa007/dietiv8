import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Body from "../components/Body";
import { useState, useEffect } from "react";
import axios from "axios";
import userStore from "../stores/userStore";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Home() {
  const accessToken = userStore((state) => state.access_token);
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  const [age, setAge] = useState(0);
  const [calorie, setCalorie] = useState({});

  const baseUrl = "http://13.250.41.248/";
  const access_token = userStore((state) => state.access_token);
  const logoutUser = userStore((state) => state.logout);
  const dataUser = async () => {
    const { data } = await axios.get(baseUrl + "users/1", {
      headers: {
        access_token: accessToken,
      },
    });
    let dob = new Date(data.dateBirth).getFullYear();
    let now = new Date().getFullYear();
    let activityLevel = data.activityLevel;
    if (activityLevel == 1) data.activityLevel = "Sedentary";
    else if (activityLevel == 2) data.activityLevel = "Exercise 1-3 times/week";
    else if (activityLevel == 3) data.activityLevel = "Exercise 4-5 times/week";
    else if (activityLevel == 4) data.activityLevel = "Daily exercise";
    else if (activityLevel == 5)
      data.activityLevel = "Intense exercise 6-7 times/week";
    else if (activityLevel == 6)
      data.activityLevel = "Very intense exercise daily";
    setAge(now - dob);
    setUser(data);
  };

  const dataCalorie = async () => {
    try {
      const { data } = await axios.get(baseUrl + "histories/now", {
        headers: { access_token },
      });
      setCalorie(data);
    } catch (error) {
      console.log(error, `<<<<<<<<ERROR`);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      navigation.navigate("Register");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dataUser();
    dataCalorie();
  }, []);

  return (
    <>
      <Body>
        <SafeAreaView style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.profile}>
              <View
                style={{
                  flexDirection: "row",
                  width: windowWidth * 0.8,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={styles.cardContainer}>
                  <View style={styles.cardWrapper}>
                    <Text style={{ fontSize: 10 }}>Your Weight</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                      {user.weight} kg
                    </Text>
                  </View>
                </View>

                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Image
                    style={styles.image}
                    source={{
                      uri: "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg",
                    }}
                  />
                </View>

                <View style={styles.cardContainer}>
                  <View style={styles.cardWrapper}>
                    <Text style={{ fontSize: 10 }}>Target Weight</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                      {user.targetWeight} kg
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.headerUsername}>
                <Text style={styles.profileName}>{user.username}</Text>
              </View>
            </View>
          </View>

          {/* Form */}
          <ScrollView>
            <View style={styles.detail}>
              {/* General */}
              <View>
                <View style={styles.detailheader}>
                  <Ionicons name="md-person" size={20} color="white" />
                  <Text style={styles.detailTitle}>General</Text>
                </View>
                <View style={styles.detailBody}>
                  <View style={styles.detailContent}>
                    <Text style={styles.detailName}>Gender</Text>
                    <Text style={styles.detailValue}>{user.gender}</Text>
                  </View>
                  <View
                    style={{
                      borderBottomColor: "black",
                      borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                  />
                  <View style={styles.detailContent}>
                    <Text style={styles.detailName}>Name</Text>
                    <Text style={styles.detailValue}>{user.username}</Text>
                  </View>
                  <View
                    style={{
                      borderBottomColor: "black",
                      borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                  />
                  <View style={styles.detailContent}>
                    <Text style={styles.detailName}>Age</Text>
                    <Text style={styles.detailValue}>{age}</Text>
                  </View>
                  <View
                    style={{
                      borderBottomColor: "black",
                      borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                  />
                  <View style={styles.detailContent}>
                    <Text style={styles.detailName}>Height</Text>
                    <Text style={styles.detailValue}>{user.height} cm</Text>
                  </View>
                  <View
                    style={{
                      borderBottomColor: "black",
                      borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                  />
                  <View style={styles.detailContent}>
                    <Text style={styles.detailName}>Current Weight</Text>
                    <Text style={styles.detailValue}>{user.weight} kg</Text>
                  </View>
                  <View
                    style={{
                      borderBottomColor: "black",
                      borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                  />
                  <View style={styles.detailContent}>
                    <Text style={styles.detailName}>Activity Level</Text>
                    <Text style={styles.detailValue}>{user.activityLevel}</Text>
                  </View>
                  <View
                    style={{
                      borderBottomColor: "black",
                      borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                  />
                </View>
              </View>

              {/* Goals */}
              <View style={{ marginTop: 20 }}>
                <View style={styles.detailheader}>
                  <MaterialCommunityIcons
                    name="target"
                    size={20}
                    color="white"
                  />
                  <Text style={styles.detailTitle}>Goals</Text>
                </View>
                <View style={styles.detailBody}>
                  <View style={styles.detailContent}>
                    <Text style={styles.detailName}>Target Weight</Text>
                    <Text style={styles.detailValue}>
                      {user.targetWeight} kg
                    </Text>
                  </View>
                  <View
                    style={{
                      borderBottomColor: "black",
                      borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                  />
                  <View style={styles.detailContent}>
                    <Text style={styles.detailName}>Calories a day</Text>
                    <Text style={styles.detailValue}>
                      {calorie.calorieLimit} cal
                    </Text>
                  </View>
                  <View
                    style={{
                      borderBottomColor: "black",
                      borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                  />
                </View>
              </View>
              {/* Logout */}
              <Pressable onPress={logout}>
                <View style={{ marginTop: 20 }}>
                  <View
                    style={[styles.detailBody, { backgroundColor: "#A71D31" }]}
                  >
                    <View
                      style={[
                        styles.detailContent,
                        { justifyContent: "center" },
                      ]}
                    >
                      <Text
                        style={[
                          styles.detailName,
                          { color: "white", fontWeight: "600" },
                        ]}
                      >
                        Logout
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Body>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    height: windowHeight * 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  headerUsername: {
    position: "absolute",
    justifyContent: "flex-end",
    paddingBottom: 30,
    height: windowHeight * 0.3,
  },
  profile: {
    alignItems: "center",
    justifyContent: "center",
    height: windowHeight * 0.3,
    position: "absolute",
  },
  detail: {
    backgroundColor: "#60935D",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
  },
  cardContainer: {
    height: 80,
    width: 80,
    padding: 0,
    borderRadius: 10,
    margin: 0,
    marginHorizontal: 0,
  },
  cardWrapper: {
    height: 80,
    width: 80,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 20,
  },

  detailTitle: {
    fontSize: 20,
    fontWeight: "500",
    marginLeft: 7,
    color: "white",
  },
  detailName: { fontSize: 18, fontWeight: "400" },
  detailValue: { fontSize: 18 },

  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    color: "black",
    fontSize: 22,
    fontWeight: "600",
    width: "300",
    margin: 10,
  },

  detailheader: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
    marginBottom: 8,
  },
  detailBody: {
    backgroundColor: "white",
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  detailContent: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
});
