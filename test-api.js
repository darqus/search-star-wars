// Simple test script to verify the API refactoring
const fetch = require('node-fetch')

// Test the new API endpoint
async function testAPI() {
  console.log('Testing the new Star Wars API...')

  try {
    // Test characters endpoint
    const response = await fetch(
      'https://star-wars-api-v3.netlify.app/api/v1/characters?limit=3'
    )
    const data = await response.json()

    console.log('Characters API Response:')
    console.log(`Total characters: ${data.info.total}`)
    console.log(`Returned: ${data.data.length} characters`)
    console.log(`First character: ${data.data[0].name}`)
    console.log(`Image path: ${data.data[0].image}`)

    // Test search functionality
    const searchResponse = await fetch(
      'https://star-wars-api-v3.netlify.app/api/v1/characters?search=luke'
    )
    const searchData = await searchResponse.json()

    console.log('\nSearch API Response for "luke":')
    console.log(`Found: ${searchData.info.total} results`)
    if (searchData.data.length > 0) {
      console.log(`First result: ${searchData.data[0].name}`)
    }

    console.log('\n✅ API refactoring successful!')
  } catch (error) {
    console.error('❌ API test failed:', error.message)
  }
}

testAPI()
