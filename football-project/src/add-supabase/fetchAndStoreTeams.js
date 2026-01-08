import { supabase } from '../supabaseClient'

async function fetchAndStoreTeams() {
  try {
    // 1. Fetch teams from ESPN API
    const response = await fetch('http://site.api.espn.com/apis/site/v2/sports/football/nfl/teams')
    
    if (!response.ok) {
      throw new Error('Failed to fetch teams from ESPN')
    }

    const data = await response.json()
    
    // 2. Extract the teams array from the response
    const teams = data.sports[0].leagues[0].teams
    
    // 3. Map the ESPN data to match your Supabase schema
    const teamsToInsert = teams.map(teamObj => ({
      api_team_id: teamObj.team.id,
      name: teamObj.team.name,
      abbreviation: teamObj.team.abbreviation,
      city: teamObj.team.location,
      logo_url: teamObj.team.logos[0]?.href || null,
      conference: null, // ESPN doesn't provide this in teams endpoint
      division: null,
      color: teamObj.team.color,
      alternate_color: teamObj.team.alternateColor
    }))

    // 4. Insert into Supabase
    const { data: insertedData, error } = await supabase
      .from('teams')
      .upsert(teamsToInsert, { 
        onConflict: 'api_team_id',
        ignoreDuplicates: false 
      })
      .select()

    if (error) {
      console.error('Error storing teams in Supabase:', error)
      return { success: false, error }
    }

    console.log('Successfully stored teams:', insertedData)
    return { success: true, data: insertedData }

  } catch (error) {
    console.error('Error in fetchAndStoreTeams:', error)
    return { success: false, error: error.message }
  }
}

export default fetchAndStoreTeams