import { BibleStudyLesson } from '../../../../types';

export function generateGospelsActsLessons(): BibleStudyLesson[] {
  return [
    {
      day: 1,
      title: "The Word Became Flesh",
      scripture: "John 1:1-18",
      content: "We begin our New Testament journey with John's profound prologue, establishing Jesus' divine nature and eternal existence. This passage connects Jesus to Genesis 1, revealing His role in creation and His mission to make God known to humanity.",
      keyThemes: [
        "Deity of Christ",
        "Incarnation",
        "Divine revelation",
        "Light and darkness"
      ],
      reflectionQuestions: [
        "How does John's opening parallel Genesis 1?",
        "What does it mean that Jesus is the Word?",
        "How does Jesus reveal God to us?",
        "What significance is there in Jesus being called 'light'?"
      ],
      practicalApplication: "Reflect on how Jesus has revealed God to you personally. Journal about specific ways His light has illuminated your understanding of God.",
      completed: false
    },
    {
      day: 2,
      title: "The Birth of Jesus",
      scripture: "Luke 2:1-20",
      content: "Luke's detailed account of Jesus' birth combines historical precision with profound theological significance. The humble circumstances of Christ's birth, contrasted with the glorious angelic announcement, reveals God's pattern of working through the lowly.",
      keyThemes: [
        "Divine humility",
        "God's sovereignty",
        "Angelic revelation",
        "Shepherds' response"
      ],
      reflectionQuestions: [
        "Why did God choose such humble circumstances?",
        "What does the shepherds' response teach us?",
        "How does this narrative demonstrate God's sovereignty?",
        "What aspects of the Christmas story challenge our expectations?"
      ],
      practicalApplication: "Practice humility today by serving someone in a way that might seem beneath your status or comfort level.",
      completed: false
    }
  ];
}