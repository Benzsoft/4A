import React from 'react';
import { Users, MessageSquare } from 'lucide-react';

interface StudyGroupProps {
  groupName: string;
  members: Array<{
    name: string;
    avatar: string;
  }>;
  onJoinDiscussion: () => void;
}

export function StudyGroup({ groupName, members, onJoinDiscussion }: StudyGroupProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {groupName}
          </h3>
        </div>
        <button
          onClick={onJoinDiscussion}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Join Discussion</span>
        </button>
      </div>

      <div className="flex -space-x-2">
        {members.map((member, index) => (
          <img
            key={index}
            src={member.avatar}
            alt={member.name}
            className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
            title={member.name}
          />
        ))}
      </div>
    </div>
  );
}