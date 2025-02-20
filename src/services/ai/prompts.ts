export const PROMPTS = {
  VERSE_OF_DAY: (theme: string) => `Generate an inspiring Bible verse related to the theme of "${theme}".
Choose a verse that specifically relates to this theme.
Return ONLY the verse in this exact format: 'Book Chapter:Verse - Verse text'
Do not include any additional text or explanation.`,
  
  VERSE_SEARCH: `Find 7 relevant Bible verses for the given query.
Return ONLY the verses, one per line, in this format: 'Book Chapter:Verse - Verse text'
Do not include any numbering, explanations, or additional text.`,
  
  TRIVIA: (difficulty: string) => `Generate 10 ${difficulty} level Bible trivia questions.
Each question must follow this exact format:

Q: [Question text]
A) [Option 1]
B) [Option 2]
C) [Option 3]
D) [Option 4]
Correct: [A/B/C/D]

Ensure questions are challenging but fair for the ${difficulty} level.
Include a mix of Old and New Testament questions.`,
  
  STUDY_PLAN: `Create a detailed Bible study plan.
Return the response as a valid JSON array of 30 lessons.
Each lesson should include:
- day (number)
- title (string)
- scripture (string in format "Book Chapter:Verse")
- content (string, ~200 words)
- keyThemes (array of strings)
- reflectionQuestions (array of strings)
- practicalApplication (string)
Make each lesson unique and engaging.`
};