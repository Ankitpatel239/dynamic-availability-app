import React from 'react';

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 mb-6">
            If you have any questions or feedback, feel free to reach out to us at{' '}
            <a href="mailto:ankitlodhi239@gmail.com" className="text-blue-500 hover:underline">
            ankitlodhi239@gmail.com
            </a>.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            You can also follow us on social media for updates and announcements:
          </p>
          <div className="flex space-x-4">
            <a href="https://x.com/APcreations13" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              X.COM
            </a>
            <a href="https://www.facebook.com/ankit.ankitpatel.1694" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Facebook
              
            </a>
            <a href="https://www.linkedin.com/in/ankit-patel-6516a3219" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              LinkedIn
            </a>
            <a href="https://ankit-portfolio-web.onrender.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Portfolio
            </a>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
