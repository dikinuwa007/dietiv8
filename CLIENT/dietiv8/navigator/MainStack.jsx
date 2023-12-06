import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderStyleInterpolators } from "@react-navigation/stack";
import Home from "../pages/Home";

import Achievement from "../pages/Achievement"

import Login from "../pages/Login";
import MainTab from "./MainTab";
import Register from "../pages/Register";
import Name from "../components/Name";
import Email from "../components/Email";
import Password from "../components/Password";
import Motivation from "../components/Motivaton";
import Splash from "../components/Splash";
import Profile from "../components/Profile";
import Activity from "../components/Activity";
import Goals from "../components/Goals";
import Gender from "../components/Gender";
import Graph from "../pages/Graph"




export default function MainStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
    initialRouteName="Register"
      screenOptions={{
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="Name"
        component={Name}
        options={{
          headerShown: false,
          animation: "slide_from_bottom",
          
        }}
      />
      <Stack.Screen
        name="email"
        component={Email}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="password"
        component={Password}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="motivation"
        component={Motivation}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="profile"
        component={Profile}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="activity"
        component={Activity}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="goals"
        component={Goals}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="gender"
        component={Gender}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="maintab"
        component={MainTab}
        options={{
          headerShown: false,
          animationTypeForReplace: "push",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="Achievement"
        component={Achievement}
      />
      <Stack.Screen
        name="Graph"
        component={Graph}
        options={{
          headerShown: false,
          animation: "slide_from_bottom",
          
        }}
      />
    </Stack.Navigator>
  );
}
