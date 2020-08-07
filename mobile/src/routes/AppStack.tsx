import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Landing from "../pages/Landing";
import GiveClass from "../pages/GiveClasses";
import StudyTabs from "./StudyTabs";

const { Navigator, Screen } = createStackNavigator();

function AppStack() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Landing" component={Landing} />
        <Screen name="GiveClass" component={GiveClass} />
        <Screen name="Study" component={StudyTabs}/>

      </Navigator>
    </NavigationContainer>
  );
}

export default AppStack;
