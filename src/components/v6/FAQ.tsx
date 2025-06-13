
import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      question: "What areas in Malta do you deliver to?",
      answer: "We deliver heating oil throughout Malta, including all major towns and villages. Our delivery network covers the entire Maltese archipelago, including Gozo and Comino (subject to ferry schedule)."
    },
    {
      question: "How long does delivery take?",
      answer: "Standard delivery time is 4-7 working days from order confirmation. For urgent deliveries or special requirements, please contact our customer service team who can arrange expedited delivery options."
    },
    {
      question: "What is the minimum order quantity?",
      answer: "Our minimum order quantity is 500 liters. However, we offer free delivery for orders of 3,000 liters or more. Smaller orders may incur a delivery fee of €45."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept bank transfers and major credit cards. Payment is typically made after delivery and invoicing, though we can arrange different payment terms for commercial customers."
    },
    {
      question: "What quality standards does your heating oil meet?",
      answer: "All our heating oil meets European EN 590 standards and is regularly tested by independent institutes. We offer both standard and premium grades, with the premium including additional additives for enhanced performance."
    },
    {
      question: "Do you offer emergency delivery services?",
      answer: "Yes, we understand that heating emergencies can occur. Contact our 24/7 customer service line at +356 2123 4567, and we'll do our best to arrange emergency delivery outside normal business hours."
    },
    {
      question: "How do I prepare for delivery?",
      answer: "Ensure that your delivery location is accessible and that our delivery vehicle can reach your heating oil tank. Our drivers will need clear access to your tank and will require someone to be present during delivery to sign for the order."
    },
    {
      question: "Can I track my delivery?",
      answer: "Yes, once your order is dispatched, we'll provide you with tracking information and an estimated delivery window. Our customer service team can also provide real-time updates on your delivery status."
    },
    {
      question: "What happens if there's an issue with my order?",
      answer: "We stand behind the quality of our products and service. If you experience any issues with your order or delivery, please contact us immediately at +356 2123 4567 or info@malta-heating-oil.com, and we'll resolve the issue promptly."
    },
    {
      question: "Do you offer discounts for regular customers?",
      answer: "Yes, we offer loyalty programs and volume discounts for regular customers. We also provide special pricing for commercial and industrial customers. Contact us to discuss your specific needs and potential savings."
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
          <div className="inline-flex items-center bg-amber-100 text-amber-700 px-6 py-3 rounded-full text-sm font-semibold mb-8">
            <HelpCircle size={18} className="mr-2" />
            Frequently Asked Questions
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Got Questions? We Have Answers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to the most common questions about our heating oil delivery service in Malta.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-gray-50 rounded-2xl border border-gray-200 hover:border-amber-300 transition-colors px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-amber-600 py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our friendly customer service team is ready to help you with any questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+35621234567"
                className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-amber-700 hover:to-orange-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Call +356 2123 4567
              </a>
              <a 
                href="mailto:info@malta-heating-oil.com"
                className="bg-white text-amber-600 border-2 border-amber-600 px-6 py-3 rounded-xl font-semibold hover:bg-amber-50 transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
