import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RouteNavigation from "../navigation";

const App = () => {
  return (
    <NavigationContainer>
      <RouteNavigation />
    </NavigationContainer>
  );
};

export default App;
