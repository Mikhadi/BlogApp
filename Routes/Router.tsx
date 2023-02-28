import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { Loading } from "../components/Loading";
import { useAuth } from "../Contexts/AuthContext";

import AuthStack from "./AuthComponent";
import TabsStack from "./TabsComponent";

export const Router = () => {
    const {authData, loading} = useAuth();

    if (loading) {
      return <Loading />;
    }
    return (
      <NavigationContainer>
        {authData?.status == 200 ? <TabsStack /> : <AuthStack />}
      </NavigationContainer>
    );
  };