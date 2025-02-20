import { BibleStudyLesson } from '../../../../types';

export function generateWisdomLessons(): BibleStudyLesson[] {
  return [
    {
      day: 151, // Starting after Historical Books
      title: "Introduction to Wisdom Literature",
      scripture: "Proverbs 1:1-7",
      content: "We begin our exploration of wisdom literature with the foundation of all wisdom - the fear of the Lord. This section introduces us to the purpose and value of godly wisdom in everyday life, showing how practical knowledge and spiritual insight are intertwined.",
      keyThemes: [
        "Fear of the Lord",
        "Wisdom's value",
        "Spiritual discernment",
        "Practical knowledge"
      ],
      reflectionQuestions: [
        "What is the difference between knowledge and wisdom?",
        "How does 'fear of the Lord' lead to wisdom?",
        "Why is wisdom described as more valuable than gold?",
        "How can we cultivate godly wisdom in our lives?"
      ],
      practicalApplication: "Write down three areas where you need God's wisdom today. Commit to seeking His guidance through Scripture and prayer in these specific situations.",
      completed: false
    },
    {
      day: 152,
      title: "The Path of Wisdom",
      scripture: "Proverbs 2:1-22",
      content: "Today's passage reveals how to actively pursue wisdom and its rewards. We learn that wisdom requires diligent seeking, like searching for hidden treasure. The text also contrasts the paths of wisdom and foolishness, showing their different outcomes.",
      keyThemes: [
        "Seeking wisdom",
        "Divine protection",
        "Moral discernment",
        "Life choices"
      ],
      reflectionQuestions: [
        "What steps does this passage outline for finding wisdom?",
        "How does wisdom protect us from wrong paths?",
        "What role does God play in giving wisdom?",
        "How can we apply this wisdom in daily decisions?"
      ],
      practicalApplication: "Choose one area of decision-making in your life and apply the principles of seeking wisdom outlined in this chapter.",
      completed: false
    }
  ];
}