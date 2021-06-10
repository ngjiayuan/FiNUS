import React, { useContext } from "react";
import { SafeAreaView, Text, Button } from "react-native";

import { AuthenticationContext } from "../../service/authentication/authentication.context";

export function AnalysisScreen() {
  const { onLogout } = useContext(AuthenticationContext);

  return (
    <SafeAreaView>
      <Text>Analysis placeholder</Text>
      <Button title="Logout" onPress={onLogout} />
    </SafeAreaView>
  );
}
