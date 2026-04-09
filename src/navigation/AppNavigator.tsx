import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppIcon } from "@/components/ui/Icon";
import { useTheme } from "@/hooks/useTheme";
import { HomeScreen } from "@/screens/HomeScreen";
import { ProductDetailsScreen } from "@/screens/ProductDetailsScreen";
import { ProductsScreen } from "@/screens/ProductsScreen";
import { ProfileScreen } from "@/screens/ProfileScreen";
import React from "react";

type RootTabParamList = {
  HomeTab: undefined;
  ProductsTab: undefined;
  ProfileTab: undefined;
};

type HomeStackParamList = {
  Home: undefined;
  HomeProductDetail: { productId: string };
  HomeProducts: undefined;
};

type ProductsStackParamList = {
  ProductDetail: { productId: string };
  Products: undefined;
};

type ProfileStackParamList = {
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const ProductsStack = createNativeStackNavigator<ProductsStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const HomeTabIcon = ({ color, focused }: { color: string; focused: boolean }) => {
  return (
    <AppIcon color={color} name={focused ? "home" : "home-outline"} size={22} />
  );
};

const ProductsTabIcon = ({
  color,
  focused,
}: {
  color: string;
  focused: boolean;
}) => {
  return (
    <AppIcon color={color} name={focused ? "bag" : "bag-outline"} size={22} />
  );
};

const ProfileTabIcon = ({
  color,
  focused,
}: {
  color: string;
  focused: boolean;
}) => {
  return (
    <AppIcon
      color={color}
      name={focused ? "person-circle" : "person-circle-outline"}
      size={22}
    />
  );
};

export const AppNavigator = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        animation: "fade",
        headerShown: false,
        sceneStyle: {
          backgroundColor: theme.background,
        },
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.secondaryText,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginBottom: 6,
          marginTop: 4,
        },
        tabBarStyle: {
          backgroundColor: theme.tabBar,
          borderTopColor: theme.border,
          height: 68,
          paddingTop: 6,
          paddingBottom: 10,
        },
      }}
    >
      <Tab.Screen
        component={HomeStackNavigator}
        name="HomeTab"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: HomeTabIcon,
        }}
      />
      <Tab.Screen
        component={ProductsStackNavigator}
        name="ProductsTab"
        options={{
          tabBarLabel: "Products",
          tabBarIcon: ProductsTabIcon,
        }}
      />
      <Tab.Screen
        component={ProfileStackNavigator}
        name="ProfileTab"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ProfileTabIcon,
        }}
      />
    </Tab.Navigator>
  );
};

const HomeStackNavigator = () => {
  const { theme } = useTheme();

  return (
    <HomeStack.Navigator screenOptions={getStackScreenOptions(theme)}>
      <HomeStack.Screen name="Home" options={{ title: "Home" }}>
        {({ navigation }) => (
          <HomeScreen
            onOpenProductsTab={() =>
              navigation.getParent()?.navigate("ProductsTab")
            }
            onOpenStackProducts={() => navigation.navigate("HomeProducts")}
          />
        )}
      </HomeStack.Screen>
      <HomeStack.Screen
        name="HomeProducts"
        options={{ title: "Featured products" }}
      >
        {({ navigation }) => (
          <ProductsScreen
            description="This products list is pushed from the Home tab stack."
            heading="Featured products"
            kicker="Home"
            onSelectProduct={(productId) =>
              navigation.navigate("HomeProductDetail", { productId })
            }
          />
        )}
      </HomeStack.Screen>
      <HomeStack.Screen
        name="HomeProductDetail"
        options={{ title: "Product details" }}
      >
        {({ route }) => (
          <ProductDetailsScreen productId={route.params.productId} />
        )}
      </HomeStack.Screen>
    </HomeStack.Navigator>
  );
};

const ProductsStackNavigator = () => {
  const { theme } = useTheme();

  return (
    <ProductsStack.Navigator screenOptions={getStackScreenOptions(theme)}>
      <ProductsStack.Screen name="Products" options={{ title: "Products" }}>
        {({ navigation }) => (
          <ProductsScreen
            description="Example catalog screen with a list-to-detail stack flow."
            heading="Products list"
            kicker="Products"
            onSelectProduct={(productId) =>
              navigation.navigate("ProductDetail", { productId })
            }
          />
        )}
      </ProductsStack.Screen>
      <ProductsStack.Screen
        name="ProductDetail"
        options={{ title: "Product details" }}
      >
        {({ route }) => (
          <ProductDetailsScreen productId={route.params.productId} />
        )}
      </ProductsStack.Screen>
    </ProductsStack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ProfileStack.Navigator screenOptions={getStackScreenOptions(theme)}>
      <ProfileStack.Screen name="Profile" options={{ title: "Profile" }}>
        {() => <ProfileScreen onToggleTheme={toggleTheme} />}
      </ProfileStack.Screen>
    </ProfileStack.Navigator>
  );
};

const getStackScreenOptions = (
  theme: ReturnType<typeof useTheme>["theme"],
) => ({
  contentStyle: {
    backgroundColor: theme.background,
  },
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: theme.background,
  },
  headerTintColor: theme.primaryText,
  headerTitleStyle: {
    color: theme.primaryText,
    fontSize: 18,
    fontWeight: "700" as const,
  },
});
