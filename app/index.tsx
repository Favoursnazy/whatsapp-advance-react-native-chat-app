import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import WelcomeImage from "@/assets/images/welcome.png";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
const welcome_image = Image.resolveAssetSource(WelcomeImage).uri;

const Page = () => {
  const openLink = () => {
    Linking.openURL("https://github.com/favoursnazy");
  };
  return (
    <View style={styles.container}>
      <Image source={{ uri: welcome_image }} style={styles.welcome} />
      <Text style={styles.headline}>Welcome to whatsapp Clone</Text>
      <Text style={styles.description}>
        Read our{" "}
        <Text style={styles.link} onPress={openLink}>
          Privacy Policy
        </Text>
        . {'Tap "Agree & Continue to accept the'}
        <Text style={styles.link} onPress={openLink}>
          Terms of service
        </Text>
        .
      </Text>
      <Link href={"/otp"} replace asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Agree & Continue</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  welcome: {
    width: "100%",
    height: 300,
    marginBottom: 80,
  },
  headline: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 80,
    color: Colors.gray,
  },
  link: {
    color: Colors.primary,
  },

  button: {
    width: "100%",

    alignItems: "center",
  },
  buttonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.primary,
  },
});

export default Page;
