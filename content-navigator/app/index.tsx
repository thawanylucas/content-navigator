import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import { useRouter } from "expo-router";

import { api } from "@/src/services/api";
import { RandomUser, RandomUserResponse } from "@/src/types/randomUsers";
import { Colors } from "@/src/constants/theme";

export default function Home() {
  const [users, setUsers] = useState<RandomUser[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await api.get<RandomUserResponse>("?results=20");
        setUsers(response.data.results);
      } catch (error) {
        console.error("Erro ao buscar usuários", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: theme.background,
        }}
      >
        <ActivityIndicator size="large" color={theme.text} />
      </View>
    );
  }

  return (
    <FlatList
      data={users}
      style={{ backgroundColor: theme.background }}
      keyExtractor={(item) => item.login.username}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/profile/[username]",
              params: {
                username: item.login.username,
                user: JSON.stringify(item),
              },
            })
          }
          style={{
            flexDirection: "row",
            padding: 16,
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: item.picture.thumbnail }}
            style={{
              width: 50,
              height:50,
              borderRadius: 24,
              marginRight: 12,
            }}
          />

          <Text
            style={{
              color: theme.text,
              fontSize: 16,
            }}
          >
            {item.name.first} {item.name.last}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}
