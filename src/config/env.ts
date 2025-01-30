const envImport = import.meta.env;

export const env = {
  API_URL: envImport.VITE_API_URL as string,
}