import { BibleStudyLesson } from '../../../../types';

export function generatePoetryLessons(): BibleStudyLesson[] {
  return [
    {
      day: 121,
      title: "The Way of the Righteous",
      scripture: "Psalm 1:1-6",
      content: "We begin our exploration of biblical poetry with this foundational psalm that contrasts the path of the righteous with that of the wicked. This wisdom psalm establishes key themes that run throughout the Psalter: the importance of God's Word, the two ways of life, and divine judgment.",
      keyThemes: [
        "Wisdom's path",
        "God's Word",
        "Righteous living",
        "Divine judgment"
      ],
      reflectionQuestions: [
        "What characterizes the blessed person in this psalm?",
        "How does meditation on God's Word transform us?",
        "What does the tree metaphor teach about spiritual growth?",
        "How do you see these two paths illustrated in today's world?"
      ],
      practicalApplication: "Develop a specific plan for daily meditation on God's Word. Start by spending 15 minutes reflecting on today's passage.",
      completed: false
    },
    {
      day: 122,
      title: "The Glory of Creation",
      scripture: "Psalm 19:1-14",
      content: "This magnificent psalm explores God's revelation through both nature and Scripture. David poetically describes how creation declares God's glory and how His Word transforms the soul, providing a comprehensive view of divine revelation.",
      keyThemes: [
        "Natural revelation",
        "Scripture's perfection",
        "Heart transformation",
        "Divine guidance"
      ],
      reflectionQuestions: [
        "How does nature reveal God's character?",
        "What attributes of God's Word are highlighted?",
        "How do these two forms of revelation complement each other?",
        "What role should God's Word play in our daily lives?"
      ],
      practicalApplication: "Spend time observing God's creation today and write down specific ways it reveals His character. Compare these observations with truths from Scripture.",
      completed: false
    }
  ];
}