import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Pressable,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar } from "@rneui/themed";

import Body from "../components/Body";
import CardAddMenus from "../components/CardAddMenu";
import { useEffect, useState } from "react";
import axios from "axios";
import userStore from "../stores/userStore";
import { AntDesign } from "@expo/vector-icons";
import Dialog from "react-native-dialog";
import { FontAwesome5 } from "@expo/vector-icons";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const baseUrl = "http://13.250.41.248/";

export default function AddMenus() {
  const accessToken = userStore((state) => state.access_token);
  const [search, setSearch] = useState("");
  const [historyId, setHistoryId] = useState("");
  const [foods, setFoods] = useState([]);
  const [visible, setVisible] = useState(false);
  const [text, onChangeText] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  };
  const inputMenu = () => {};

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const alertSuccess = () => {
    Alert.alert("Success", "Input food success", [
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            "This alert was dismissed by tapping outside of the alert dialog."
          ),
      },
    ]);
  };

  const handleAdd = async () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    // setVisible(false);
    try {
      // await axios.post(baseUrl + "foods" + historyId, { food: text });
      const { data } = await axios({
        method: "post",
        url: baseUrl + "foods/" + historyId,
        data: {
          food: text,
        },
        headers: {
          access_token: accessToken,
        },
      });
      // if (data.message === "Food has been inputed") {
      setVisible(false);
      alertSuccess();
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchHistory = async (access_token) => {
    try {
      const { data } = await axios.get(baseUrl + "histories/now", {
        headers: {
          access_token: accessToken,
        },
      });
      setHistoryId(data.id);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const fetchFoods = async () => {
    try {
      const response = await axios.get(baseUrl + "foods", {
        headers: {
          access_token: accessToken,
        },
      });
      setFoods(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFoods();
    fetchHistory();
  }, []);

  // useEffect(() => {
  //   console.log(text);
  // }, [text]);

  const searchEnter = async () => {
    console.log(search);
    try {
      const response = await axios.get(
        "http://13.250.41.248/foods?filter=" + search,
        {
          headers: {
            access_token: accessToken,
          },
        }
      );
      setFoods(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Body>
        <SafeAreaView style={styles.container}>
          <View style={{ width: windowWidth }}>
            <SearchBar
              placeholder="Search food"
              value={search}
              containerStyle={{ backgroundColor: "transparent" }}
              inputContainerStyle={{ backgroundColor: "white" }}
              onChangeText={updateSearch}
              lightTheme={true}
              inputStyle={{ color: "black" }}
              round={true}
              onSubmitEditing={() => searchEnter()}
              onClear={() => fetchFoods()}
            />
          </View>
          <FlatList
            data={foods}
            renderItem={({ item }) => (
              <CardAddMenus key={item.id} item={item} id={item.id} />
            )}
          />
          <Pressable style={styles.newMenu} onPress={showDialog}>
            <AntDesign name="pluscircle" size={60} color="green" />
          </Pressable>

          <Dialog.Container visible={visible}>
            <Dialog.Title>Enter Your Food</Dialog.Title>
            <Dialog.Input
              cursorColor={"green"}
              style={styles.inputStyle}
              value={text}
              onChangeText={onChangeText}
            />
            <Dialog.Button
              label="Cancel"
              onPress={handleCancel}
              style={{ color: "green" }}
            />
            <Dialog.Button
              label="Save"
              onPress={handleAdd}
              style={{ color: "green" }}
            />
          </Dialog.Container>
        </SafeAreaView>
      </Body>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  newMenu: {
    position: "absolute",
    top: windowHeight - 130,
    left: windowWidth - 90,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 60,
  },
  inputStyle: {},
});
