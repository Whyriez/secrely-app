'use client';


export const getAuthToken = () => {
  if (typeof window !== 'undefined') { 
    return localStorage.getItem("accessToken");
  }
  return null;
};


export const setAuthToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem("accessToken", token);
  }
};


export const removeAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem("accessToken");
  }
};