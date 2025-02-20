import { BibleStudyLesson } from '../../../../types';

export function generateHistoricalLessons(): BibleStudyLesson[] {
  return [
    {
      day: 31, // Starting after Pentateuch
      title: "Joshua's Commission",
      scripture: "Joshua 1:1-18",
      content: "As we enter the historical books, we witness God's faithfulness in fulfilling His promises to Israel. Joshua receives his commission to lead God's people into the Promised Land, with the powerful encouragement to be strong and courageous. This passage demonstrates God's continued guidance of His people and the importance of faithful leadership.",
      keyThemes: [
        "Divine leadership",
        "Courage",
        "God's promises",
        "Succession"
      ],
      reflectionQuestions: [
        "What qualities made Joshua an effective leader?",
        "How does God's promise to Joshua apply to us today?",
        "What role does courage play in following God?",
        "How can we prepare ourselves for God's calling?"
      ],
      practicalApplication: "Identify an area in your life where you need courage to follow God's leading. Write down His promises that give you strength.",
      completed: false
    },
    {
      day: 32,
      title: "The Fall of Jericho",
      scripture: "Joshua 5:13-6:27",
      content: "The conquest of Jericho demonstrates God's power and the importance of obedience. Through unconventional military strategy, God shows that victory comes through faith and obedience rather than human strength. This account teaches us about God's ways being higher than our ways.",
      keyThemes: [
        "Faith and obedience",
        "Divine strategy",
        "God's power",
        "Victory through faith"
      ],
      reflectionQuestions: [
        "How does God's battle plan challenge human wisdom?",
        "What role did faith play in Israel's victory?",
        "How does this story demonstrate God's power?",
        "What 'walls' in your life need God's intervention?"
      ],
      practicalApplication: "Consider areas where God might be calling you to step out in faith, even when His methods seem unconventional.",
      completed: false
    }
  ];
}