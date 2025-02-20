import React, { useState } from 'react';
import { Star, Share2, Facebook, Twitter, Copy, Check } from 'lucide-react';
import { Verse } from '../../types';
import clsx from 'clsx';

interface VerseCardProps {
  verse: Verse;
  onSave: (verse: Verse) => void;
}

export function VerseCard({ verse, onSave }: VerseCardProps) {
  const [isStarred, setIsStarred] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSave = () => {
    setIsStarred(true);
    onSave(verse);
  };

  const handleShare = async (platform?: string) => {
    const shareText = `${verse.reference}\n\n${verse.text}\n\nShared via Bible Me`;
    
    try {
      if (platform) {
        const encodedText = encodeURIComponent(shareText);
        const shareUrl = platform === 'twitter' 
          ? `https://twitter.com/intent/tweet?text=${encodedText}`
          : `https://www.facebook.com/sharer/sharer.php?quote=${encodedText}`;
        
        window.open(shareUrl, '_blank', 'width=600,height=400');
      } else if (navigator.share) {
        await navigator.share({
          title: 'Bible Verse',
          text: shareText,
          url: window.location.origin
        });
      }
      setShowShareMenu(false);
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const copyToClipboard = async () => {
    try {
      const shareText = `${verse.reference}\n\n${verse.text}\n\nShared via Bible Me`;
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      setShowShareMenu(false);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {verse.reference}
        </h3>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-full transition-all duration-300"
            >
              <Share2 className="w-5 h-5" />
            </button>
            
            {showShareMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-10 animate-fade-in">
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
                    <>
                      <Check className="w-4 h-4 mr-3 text-green-500" />
                      <span className="text-green-500">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-3" />
                      Copy to clipboard
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
          
          <button
            onClick={handleSave}
            disabled={isStarred}
            className={clsx(
              'p-2 rounded-full transition-all duration-300',
              isStarred
                ? 'text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/30'
                : 'text-gray-400 hover:text-yellow-500 hover:bg-gray-100 dark:hover:bg-gray-700'
            )}
          >
            <Star
              className="w-5 h-5 transform transition-transform duration-300 hover:scale-110"
              fill={isStarred ? 'currentColor' : 'none'}
            />
          </button>
        </div>
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        {verse.text}
      </p>
      
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Translation: {verse.translation}
      </div>
    </div>
  );
}