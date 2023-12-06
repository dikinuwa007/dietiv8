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
import DateTimePicker from "@react-native-community/datetimepicker";
import registerStore from "../stores/registerStore";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Profile() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [target, setTarget] = useState("");
  const [dob, setDob] = useState("");
  const [dates, setDates] = useState(new Date());
  const [show, setShow] = useState(false);
  const setWeightStore = registerStore((state) => state.setWeight);
  const setHeightStore = registerStore((state) => state.setHeight);
  const setDateBirthStore = registerStore((state) => state.setDateBirth);
  const setTargetWeightStore = registerStore((state) => state.setTargetWeight);
  const navigation = useNavigation();

  const toggleDate = () => {
    setShow(!show);
  };

  const formatDate = (date) => {
    let newDate = new Date(date);

    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let day = newDate.getDate();

    return `${day}-${month}-${year}`;
  };

  function goToActivity() {
    setWeightStore(weight);
    setHeightStore(height);
    setDateBirthStore(dates);
    setTargetWeightStore(target);
    navigation.navigate("activity");
  }

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDates(currentDate);
      setDob(formatDate(currentDate));
      toggleDate();
    }
  };

  function validator() {
    if (weight && height && target && dob) {
      return dob;
    }
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>Complete your</Text>
        <Text style={[styles.text, { marginTop: 0 }]}>Health Profile</Text>
        <View style={styles.containerContent}>
          <View>
            <View style={styles.weight}>
              <Text style={styles.inputTitle}>Current Weight</Text>
              <View style={styles.kg}>
                <TextInput
                  style={styles.input}
                  onChangeText={setWeight}
                  value={weight}
                  cursorColor={"#88bd1e"}
                  // underlineColorAndroid="black"
                  disableFullscreenUI={true}
                  inputMode="numeric"
                />
                <Text
                  style={{
                    marginLeft: -15,
                    fontWeight: "400",
                    position: "relative",
                    paddingLeft: "1%",
                  }}
                >
                  kg
                </Text>
              </View>
            </View>
            <View style={styles.weight}>
              <Text style={styles.inputTitle}>Target Weight</Text>
              <View style={styles.kg}>
                <TextInput
                  style={styles.input}
                  onChangeText={setTarget}
                  value={target}
                  cursorColor={"#88bd1e"}
                  // underlineColorAndroid="black"
                  disableFullscreenUI={true}
                  inputMode="numeric"
                />
                <Text style={{ marginLeft: -15, fontWeight: "400" }}>kg</Text>
              </View>
            </View>
            <View style={styles.weight}>
              <Text style={styles.inputTitle}>Height</Text>
              <View style={styles.kg}>
                <TextInput
                  style={styles.input}
                  onChangeText={setHeight}
                  value={height}
                  cursorColor={"#88bd1e"}
                  // underlineColorAndroid="black"
                  disableFullscreenUI={true}
                  inputMode="numeric"
                />
                <Text style={{ marginLeft: -15, fontWeight: "400" }}>cm</Text>
              </View>
            </View>
            <Pressable style={styles.weight} onPress={toggleDate}>
              <Text style={{ fontWeight: "500" }}>Date of Birth</Text>
              <View style={styles.kg}>
                <Text style={{ marginLeft: -15, fontWeight: "400" }}>
                  {dob}
                </Text>
              </View>
            </Pressable>
            {show && (
              <DateTimePicker
                mode="date"
                display="spinner"
                value={dates}
                onChange={onChange}
                maximumDate={new Date()}
              />
            )}
          </View>
          <View>
            {validator() ? (
              <Pressable style={styles.btn} onPress={goToActivity}>
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
    marginTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
    width: windowWidth,
    height: windowHeight - 230,
    justifyContent: "space-between",
  },
  text: {
    marginTop: 70,
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center",
  },
  weight: {
    marginTop: 20,
    backgroundColor: "#d9d9d9",
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 7,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    position: "relative",
    // borderWidth: 1,
    // borderColor: "grey",
    width: "93%",
    padding: 5,
    textAlign: "right",
    fontWeight: "500",
  },
  inputTitle: {
    fontWeight: "500",
    position: "absolute",
    paddingLeft: 15,
  },
  inputBack: {},
  txtBtn: {
    color: "white",
    fontSize: 22,
    fontWeight: "800",
  },
  btn: {
    marginTop: 40,
    width: windowWidth - 40,
    height: 60,
    backgroundColor: "#55a64e",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
