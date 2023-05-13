//import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

let state = (set) => ({
  user: '',
  setUser: (data) => set(() => ({ user: data })),

  email: '',
  setEmail: (data) => set(() => ({ email: data })),

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