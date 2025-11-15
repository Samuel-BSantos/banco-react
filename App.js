import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

const App = () => {
  const [valorMonetario, setValorMonetario] = useState(null);

  const link = `https://economia.awesomeapi.com.br/json/last/EUR-USD,GBP-USD,JPY-USD?token=e23b8ca52e07e7787de78db8cbc18719b1322f9c5890dad4a4416e6f2fa978ef`;

  useEffect(() => {
    axios
      .get(link)
      .then((response) => {
        setValorMonetario(response.data);
      })
      .catch((error) => console.error('API Error', error));
  }, []);

  const formatCurrency = (value) => {
    if (!value) return "0.00";
    return parseFloat(value).toFixed(2);
  };

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>My Wallet</Text>
        <Ionicons name="notifications-outline" size={26} color="#000" />
      </View>

      {/* BALANCE */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Current balance</Text>
        <Text style={styles.balanceValue}>$ 3,635</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyText}>Buy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sellButton}>
            <Text style={styles.sellText}>Sell</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* LISTA */}
      <ScrollView style={styles.walletList}>

        <View style={styles.walletItem}>
          <View style={styles.leftBlock}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>$</Text>
            </View>
            <Text style={styles.currencyLabel}>USD</Text>
          </View>

          <View style={styles.valuesBlock}>
            <Text style={styles.currencyValue}>${formatCurrency(1.00)}</Text>
            <Text style={styles.subValue}>${formatCurrency(1.00)}</Text>
          </View>
        </View>

        {valorMonetario ? (
          <>
            {/* EUR */}
            <View style={styles.walletItem}>
              <View style={styles.leftBlock}>
                <View style={styles.iconCircle}>
                  <Text style={styles.iconText}>€</Text>
                </View>
                <Text style={styles.currencyLabel}>EUR</Text>
              </View>

              <View style={styles.valuesBlock}>
                <Text style={styles.currencyValue}>
                  €{formatCurrency(valorMonetario["EURUSD"]?.ask)}
                </Text>
                <Text style={styles.subValue}>
                  ${formatCurrency(valorMonetario["EURUSD"]?.bid)}
                </Text>
              </View>
            </View>

            {/* GBP */}
            <View style={styles.walletItem}>
              <View style={styles.leftBlock}>
                <View style={styles.iconCircle}>
                  <Text style={styles.iconText}>£</Text>
                </View>
                <Text style={styles.currencyLabel}>GBP</Text>
              </View>

              <View style={styles.valuesBlock}>
                <Text style={styles.currencyValue}>
                  £{formatCurrency(valorMonetario["GBPUSD"]?.ask)}
                </Text>
                <Text style={styles.subValue}>
                  ${formatCurrency(valorMonetario["GBPUSD"]?.bid)}
                </Text>
              </View>
            </View>

            {/* JPY */}
            <View style={styles.walletItem}>
              <View style={styles.leftBlock}>
                <View style={styles.iconCircle}>
                  <Text style={styles.iconText}>¥</Text>
                </View>
                <Text style={styles.currencyLabel}>JPY</Text>
              </View>

              <View style={styles.valuesBlock}>
                <Text style={styles.currencyValue}>
                  ¥{formatCurrency(valorMonetario["JPYUSD"]?.ask)}
                </Text>
                <Text style={styles.subValue}>
                  ${formatCurrency(valorMonetario["JPYUSD"]?.bid)}
                </Text>
              </View>
            </View>
          </>
        ) : (
          <Text>Carregando...</Text>
        )}
      </ScrollView>

      {/* MENU INFERIOR */}
      <View style={styles.bottomMenu}>
        <Ionicons name="home-outline" size={28} color="#6C2BD9" />
        <Ionicons name="swap-horizontal-outline" size={28} color="#A0A0A0" />
        <Ionicons name="settings-outline" size={28} color="#A0A0A0" />
      </View>
    </View>
  );
};

/* ===================== ESTILO NOVO ===================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4EEFF",
    paddingHorizontal: 24,
    paddingTop: 55,
    paddingBottom: 80,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111",
  },

  balanceContainer: {
    alignItems: "center",
    marginTop: 25,
    marginBottom: 30,
  },
  balanceLabel: {
    color: "#8B8B8B",
    fontSize: 15,
  },
  balanceValue: {
    fontSize: 42,
    fontWeight: "800",
    color: "#000",
    marginTop: 5,
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 20,
    gap: 14,
  },

  buyButton: {
    backgroundColor: "#6C2BD9",
    paddingVertical: 12,
    paddingHorizontal: 45,
    borderRadius: 25,
    shadowColor: "#6C2BD9",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  buyText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },

  sellButton: {
    backgroundColor: "#EEE7FB",
    paddingVertical: 12,
    paddingHorizontal: 45,
    borderRadius: 25,
  },
  sellText: {
    color: "#6C2BD9",
    fontWeight: "700",
    fontSize: 16,
  },

  walletList: {
    flex: 1,
  },

  walletItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: "#FFF",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 18,
    marginBottom: 18,

    shadowColor: "#BEB2E3",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 3,
  },

  leftBlock: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#6C2BD9",
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "700",
  },

  currencyLabel: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 14,
    color: "#222",
  },

  valuesBlock: {
    alignItems: "flex-end",
  },
  currencyValue: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111",
  },
  subValue: {
    color: "#4AC38D",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 3,
  },

  bottomMenu: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingVertical: 18,
    borderTopWidth: 1,
    borderTopColor: "#DDD",
    backgroundColor: "#FFF",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default App;
