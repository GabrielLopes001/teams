import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";

export async function groupsGetAll() {
  try {
    const group = await AsyncStorage.getItem(GROUP_COLLECTION);
    const groups = group ? JSON.parse(group) : [];

    return groups
  } catch (error) {
    throw error
  }
}