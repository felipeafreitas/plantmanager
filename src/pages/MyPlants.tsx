import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import colors from "../styles/colors";

import waterdrop from "../assets/waterdrop.png";
import { loadPlant, PlantProps } from "../libs/storage";
import { formatDistance } from "date-fns/esm";

function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();

  useEffect(() => {
    async function loadStorageData() {
      const plantsStoraged = await loadPlant();

      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      );

      setNextWatered(
        `Não esqueça de regar a ${plantsStoraged[0].name} à ${nextTime} horas.`
      );

      setMyPlants(plantsStoraged);
      setLoading(false);
    }
    loadStorageData();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.spotlight}>
        <Image source={waterdrop} style={styles.spotlightImage} />
        <Text style={StyleSheet.spotlightText}>{nextWatered}</Text>
        <View style={StyleSheet.plants}>
          <Text style={styles.plantsTitle}>Próximas</Text>
        </View>
      </View>
    </View>
  );
}

export default MyPlants;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background,
  },
});
