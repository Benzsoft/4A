import { BibleStudyLesson } from '../../../../types';

export function generateGeneralEpistlesLessons(): BibleStudyLesson[] {
  return [
    {
      day: 81,
      title: "Faith and Works",
      scripture: "James 2:14-26",
      content: "James addresses the vital relationship between faith and works, challenging superficial faith that doesn't result in action. This practical passage helps us understand how genuine faith manifests in daily life.",
      keyThemes: [
        "Living faith",
        "Practical Christianity",
        "Faith in action",
        "Genuine belief"
      ],
      reflectionQuestions: [
        "How do faith and works relate to each other?",
        "What characterizes dead faith?",
        "How do Abraham and Rahab exemplify living faith?",
        "Where might your faith need more action?"
      ],
      practicalApplication: "Choose one specific way to put your faith into action today. Document how this experience deepened your understanding of living faith.",
      completed: false
    },
    {
      day: 82,
      title: "Growing in Christ",
      scripture: "2 Peter 1:3-11",
      content: "Peter provides a progressive pattern for spiritual growth, showing how divine power enables godly living. This passage emphasizes our responsibility to actively participate in spiritual development.",
      keyThemes: [
        "Spiritual growth",
        "Divine enablement",
        "Character development",
        "Christian maturity"
      ],
      reflectionQuestions: [
        "What role does God's power play in our growth?",
        "How do these virtues build upon each other?",
        "Why is continual growth important?",
        "Which virtue needs most development in your life?"
      ],
      practicalApplication: "Create a personal growth plan focusing on one of the virtues mentioned. Set specific goals for development.",
      completed: false
    }
  ];
}