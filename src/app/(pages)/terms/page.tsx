import React from 'react';

const TermsOfService = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Terms of Service</h1>
          
          <p className="text-lg text-gray-600 mb-4">
            Welcome to our application. By using our service, you agree to comply with the following terms and conditions. Please read them carefully.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">1. Acceptance of Terms</h2>
          <p className="text-lg text-gray-600 mb-4">
            By accessing or using our application, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree with these terms, please do not use our application.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">2. User Responsibilities</h2>
          <p className="text-lg text-gray-600 mb-4">
            You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">3. Prohibited Activities</h2>
          <p className="text-lg text-gray-600 mb-4">
            You agree not to engage in any of the following prohibited activities:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Using the application for any unlawful purpose or in violation of any applicable laws or regulations.</li>
            <li>Attempting to interfere with or disrupt the operation of the application.</li>
            <li>{"Accessing or using another user's account without permission."}</li>
            <li>Distributing or transmitting any harmful code or malware.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">4. Intellectual Property</h2>
          <p className="text-lg text-gray-600 mb-4">
            All content, trademarks, and other intellectual property displayed on our application are the property of their respective owners. You may not use, reproduce, or distribute any content from our application without prior written consent.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">5. Limitation of Liability</h2>
          <p className="text-lg text-gray-600 mb-4">
            To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or data arising out of or in connection with your use of our application.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">6. Changes to Terms</h2>
          <p className="text-lg text-gray-600 mb-4">
            We reserve the right to modify these Terms of Service at any time. Any changes will be posted on this page, and your continued use of the application signifies your acceptance of the updated terms.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">7. Termination</h2>
          <p className="text-lg text-gray-600 mb-4">
            We may terminate or suspend your access to the application at our sole discretion, without prior notice, for conduct that we believe violates these terms or is harmful to other users or the application.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">8. Contact Us</h2>
          <p className="text-lg text-gray-600 mb-4">
            If you have any questions or concerns about these Terms of Service, please contact us at <a href="mailto:ankitlodhi239@gmail.com" className="text-blue-500 hover:underline">ankitlodhi239@gmail.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
