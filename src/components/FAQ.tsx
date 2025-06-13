
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How quickly can heating oil be delivered?",
      answer: "We deliver heating oil within 4-7 working days throughout Malta. For urgent orders, we also offer express delivery upon request. Delivery is free from an order quantity of 3,000 litres."
    },
    {
      question: "What areas in Malta do you deliver to?",
      answer: "We deliver throughout Malta, including all major towns and villages. Our delivery network covers the entire Maltese archipelago, including Gozo (subject to ferry schedule)."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including bank transfer, direct debit, and credit card payments. You will receive your invoice by email after delivery and can choose your preferred payment method."
    },
    {
      question: "What quality standards does your heating oil meet?",
      answer: "All our heating oil products comply with EN 590 European standards and are regularly tested by independent laboratories. We guarantee the highest quality and purity for optimal heating performance."
    },
    {
      question: "Is there a minimum order quantity?",
      answer: "The minimum order quantity is 1,500 litres. For orders of 3,000 litres or more, delivery is free. Smaller quantities may incur a delivery fee of €25."
    },
    {
      question: "Can I choose my delivery date?",
      answer: "Yes, during the ordering process you can select your preferred delivery date from available time slots. We try to accommodate special requests and short-notice deliveries whenever possible."
    },
    {
      question: "What happens if I'm not home during delivery?",
      answer: "Our delivery team will contact you in advance to confirm the delivery time. If you're not available, we can arrange delivery to a specified location on your property or reschedule for a more convenient time."
    },
    {
      question: "Do you offer emergency deliveries?",
      answer: "Yes, we understand that heating emergencies can occur. Contact our customer service team, and we'll do our best to arrange an emergency delivery within 24-48 hours, subject to availability."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-gray-50">
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
            Questions & Answers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to the most common questions about our heating oil delivery service
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
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <AccordionTrigger className="px-8 py-6 hover:no-underline">
                  <span className="text-left text-lg font-semibold text-gray-900">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-8 pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
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
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-6">
            Still have questions? Our customer service team is here to help.
          </p>
          <button className="bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-700 transition-colors shadow-lg hover:shadow-xl">
            Contact Us
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
