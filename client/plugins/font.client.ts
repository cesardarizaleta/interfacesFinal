export default defineNuxtPlugin(async () => {
  const { loadAssignedFonts, applyFontsToPage } = useFonts()

  try {
    await loadAssignedFonts()
    applyFontsToPage()
  } catch (error) {
    console.error('Error loading fonts:', error)
  }
})