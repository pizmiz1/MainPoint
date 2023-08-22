<MyDrawer.Navigator
  screenOptions={{
    headerStyle: {
      backgroundColor: colors.secondary,
    },
    headerTintColor: colors.textColors.headerText,
    headerTitleStyle: { fontSize: 20, fontWeight: "bold" },
    headerShadowVisible: false,
    drawerStyle: {
      backgroundColor: running ? colors.primary : bColor(),
    },
    drawerActiveBackgroundColor: running ? colors.primary : bColor(),
    drawerActiveTintColor: colors.textColors.headerText,
    drawerInactiveTintColor: colors.textColors.headerText,
    headerRight: () => SwitchIconComp(props),
  }}
  useLegacyImplementation={true}
  initialRouteName={myInitialRoute}
  screenListeners={async (state) => {
    await AsyncStorage.setItem(
      "Last Route",
      JSON.stringify({
        data: state.route.name,
      })
    );
  }}
>
  {running ? (
    <MyDrawer.Group>
      <MyDrawer.Screen
        name="Fitness Running Day"
        component={RunningDay}
        options={{
          headerTitle: dayDisp,
          drawerLabel: ({ focused, color }) => (
            <Text
              style={{
                fontWeight: focused ? "bold" : "normal",
                textDecorationLine: focused ? "underline" : "none",
                color,
                fontSize: 20,
              }}
            >
              Program
            </Text>
          ),
        }}
      />
      <MyDrawer.Screen
        name="Fitness Running Edit"
        component={RunningEdit}
        options={{
          headerTitle: "Edit",
          drawerLabel: ({ focused, color }) => (
            <Text
              style={{
                fontWeight: focused ? "bold" : "normal",
                textDecorationLine: focused ? "underline" : "none",
                color,
                fontSize: 20,
              }}
            >
              Edit
            </Text>
          ),
        }}
      />
      <MyDrawer.Screen
        name="Fitness Running Total"
        component={RunningTotal}
        options={{
          headerTitle: "Total",
          drawerLabel: ({ focused, color }) => (
            <Text
              style={{
                fontWeight: focused ? "bold" : "normal",
                textDecorationLine: focused ? "underline" : "none",
                color,
                fontSize: 20,
              }}
            >
              Total
            </Text>
          ),
        }}
      />
      <MyDrawer.Screen
        name="Fitness Running Week"
        component={RunningWeek}
        options={{
          headerTitle: "Week of " + weekDisp,
          drawerItemStyle: {
            display: "none",
          },
        }}
      />
    </MyDrawer.Group>
  ) : (
    <MyDrawer.Group>
      <MyDrawer.Screen
        name="Fitness Day"
        component={FitnessDay}
        options={{
          headerTitle: dayDisp,
          drawerLabel: ({ focused, color }) => (
            <Text
              style={{
                fontWeight: focused ? "bold" : "normal",
                textDecorationLine: focused ? "underline" : "none",
                color,
                fontSize: 20,
              }}
            >
              Program
            </Text>
          ),
        }}
      />
      <MyDrawer.Screen
        name="Fitness Edit"
        component={FitnessEdit}
        options={{
          headerTitle: "",
          drawerLabel: ({ focused, color }) => (
            <Text
              style={{
                fontWeight: focused ? "bold" : "normal",
                textDecorationLine: focused ? "underline" : "none",
                color,
                fontSize: 20,
              }}
            >
              Edit
            </Text>
          ),
        }}
      />
      <MyDrawer.Screen
        name="Fitness Daily Food"
        component={FitnessDailyFood}
        options={{
          headerTitle: dayDisp,
          headerStyle: {
            backgroundColor: color,
          },
          drawerLabel: ({ focused, color }) => (
            <Text
              style={{
                fontWeight: focused ? "bold" : "normal",
                textDecorationLine: focused ? "underline" : "none",
                color,
                fontSize: 20,
              }}
            >
              Daily Food
            </Text>
          ),
        }}
      />
      <MyDrawer.Screen
        name="Fitness Maxes"
        component={FitnessMaxes}
        options={{
          headerTitle: "Maxes",
          drawerLabel: ({ focused, color }) => (
            <Text
              style={{
                fontWeight: focused ? "bold" : "normal",
                textDecorationLine: focused ? "underline" : "none",
                color,
                fontSize: 20,
              }}
            >
              Maxes
            </Text>
          ),
        }}
      />
      <MyDrawer.Screen
        name="Fitness Week"
        component={FitnessWeek}
        options={{
          headerTitle: "Week of " + weekDisp,
          drawerItemStyle: {
            display: "none",
          },
        }}
      />
    </MyDrawer.Group>
  )}
</MyDrawer.Navigator>;
