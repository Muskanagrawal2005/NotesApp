import React from 'react'
import { useTheme } from '../context/ThemeContext';

const About = () => {
    const { theme } = useTheme();
  return (
    <section
        className={`min-h-[90vh] flex flex-col justify-center items-center px-4 max-w-4xl mx-auto text-center ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}
      >
        <h2
          className={`text-3xl font-bold mb-6 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
          }`}
        >
          About NotesHub
        </h2>
        <p className="text-lg mb-4">
          NotesHub is your ultimate companion for organizing thoughts, ideas, and reminders. Whether you're a student, professional, or creative mind, our platform empowers you to capture and manage your notes seamlessly.
        </p>
        <p className="text-lg mb-4">
          With a clean, intuitive interface and powerful features like markdown support, categorization, and cloud synchronization, NotesHub ensures your ideas are always at your fingertips.
        </p>
        <p className="text-lg">
          Join thousands of users who trust NotesHub to keep their minds clear and their productivity high. Start creating, editing, and sharing your notes today!
        </p>
      </section>
  )
}

export default About