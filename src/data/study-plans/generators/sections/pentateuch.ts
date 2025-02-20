import { BibleStudyLesson } from '../../../../types';

export function generatePentateuchLessons(): BibleStudyLesson[] {
  return [
    {
      day: 1,
      title: "Creation and God's Purpose",
      scripture: "Genesis 1:1-2:3",
      content: "We begin our journey through Scripture with the creation account. God, through His infinite power and wisdom, creates the heavens and earth. Each day of creation reveals God's orderly nature and purposeful design. The repetition of 'God saw that it was good' emphasizes the inherent value and purpose of all creation.",
      keyThemes: [
        "Creation",
        "God's sovereignty",
        "Divine order",
        "Purpose in creation"
      ],
      reflectionQuestions: [
        "What does the creation account reveal about God's character?",
        "How does seeing God as Creator impact your daily life?",
        "What pattern do you see in how God creates?",
        "What does it mean to be created in God's image?"
      ],
      practicalApplication: "Take time today to observe and appreciate God's creation around you. Consider how you can better fulfill your role as a steward of His creation.",
      completed: false
    },
    {
      day: 2,
      title: "The Fall and Promise",
      scripture: "Genesis 2:4-3:24",
      content: "Today we explore humanity's fall into sin and God's immediate promise of redemption. The passage reveals both the devastating effects of sin and God's gracious response, setting up the redemptive theme that runs throughout Scripture.",
      keyThemes: [
        "Human free will",
        "Sin and its consequences",
        "God's mercy",
        "Promise of redemption"
      ],
      reflectionQuestions: [
        "What does this passage reveal about human nature?",
        "How do you see the effects of the fall in today's world?",
        "What hope can we find in God's response to sin?",
        "How does this story point to our need for Christ?"
      ],
      practicalApplication: "Reflect on areas where you struggle with temptation. Write down God's promises that help you resist sin.",
      completed: false
    }
  ];
}