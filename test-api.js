const { getDataFromApi } = require('./src/utils/getDataFromApi.js')

// Simple test to verify API integration
async function testAPI() {
  console.log('Testing new Star Wars API v3...\n')

  try {
    // Test characters search
    console.log('1. Testing characters search with "sky":')
    const charactersResult = await getDataFromApi('characters', 'sky', 5)
    console.log(`Found ${charactersResult.results.length} characters`)
    console.log(`Total available: ${charactersResult.total}`)
    if (charactersResult.results.length > 0) {
      console.log(`First result: ${charactersResult.results[0].name}`)
      console.log(`Image: ${charactersResult.results[0].image}`)
    }
    console.log()

    // Test vehicles search
    console.log('2. Testing vehicles search with "fighter":')
    const vehiclesResult = await getDataFromApi('vehicles', 'fighter', 3)
    console.log(`Found ${vehiclesResult.results.length} vehicles`)
    console.log(`Total available: ${vehiclesResult.total}`)
    if (vehiclesResult.results.length > 0) {
      console.log(`First result: ${vehiclesResult.results[0].name}`)
      console.log(`Image: ${vehiclesResult.results[0].image}`)
    }
    console.log()

    // Test species without search
    console.log('3. Testing species endpoint (no search):')
    const speciesResult = await getDataFromApi('species', '', 2)
    console.log(`Found ${speciesResult.results.length} species`)
    console.log(`Total available: ${speciesResult.total}`)
    if (speciesResult.results.length > 0) {
      console.log(`First result: ${speciesResult.results[0].name}`)
      console.log(`Image: ${speciesResult.results[0].image}`)
    }

    console.log('\n✅ All API tests completed successfully!')
  } catch (error) {
    console.error('❌ API test failed:', error.message)
  }
}

testAPI()
