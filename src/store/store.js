//import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

let state = (set) => ({
  /** 유저 */
  user: '',
  setUser: (data) => set(() => ({ user: data })),

  seminar: '',
  setSeminar: (data) => set(() => ({ seminar: data })),

  notice: '',
  setNotice: (data) => set(() => ({ notice: data })),
});

//const useStore = create(persist(state, {
//    name: "semo-storage",
//    storage: createJSONStorage(() => AsyncStorage),
//  }
//));

const useStore = create(state);

export default useStore;