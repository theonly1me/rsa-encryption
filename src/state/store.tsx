import { create } from "zustand";

export const useStore = create<{
  publicKey: string;
  privateKey: string;
}>(set => ({
  publicKey: "",
  privateKey: "",
}));
