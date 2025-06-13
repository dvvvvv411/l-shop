
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const CustomerReviews = () => {
  const reviews = [
    {
      name: "Maria Farrugia",
      location: "Valletta",
      rating: 5,
      text: "Excellent service! They delivered our heating oil the very next day, and the price was much better than our previous supplier. Highly recommend to anyone in Malta."
    },
    {
      name: "John Mifsud",
      location: "Sliema",
      rating: 5,
      text: "Professional and reliable. The team was very helpful in explaining the different oil types. Great customer service and fast delivery across Malta."
    },
    {
      name: "Carmen Borg",
      location: "Gozo",
      rating: 5,
      text: "Even though we're in Gozo, they delivered on time as promised. Quality heating oil and competitive prices. Will definitely use them again."
    },
    {
      name: "David Zammit",
      location: "Birkirkara",
      rating: 5,
      text: "Been using their services for 3 years now. Always reliable, always good quality. The online ordering system makes it so easy to reorder when needed."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our <span className="text-blue-600">Malta Customers</span> Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what families and businesses across Malta say about our heating oil service.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-red-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <Quote className="text-blue-600 mr-2" size={24} />
                <div className="flex text-yellow-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>
              </div>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                "{review.text}"
              </p>
              
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-blue-600 to-red-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{review.name}</div>
                  <div className="text-gray-600">{review.location}, Malta</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-br from-blue-50 to-red-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join Thousands of Satisfied Malta Customers
            </h3>
            <p className="text-gray-600 mb-6">
              Experience the difference of working with Malta's most trusted heating oil supplier.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              Get Your First Order
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerReviews;
