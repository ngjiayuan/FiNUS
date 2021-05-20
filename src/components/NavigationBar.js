import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";

const AccountRoute = () => <Text>Account</Text>;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

export const NavigationBar = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "account", title: "Account", icon: "account" },
    { key: "albums", title: "Albums", icon: "album" },
    { key: "recents", title: "Recents", icon: "history" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    account: AccountRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
  });

  return (
    <BottomNavigation
      shifting={true}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};
