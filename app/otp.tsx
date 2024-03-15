import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaskInput from "react-native-mask-input";
import {
  SignedIn,
  isClerkAPIResponseError,
  useSignIn,
  useSignUp,
} from "@clerk/clerk-expo";

const NIGERIA_PHONE = [
  `+`,
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

const otp = () => {
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();
  const keyBoardVerticalOffset = Platform.OS === "ios" ? 90 : 0;
  const { bottom } = useSafeAreaInsets();
  const { signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();

  const openLink = () => {
    Linking.openURL("https://github.com/favoursnazy");
  };

  const sendOTP = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      // await signUp!.create({
      //   phoneNumber,
      // });

      // signUp!.preparePhoneNumberVerification();

      router.push(`/verify/${phoneNumber}`);
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (isClerkAPIResponseError(error)) {
        if (error.errors[0].code === "form_identifier_exists") {
          console.log("user exists");
          await trySignIn();
        } else {
          setLoading(false);
          Alert.alert("Error", error.errors[0].message);
        }
      }
    }
  };

  const trySignIn = async () => {
    const { supportedFirstFactors } = await signIn!.create({
      identifier: phoneNumber,
    });

    const firstPhoneFactor: any = supportedFirstFactors.find((factor: any) => {
      return factor.strategy === "phone_code";
    });

    const { phoneNumberId } = firstPhoneFactor;

    await signIn!.prepareFirstFactor({
      strategy: "phone_code",
      phoneNumberId,
    });

    router.push(`/verify/${phoneNumber}?signin=true`);
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={keyBoardVerticalOffset}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        {loading && (
          <View style={[StyleSheet.absoluteFill, styles.loading]}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text
              style={{
                marginTop: 10,
                color: "#fff",
                fontSize: 18,
                padding: 10,
              }}
            >
              Sending code...
            </Text>
          </View>
        )}
        <Text style={styles.description}>
          Whatsapp will need to verify your account. carrier charges may apply
        </Text>
        <View style={styles.list}>
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>Nigeria</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
          </View>
          <View style={styles.seperator} />
          <MaskInput
            value={phoneNumber}
            keyboardType="numeric"
            autoFocus
            placeholder="+234 your phone number"
            style={styles.input}
            onChangeText={(masked, unmasked) => {
              setPhoneNumber(masked);
            }}
            mask={NIGERIA_PHONE}
          />
        </View>
        <Text style={styles.legal}>
          You must be{" "}
          <Text style={styles.link} onPress={openLink}>
            at least 16 years old
          </Text>{" "}
          to register. Learn how whatsapp works with the{" "}
          <Text style={styles.link} onPress={openLink}>
            Meta Companies
          </Text>
        </Text>
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          style={[
            styles.button,
            phoneNumber !== "" ? styles.enabled : null,
            { marginBottom: bottom },
          ]}
          onPress={sendOTP}
        >
          <Text
            style={[
              styles.buttonText,
              phoneNumber !== "" ? styles.buttontextEnabled : null,
            ]}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.background,
    gap: 20,
  },
  description: {
    fontSize: 14,
    color: Colors.gray,
  },
  list: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 10,
    padding: 10,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 6,
    marginBottom: 10,
  },
  listItemText: {
    fontSize: 18,
    color: Colors.primary,
  },
  seperator: {
    width: "100%",
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.gray,
    opacity: 0.4,
  },
  legal: {
    fontSize: 12,
    textAlign: "center",
    color: "#000",
  },
  link: {
    color: Colors.primary,
  },
  button: {
    width: "100%",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    padding: 10,
    borderRadius: 10,
  },
  enabled: {
    backgroundColor: Colors.primary,
    color: "#fff",
  },
  buttonText: {
    color: Colors.gray,
    fontSize: 22,
    fontWeight: "500",
  },
  buttontextEnabled: {
    color: "#fff",
  },
  input: {
    backgroundColor: "#fff",
    width: "100%",
    fontSize: 16,
    padding: 6,
    marginTop: 10,
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default otp;
