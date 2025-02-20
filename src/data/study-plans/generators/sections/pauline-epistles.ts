import { BibleStudyLesson } from '../../../../types';

export function generatePaulineEpistlesLessons(): BibleStudyLesson[] {
  return [
    {
      day: 41,
      title: "The Gospel of Grace",
      scripture: "Romans 1:1-17",
      content: "We begin our study of Paul's letters with his masterful introduction to Romans, where he presents the gospel's power and the theme of righteousness by faith. This foundational passage sets the stage for understanding salvation through Christ.",
      keyThemes: [
        "Gospel power",
        "Righteousness by faith",
        "Universal need",
        "Divine calling"
      ],
      reflectionQuestions: [
        "What makes the gospel 'the power of God for salvation'?",
        "How is righteousness revealed in the gospel?",
        "What does it mean to live 'by faith'?",
        "How should we respond to this gospel?"
      ],
      practicalApplication: "Write out your own definition of the gospel and compare it with Paul's presentation. Share this good news with someone today.",
      completed: false
    },
    {
      day: 42,
      title: "Life in the Spirit",
      scripture: "Romans 8:1-17",
      content: "This pivotal passage explores the transformative power of life in the Spirit, contrasting it with life under the law. Paul explains our adoption as God's children and the Spirit's role in our sanctification.",
      keyThemes: [
        "Spirit-led life",
        "Freedom from condemnation",
        "Divine adoption",
        "Spiritual transformation"
      ],
      reflectionQuestions: [
        "What does it mean to be 'in Christ Jesus'?",
        "How does the Spirit help us overcome sin?",
        "What privileges come with being God's children?",
        "How do we cultivate a Spirit-led life?"
      ],
      practicalApplication: "Identify areas where you need the Spirit's help to overcome sin. Develop specific strategies for walking in the Spirit.",
      completed: false
    }
  ];
}