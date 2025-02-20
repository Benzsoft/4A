import { BibleStudyLesson } from '../../../../types';

export function generatePropheticLessons(): BibleStudyLesson[] {
  return [
    {
      day: 201, // Starting after Wisdom Literature
      title: "Introduction to the Prophets",
      scripture: "Isaiah 1:1-20",
      content: "We begin our journey through the prophetic books with Isaiah's powerful call to repentance. This passage introduces the prophetic role in calling God's people back to covenant faithfulness, combining warnings of judgment with promises of restoration.",
      keyThemes: [
        "Prophetic calling",
        "Divine justice",
        "Repentance",
        "Covenant faithfulness"
      ],
      reflectionQuestions: [
        "What was the role of prophets in Israel's history?",
        "How does God's call for justice relate to worship?",
        "What parallels do you see between Isaiah's time and today?",
        "How do we maintain authentic worship?"
      ],
      practicalApplication: "Examine your own spiritual life for areas where religious ritual might have replaced genuine relationship with God. Write down specific steps to restore authenticity in your worship.",
      completed: false
    },
    {
      day: 202,
      title: "The Servant's Mission",
      scripture: "Isaiah 42:1-9",
      content: "Today we explore one of Isaiah's Servant Songs, prophetic passages that point to the coming Messiah. This text reveals God's heart for justice and His plan for bringing light to the nations through His chosen servant.",
      keyThemes: [
        "Messianic prophecy",
        "Divine justice",
        "Global mission",
        "Gentle strength"
      ],
      reflectionQuestions: [
        "How does this passage point to Jesus?",
        "What qualities of the Servant are emphasized?",
        "How does God's justice differ from human justice?",
        "What is our role in bringing light to nations?"
      ],
      practicalApplication: "Identify one way you can demonstrate Christ-like servant leadership in your sphere of influence today.",
      completed: false
    }
  ];
}