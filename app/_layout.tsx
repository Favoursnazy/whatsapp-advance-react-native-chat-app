import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Link, Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import Colors from "@/constants/Colors";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Cache the Clerk JWT
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (error) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (error) {
      return;
    }
  },
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const IntialLayout = () => {
  const router = useRouter();
  const segMents = useSegments();
  const { isLoaded, isSignedIn } = useAuth();

  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // useEffect(() => {
  //   if (!isLoaded) return;

  //   const inTabsGroup = segMents[0] === "(tabs)";

  //   if (isSignedIn && !inTabsGroup) {
  //     router.replace("/(tabs)/chats");
  //   } else if (!isSignedIn) {
  //     router.replace("/");
  //   }

  //   console.log("isSignedIn changed", isSignedIn);
  // }, [isSignedIn]);

  // if (!loaded || !isLoaded) {
  //   return <View />;
  // }

  return (
    <Stack>
      <Stack.Screen
        name="modals/newChat"
        options={{
          title: "New Chat",
          headerTransparent: true,
          headerBlurEffect: "regular",
          presentation: "modal",
          animation: "slide_from_bottom",
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTitleAlign: "center",
          headerSearchBarOptions: {
            placeholder: "Search name or number",
            hideWhenScrolling: false,
          },
          headerRight: () => (
            <Link href={"/(tabs)/chats"} asChild>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.lightGray,
                  borderRadius: 20,
                  padding: 4,
                }}
              >
                <Ionicons name="close" color={Colors.gray} size={30} />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="otp"
        options={{
          headerTitle: "Enter your phone number",
          headerTitleAlign: "center",
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="verify/[phone]"
        options={{
          headerTitle: "Enter your phone OTP",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

const RootLayoutNav = () => {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <IntialLayout />
    </ClerkProvider>
  );
};

export default RootLayoutNav;
