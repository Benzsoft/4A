import { BibleStudyLesson } from '../../../../types';

export function generateActsEpistlesLessons(): BibleStudyLesson[] {
  return [
    {
      day: 331,
      title: "Birth of the Church",
      scripture: "Acts 2:1-47",
      content: "We begin our study of Acts with the dramatic events of Pentecost, marking the birth of the Church. The Holy Spirit's outpouring fulfills Jesus' promise and empowers the disciples for their global mission. Peter's sermon demonstrates the bold proclamation of the gospel and results in the first major conversion of believers.",
      keyThemes: [
        "Holy Spirit's power",
        "Church formation",
        "Gospel proclamation",
        "Christian community"
      ],
      reflectionQuestions: [
        "How does Pentecost fulfill Old Testament prophecies?",
        "What role does the Holy Spirit play in the Church?",
        "How does the early Church model community life?",
        "What elements of Peter's sermon are essential for evangelism?"
      ],
      practicalApplication: "Identify ways you can contribute to building authentic Christian community in your local church. Consider how you might be more responsive to the Holy Spirit's leading.",
      completed: false
    },
    {
      day: 332,
      title: "Paul's Conversion",
      scripture: "Acts 9:1-31",
      content: "Today we witness the dramatic conversion of Saul (Paul), demonstrating God's power to transform lives and His sovereign choice in calling people to service. This pivotal event shapes the future of the early Church and the spread of the gospel to the Gentiles.",
      keyThemes: [
        "Divine intervention",
        "Transformation",
        "God's calling",
        "Christian witness"
      ],
      reflectionQuestions: [
        "How does Paul's conversion demonstrate God's grace?",
        "What role does Ananias play in this story?",
        "How does this event impact the early Church?",
        "What can we learn about God's ability to change hearts?"
      ],
      practicalApplication: "Share your testimony with someone today, emphasizing God's transforming work in your life. Pray for those who seem opposed to the gospel.",
      completed: false
    }
  ];
}