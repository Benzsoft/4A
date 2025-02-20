import React from 'react';
import { ContactForm } from '../components/contact/ContactForm';
import { MessageCircle } from 'lucide-react';

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto px-4 mb-32">
      <div className="text-center mb-8">
        <MessageCircle className="w-16 h-16 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Contact Us
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Have questions or feedback? We'd love to hear from you!
        </p>
      </div>

      <ContactForm />
    </div>
  );
}