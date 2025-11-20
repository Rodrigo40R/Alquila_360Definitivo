"use client";

export function loginUser(rol: string, email: string) {
  localStorage.setItem("user", JSON.stringify({ rol, email }));
}

export function getUser() {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("user");
  return data ? JSON.parse(data) : null;
}

export function logoutUser() {
  localStorage.removeItem("user");
}

export function isAuthorizedRol(rol: string) {
  const user = getUser();
  return user && user.rol === rol;
}
