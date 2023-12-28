import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { playersGetByGroup } from "./playersGetByGroup";

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string) {
  
  try {

    const storedPlayer = await playersGetByGroup(group)

    const playerAlreadyExist = storedPlayer.filter(player => player.name === newPlayer.name);

    if(playerAlreadyExist.length > 0){
      throw new AppError('Esta pessoa já esta adicionada a um time aqui.')
    }

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, JSON.stringify([...storedPlayer, newPlayer]));

  } catch (error) {
    throw error
  }
}