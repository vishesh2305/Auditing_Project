import React from 'react';

export default function Contact() {
  return (
    <div className="container mx-auto px-6 py-12 animate-fade-in">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Get In Touch</h2>
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
            <input type="text" id="name" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
            <input type="email" id="email" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
            <textarea id="message" rows="5" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
