export const BASE_URL = process.env.BASE_URL || "http://localhost:3002/";

export const SUPABASE_ERROR_CODES = {
  NO_ROWS_FOUND: "PGRST116",
};

export const isValidHttpUrl = (u: string) => {
  try {
    const x = new URL(u);
    return x.protocol === "http:" || x.protocol === "https:";
  } catch {
    return false;
  }
};
