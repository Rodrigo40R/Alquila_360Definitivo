export const validarCampo = (valor: string) => {
  if (!valor || valor.trim() === "") return false;
  return true;
};
