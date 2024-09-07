import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">About Us</h1>
          <p className="text-lg text-gray-600 mb-4">
            Welcome to our application! We are dedicated to providing the best scheduling and availability management tool for you. Our platform helps you streamline your appointments, manage your time effectively, and stay organized.
          </p>
          <p className="text-lg text-gray-600 mb-4">
            {"With features like real-time availability updates, customizable notifications, and an intuitive user interface, we strive to make scheduling effortless and efficient. Whether you're managing personal appointments or coordinating with teams, our tool is designed to simplify your life."}
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600 mb-4">
            Our mission is to enhance productivity and organization through innovative scheduling solutions. We believe that efficient time management leads to a more balanced and successful life, and we are committed to providing tools that support these goals.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Contact Us</h2>
          <p className="text-lg text-gray-600 mb-4">
            If you have any questions or feedback, feel free to reach out to us at <a href="mailto:ankitlodhi239@gmail.com" className="text-blue-500 hover:underline">ankitlodhi239@gmail.com</a>. We value your input and are here to help you get the most out of our application.
          </p>
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Me</h2>
            <p className="text-lg text-gray-600 mb-4">
             {" Hello! I'm Ankit Patel, a passionate web developer with a strong background in creating dynamic and responsive web applications. I specialize in using modern technologies like React, Node.js, and Tailwind CSS to build user-friendly and efficient websites."}
            </p>
            <p className="text-lg text-gray-600 mb-4">
              {"I enjoy working on challenging projects and constantly learning new skills to enhance my development capabilities. Whether you're looking for a new web project or need help with an existing one, feel free to get in touch!"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
