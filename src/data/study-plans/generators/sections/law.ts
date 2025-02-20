import { BibleStudyLesson } from '../../../../types';

export function generateLawLessons(): BibleStudyLesson[] {
  return [
    {
      day: 1,
      title: "Creation and Divine Order",
      scripture: "Genesis 1:1-2:3",
      content: "We begin our Old Testament journey with God's creation of the heavens and earth. This foundational text establishes God's sovereignty, power, and purposeful design in creation. Each day reveals God's orderly nature and the inherent goodness of His work.",
      keyThemes: [
        "Divine creation",
        "God's sovereignty",
        "Order and purpose",
        "Goodness of creation"
      ],
      reflectionQuestions: [
        "What does the creation account reveal about God's character?",
        "How does God's orderly creation inform our understanding of His nature?",
        "What significance is there in humans being created in God's image?",
        "How should creation influence our worship?"
      ],
      practicalApplication: "Take time today to observe and document specific examples of God's creative power and wisdom in nature. Consider how you can better fulfill your role as a steward of creation.",
      completed: false
    },
    {
      day: 2,
      title: "The Fall and Promise",
      scripture: "Genesis 3:1-24",
      content: "Today we examine the tragic entrance of sin into the world and God's immediate promise of redemption. This pivotal passage sets up the redemptive theme that runs throughout Scripture, showing both the devastating effects of sin and God's gracious response.",
      keyThemes: [
        "Sin's origin",
        "Divine judgment",
        "Redemptive promise",
        "Consequences of disobedience"
      ],
      reflectionQuestions: [
        "How does the serpent's temptation strategy still work today?",
        "What immediate and long-term consequences followed the fall?",
        "Where do you see God's grace in this passage?",
        "How does this passage point to Christ?"
      ],
      practicalApplication: "Identify patterns of temptation in your life and develop specific strategies for resistance based on God's Word.",
      completed: false
    }
  ];
}