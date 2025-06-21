import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Terminal } from 'lucide-react';
import ContactGlobe from './ContactGlobe';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 z-10 overflow-hidden">
      {/* 3D Globe Background */}
      <ContactGlobe />
      
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Terminal Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-3 mb-6">
            <Terminal className="w-8 h-8 text-green-400" />
            <h2 className="text-4xl md:text-6xl font-black font-mono text-green-400 terminal-glow">
              $ ./contact.sh
            </h2>
          </div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-mono">
            <span className="text-green-400"># </span>
            Ready to collaborate? Establishing connection...
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info - Terminal Style */}
          <div className="space-y-6">
            <div className="p-6 rounded-lg bg-gray-900/80 border border-green-500/30 hover:border-green-500/50 transition-all duration-500">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-green-400 font-mono text-sm">~/contact/email</span>
              </div>
              <div className="font-mono">
                <Mail className="w-6 h-6 text-green-400 mb-3" />
                <p className="text-green-400 text-sm mb-1">$ echo $EMAIL</p>
                <p className="text-white">john.doe@terminal.dev</p>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-gray-900/80 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-500">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
                <span className="text-blue-400 font-mono text-sm">~/contact/phone</span>
              </div>
              <div className="font-mono">
                <Phone className="w-6 h-6 text-blue-400 mb-3" />
                <p className="text-blue-400 text-sm mb-1">$ cat phone.txt</p>
                <p className="text-white">+1 (555) DEV-CODE</p>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-gray-900/80 border border-pink-500/30 hover:border-pink-500/50 transition-all duration-500">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                </div>
                <span className="text-pink-400 font-mono text-sm">~/contact/location</span>
              </div>
              <div className="font-mono">
                <MapPin className="w-6 h-6 text-pink-400 mb-3" />
                <p className="text-pink-400 text-sm mb-1">$ pwd</p>
                <p className="text-white">/home/developer/workspace</p>
              </div>
            </div>
          </div>

          {/* Contact Form - Terminal Style */}
          <div className="p-8 rounded-lg bg-gray-900/80 border border-green-500/30 backdrop-blur-sm">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-green-400 font-mono text-sm">~/contact/message-form</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 font-mono">
              <div>
                <label htmlFor="name" className="block text-green-400 font-medium mb-2">
                  $ ./get-name.sh
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded bg-black/50 border border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none transition-colors duration-300"
                  placeholder="Enter your name..."
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-blue-400 font-medium mb-2">
                  $ ./get-email.sh
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded bg-black/50 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors duration-300"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-pink-400 font-medium mb-2">
                  $ ./compose-message.sh
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded bg-black/50 border border-gray-600 text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none transition-colors duration-300 resize-none"
                  placeholder="Write your message here..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center px-6 py-3 rounded bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25"
              >
                <Send className="w-5 h-5 mr-2" />
                $ ./send-message.sh
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
