
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/v6/Header';
import Footer from '@/components/Footer';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';
import { usePageMeta } from '@/hooks/usePageMeta';

const Kontakt = () => {
  usePageMeta('kontakt');

  const contactInfo = [
    {
      icon: Phone,
      title: "Telephone",
      value: "+356 2123 4567",
      description: "Free hotline Mon-Fri 8am-6pm"
    },
    {
      icon: Mail,
      title: "Email",
      value: "info@malta-heating-oil.com",
      description: "We respond within 24 hours"
    },
    {
      icon: MapPin,
      title: "Address",
      value: "Triq il-Kbira, VLT 1234 Valletta",
      description: "Head office and administration"
    },
    {
      icon: Clock,
      title: "Opening Hours",
      value: "Mon-Fri: 8:00am-6:00pm",
      description: "Sat: 9:00am-2:00pm"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-50 via-white to-red-50 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-amber-100 text-amber-700 px-6 py-3 rounded-full text-sm font-semibold mb-8">
              <MessageSquare size={18} className="mr-2" />
              Contact & Support
              <Phone size={16} className="ml-2" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              We're <span className="text-amber-600">Here for You</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about our heating oil products or need consultation? 
              Our experienced team is happy to help you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-gray-100 transition-colors"
              >
                <div className="inline-flex p-4 rounded-full bg-amber-100 text-amber-600 mb-4">
                  <info.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-lg font-semibold text-amber-600 mb-1">{info.value}</p>
                <p className="text-sm text-gray-600">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Kontakt;
