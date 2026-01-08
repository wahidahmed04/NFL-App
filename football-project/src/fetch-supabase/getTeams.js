import { supabase } from '../supabaseClient.js';
export async function getTeams(){
    const { data, error } = await supabase
    .from("teams")
    .select("*");

  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }

  return data; // array of rows
}
