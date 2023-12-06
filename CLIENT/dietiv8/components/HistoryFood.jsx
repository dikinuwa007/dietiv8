import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

export default function HistoryFood({ item }) {
  const [format, setFormat] = useState("");

  const formatDate = (date) => {
    let newDate = new Date(date);

    let options = {
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
    };

    return new Intl.DateTimeFormat("id-ID", options).format(newDate);
  };

  useEffect(() => {
    console.log(item, "<<<");
    setFormat(formatDate(item.FoodEaten.createdAt));
  }, []);

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <View style={styles.icon}>
          <MaterialCommunityIcons
            name="food-turkey"
            size={32}
            color="#FE5F00"
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            width: 270,
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: 230 }}>
            <Text style={{ fontWeight: 500, fontSize: 18, color: "#084205" }}>
              {item.name}
            </Text>
            <Text style={{ color: "grey", fontSize: 12 }}>{format}</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontWeight: 500, fontSize: 18, color: "#084205" }}>
              {item.calorie}
            </Text>
            <Text style={{ color: "grey", fontSize: 12 }}>Calories</Text>
          </View>
        </View>
      </View>
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
    height: 100,
    // backgroundColor: "grey",
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
