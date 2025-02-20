import { BibleStudyLesson } from '../../../../types';

export function generateGospelLessons(): BibleStudyLesson[] {
  return [
    {
      day: 271, // Starting after Prophetic Books
      title: "The Word Became Flesh",
      scripture: "John 1:1-18",
      content: "We begin our study of the Gospels with John's profound prologue, which connects Jesus to the creation account in Genesis. This passage establishes Jesus' divine nature and His role in both creation and redemption. The concept of the Word (Logos) becoming flesh reveals God's ultimate plan to make Himself known to humanity.",
      keyThemes: [
        "Deity of Christ",
        "Incarnation",
        "Divine revelation",
        "Light and darkness"
      ],
      reflectionQuestions: [
        "How does John's opening compare to Genesis 1?",
        "What does it mean that Jesus is the Word?",
        "How does Jesus reveal God to us?",
        "What role does light play in this passage?"
      ],
      practicalApplication: "Consider how Jesus, as the Light of the world, illuminates your understanding of God. Journal about specific ways His light has dispelled darkness in your life.",
      completed: false
    },
    {
      day: 272,
      title: "The Birth of Jesus",
      scripture: "Luke 2:1-20",
      content: "Luke's detailed account of Jesus' birth combines historical precision with divine significance. The humble circumstances of Christ's birth, contrasted with the glorious angelic announcement to shepherds, reveals God's pattern of working through the lowly to accomplish His purposes.",
      keyThemes: [
        "Humility",
        "Divine timing",
        "Good news",
        "Worship"
      ],
      reflectionQuestions: [
        "Why did God choose such humble circumstances for Jesus' birth?",
        "What does the shepherds' response teach us about worship?",
        "How does this account demonstrate God's sovereignty?",
        "What aspects of the Christmas story surprise you?"
      ],
      practicalApplication: "Practice humility today by serving someone in a way that might seem beneath your status or comfort level.",
      completed: false
    }
  ];
}