import { supabase } from "/src/supabaseClient.js";
export async function getPlayers(){
    const {data, error} = await supabase
    .from("players")
    .select("*")
    if (error) {
    console.error("Supabase error:", error);
    throw error;
  }
  return data
}