import React, { useState } from 'react';
import { Share2, Twitter, Facebook, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { StudyProgress } from '../../../types/bibleStudy';
import toast from 'react-hot-toast';

interface ShareProgressProps {
  progress: StudyProgress;
}

export function ShareProgress({ progress }: ShareProgressProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareText = `📖 Bible Study Progress:\n${progress.versesRead}/${progress.totalVerses} verses read\n${progress.streak} day streak!\n#BibleStudy #Faith`;

  const handleShare = async (platform?: string) => {
    try {
      if (platform === 'twitter') {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
          '_blank'
        );
      } else if (platform === 'facebook') {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(shareText)}`,
          '_blank'
        );
      } else if (navigator.share) {
        await navigator.share({
          title: 'Bible Study Progress',
          text: shareText
        });
      }
      setShowMenu(false);
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Failed to share progress');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
      setShowMenu(false);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowMenu(!showMenu)}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </motion.button>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50"
          >
            <button
              onClick={() => handleShare('twitter')}
              className="w-full flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Twitter className="w-4 h-4 mr-3" />
              Share on Twitter
            </button>
            <button
              onClick={() => handleShare('facebook')}
              className="w-full flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Facebook className="w-4 h-4 mr-3" />
              Share on Facebook
            </button>
            <button
              onClick={copyToClipboard}
              className="w-full flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {copied ? (
                <Check className="w-4 h-4 mr-3 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 mr-3" />
              )}
              Copy to clipboard
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}