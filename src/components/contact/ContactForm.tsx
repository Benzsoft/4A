import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { useForm } from '../../hooks/useForm';
import toast from 'react-hot-toast';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const initialState: FormData = {
  name: '',
  email: '',
  message: ''
};

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isValid } = useForm<FormData>({
    initialValues: initialState,
    validate: (values) => {
      const errors: Partial<Record<keyof FormData, string>> = {};
      
      if (!values.name.trim()) {
        errors.name = 'Name is required';
      }
      
      if (!values.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      
      if (!values.message.trim()) {
        errors.message = 'Message is required';
      } else if (values.message.length < 10) {
        errors.message = 'Message must be at least 10 characters';
      }
      
      return errors;
    },
    onSubmit: async (values) => {
      setStatus('sending');
      
      try {
        const response = await fetch('https://formspree.io/f/temdiw10@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });

        if (response.ok) {
          setStatus('success');
          toast.success('Message sent successfully!');
          // Reset form
          handleSubmit();
        } else {
          throw new Error('Failed to send message');
        }
      } catch (error) {
        setStatus('error');
        toast.error('Failed to send message. Please try again.');
      }
    }
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-2 rounded-lg border ${
            touched.name && errors.name
              ? 'border-red-500 dark:border-red-400'
              : 'border-gray-300 dark:border-gray-600'
          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
        />
        {touched.name && errors.name && (
          <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-2 rounded-lg border ${
            touched.email && errors.email
              ? 'border-red-500 dark:border-red-400'
              : 'border-gray-300 dark:border-gray-600'
          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
        />
        {touched.email && errors.email && (
          <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          rows={5}
          className={`w-full px-4 py-2 rounded-lg border ${
            touched.message && errors.message
              ? 'border-red-500 dark:border-red-400'
              : 'border-gray-300 dark:border-gray-600'
          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none`}
        />
        {touched.message && errors.message && (
          <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={!isValid || status === 'sending'}
        className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>Send Message</span>
          </>
        )}
      </button>
    </form>
  );
}