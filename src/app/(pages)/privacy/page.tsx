import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600 mb-4">
            Welcome to our Privacy Policy page. Your privacy is important to us, and we are committed to protecting your personal information. This Privacy Policy outlines how we handle and safeguard the data we collect from you, including your email address, password, and other personal information.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Information We Collect</h2>
          <p className="text-lg text-gray-600 mb-4">
            We collect and store the following types of personal information:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li><strong>Email Address:</strong> Used for communication and account-related notifications.</li>
            <li><strong>Password:</strong> Secured and encrypted to ensure the safety of your account.</li>
            <li><strong>JWT Token:</strong> Used for authentication and role-based access within our application.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">How We Use Your Information</h2>
          <p className="text-lg text-gray-600 mb-4">
            Your information is used for the following purposes:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li><strong>Authentication:</strong> To verify your identity and provide secure access to our application.</li>
            <li><strong>Role-Based Access:</strong> To manage and enforce access control based on your assigned role.</li>
            <li><strong>Communication:</strong> To send you important updates, notifications, and support messages.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">How We Protect Your Information</h2>
          <p className="text-lg text-gray-600 mb-4">
            We implement various security measures to protect your personal information, including:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li><strong>Encryption:</strong> Passwords are encrypted using industry-standard encryption algorithms to ensure their security.</li>
            <li><strong>Secure Storage:</strong> JWT tokens and other sensitive data are stored securely to prevent unauthorized access.</li>
            <li><strong>Access Control:</strong> Role-based access ensures that only authorized users have access to certain features and data.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Your Rights</h2>
          <p className="text-lg text-gray-600 mb-4">
            You have the right to access, correct, or delete your personal information. If you have any concerns or requests regarding your data, please contact us at <a href="mailto:ankitlodhi239@gmail.com" className="text-blue-500 hover:underline">ankitlodhi239@gmail.com</a>.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Changes to This Privacy Policy</h2>
          <p className="text-lg text-gray-600 mb-4">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page, and your continued use of the application signifies your acceptance of any modifications.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Contact Us</h2>
          <p className="text-lg text-gray-600">
            If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:ankitlodhi239@gmail.com" className="text-blue-500 hover:underline">ankitlodhi239@gmail.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
