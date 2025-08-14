import React from "react";
import { create } from "zustand";
import api from "../api/axios";
const useStore = create((set,get) => ({
  
  claims: [],
  fetchClaims: async () => {
    try {
      const response = await api.post("/get-claims-data");
      const data = response.data;

      set({ claims: data.allclaimsdata || [] });
    } catch (error) {
      console.error('Error fetching claims:', error);
    }
  },
  createClaim: async (data) => {
    try {
      const res = await api.post("/create-claim-data", data);
      set((state) => ({ claims: [...state.claims, res.data] }));
    } catch (error) {
      console.error("Error creating production:", error);
    }
  },
 deleteClaim: async (id) => {
    try {
      await api.post(`/delete-claims-data/${id}`);
      await get().fetchClaims();
    } catch (err) {
      console.error("Delete error:", err);
      throw err; 
    }
  },


  production: [],

  fetchProduction: async () => {
    try {
      const response = await api.post("/get-production-data");
      const data = response.data;

      set({ production: data.allproductiondata || [] });
    } catch (error) {
      console.error('Error fetching production:', error);
    }
  },
  createProduction: async (data) => {
    try {
      const res = await api.post("/create-production-data", data);
      set((state) => ({ production: [...state.production, res.data] }));
    } catch (error) {
      console.error("Error creating production:", error);
    }
  },
 deleteProduction: async (id) => {
    try {
      await api.post(`/delete-production-data/${id}`);
      await get().fetchProduction();
    } catch (err) {
      console.error("Delete error:", err);
      throw err; 
    }
  },

  
  activePath: "/claim", 
  setActivePath: (path) => set({ activePath: path }),activeForm: "/claim",

  
}));

export default useStore;
