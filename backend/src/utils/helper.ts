export const formatMobile = (mobile: string) => {
  return mobile.startsWith("+") ? mobile : `+${mobile}`;
};
