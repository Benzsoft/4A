import React, { useState } from 'react';
import { Share2, Facebook, Twitter, Copy, Check } from 'lucide-react';

interface ShareButtonProps {
  title: string;
  text: string;
  url?: string;
  className?: string;
}

export function ShareButton({ title, text, url = window.location.href, className = '' }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareData = {
    title,
    text,
    url
  };

  const handleShare = async (platform?: string) => {
    try {
      if (platform) {
        let shareUrl = '';
        const encodedText = encodeURIComponent(`${text}\n\n${url}`);
        
        switch (platform) {
          case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodedText}`;
            break;
          case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;
            break;
        }
        
        window.open(shareUrl, '_blank', 'width=600,height=400');
      } else if (navigator.share) {
        await navigator.share(shareData);
      }
      setIsOpen(false);
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${text}\n\n${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group p-2 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-all duration-300 ${className}`}
        aria-label="Share"
      >
        <Share2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 animate-fade-in">
          <div className="flex justify-around p-2 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => handleShare('facebook')}
              className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300 group"
              aria-label="Share on Facebook"
            >
              <Facebook className="w-5 h-5 text-blue-600 transition-transform duration-300 group-hover:scale-110" />
            </button>
            <button
              onClick={() => handleShare('twitter')}
              className="p-2 rounded-full hover:bg-sky-100 dark:hover:bg-sky-900/30 transition-all duration-300 group"
              aria-label="Share on X (Twitter)"
            >
              <Twitter className="w-5 h-5 text-sky-500 transition-transform duration-300 group-hover:scale-110" />
            </button>
          </div>
          <div className="px-4 py-2">
            <button
              onClick={copyToClipboard}
              className="w-full flex items-center justify-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Copy link</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}