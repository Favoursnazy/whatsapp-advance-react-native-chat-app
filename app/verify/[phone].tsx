import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import Colors from "@/constants/Colors";
import {
  SignedIn,
  isClerkAPIResponseError,
  useSignIn,
  useSignUp,
} from "@clerk/clerk-expo";

const CELL_COUNT = 6;

const Page = () => {
  const { phone, signin } = useLocalSearchParams<{
    phone: string;
    signin: string;
  }>();
  const [code, setCode] = useState("");
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });
  const { signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (code.length === 6) {
      // TODO verify code
      // if (signin === "true") {
      //   verifySignin();
      // } else {
      //   verifyCode();
      // }
      setLoading(true);
      setTimeout(() => {
        router.replace("/(tabs)/chats");
        setLoading(false);
      }, 2000);
    }
  }, [code]);

  /** When i was working on this project i was using the clerk free tier so i couldnt send OTP,
   *
   * If your on the paid plan you chan check the code and remove the comment for verify code.
   *
   * and also on the root  _layout file useffect code.
   */
  const verifyCode = async () => {
    try {
      await signUp?.attemptPhoneNumberVerification({ code });

      await setActive!({ session: signUp!.createdSessionId });
    } catch (error) {
      console.log("error", JSON.stringify(error, null, 2));
      if (isClerkAPIResponseError(error)) {
        Alert.alert("Error", error.errors[0].message);
      }
    }
  };

  const verifySignin = async () => {
    try {
      await signIn!.attemptFirstFactor({
        strategy: "phone_code",
        code,
      });

      await setActive!({ session: signUp!.createdSessionId });
    } catch (error) {
      console.log("error", JSON.stringify(error, null, 2));
      if (isClerkAPIResponseError(error)) {
        Alert.alert("Error", error.errors[0].message);
      }
    }
  };

  const resendCode = async () => {
    try {
      if (signin === "true") {
        const { supportedFirstFactors } = await signIn!.create({
          identifier: phone,
        });

        const firstPhoneFactor: any = supportedFirstFactors.find(
          (factor: any) => {
            return factor.strategy === "phone_code";
          }
        );

        const { phoneNumberId } = firstPhoneFactor;

        await signIn!.prepareFirstFactor({
          strategy: "phone_code",
          phoneNumberId,
        });
      } else {
        await signUp!.create({
          phoneNumber: phone,
        });

        signUp!.preparePhoneNumberVerification();
      }
    } catch (error) {
      console.log("error", JSON.stringify(error, null, 2));
      if (isClerkAPIResponseError(error)) {
        Alert.alert("Error", error.errors[0].message);
      }
    }
  };

  return (
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
            Verifying...
          </Text>
        </View>
      )}
      <Text style={styles.legal}>
        We have you an SMS with a code to the number above
      </Text>
      <Text style={styles.legal}>
        To complete your phone number verification, please enter the 6-digits
        activation code
      </Text>
      <CodeField
        ref={ref}
        {...props}
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            key={index}
            style={[styles.cellRoot, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          Didint recieve a verification code?
        </Text>
      </TouchableOpacity>
    </View>
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
  loading: {
    backgroundColor: "rgba(0,0,0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  legal: {
    fontSize: 14,
    textAlign: "center",
    color: "#000",
  },
  button: {
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: Colors.primary,
    fontSize: 18,
  },
  codeFieldRoot: {
    marginTop: 20,
    width: 260,
    marginLeft: "auto",
    marginRight: "auto",
    gap: 8,
  },
  cellRoot: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  cellText: {
    color: "#000",
    fontSize: 36,
    textAlign: "center",
  },
  focusCell: {
    paddingBottom: 4,
    borderBottomColor: "#000",
    borderBottomWidth: 2,
  },
});

export default Page;
