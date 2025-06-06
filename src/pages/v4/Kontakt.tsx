
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import Header from '@/components/v4/Header';
import Footer from '@/components/v4/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const Kontakt = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Téléphone',
      content: '+33 1 23 45 67 89',
      subtitle: 'Lun-Ven 8h-18h',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'contact@fuel-france.fr',
      subtitle: 'Réponse sous 24h',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: MapPin,
      title: 'Adresse',
      content: '123 Avenue de la République',
      subtitle: '75011 Paris, France',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Clock,
      title: 'Horaires',
      content: 'Lundi - Vendredi',
      subtitle: '8h00 - 18h00',
      color: 'from-blue-500 to-blue-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="flex space-x-1">
              <div className="w-3 h-2 bg-blue-600 rounded-sm"></div>
              <div className="w-3 h-2 bg-white border border-gray-300 rounded-sm"></div>
              <div className="w-3 h-2 bg-red-600 rounded-sm"></div>
            </div>
            <span className="text-red-600 font-semibold">Contact</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Contactez-nous
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Notre équipe française est à votre disposition pour répondre à toutes 
            vos questions sur nos services de livraison de fioul domestique.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Informations de contact
              </h2>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100"
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{info.title}</h3>
                          <p className="text-gray-700 font-medium">{info.content}</p>
                          <p className="text-gray-500 text-sm">{info.subtitle}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
            
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold mb-4">Besoin d'un devis rapide ?</h3>
              <p className="text-red-100 mb-4">
                Obtenez votre prix personnalisé en quelques clics
              </p>
              <Button 
                asChild
                className="w-full bg-white text-red-600 hover:bg-gray-100"
              >
                <a href="/4/home#calculator">Calculer mon prix</a>
              </Button>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <MessageCircle className="h-6 w-6 text-red-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Envoyez-nous un message
                </h2>
              </div>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstname" className="text-gray-800 font-semibold">
                      Prénom *
                    </Label>
                    <Input
                      id="firstname"
                      type="text"
                      className="mt-2 border-red-200 focus:border-red-500"
                      placeholder="Votre prénom"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastname" className="text-gray-800 font-semibold">
                      Nom *
                    </Label>
                    <Input
                      id="lastname"
                      type="text"
                      className="mt-2 border-red-200 focus:border-red-500"
                      placeholder="Votre nom"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email" className="text-gray-800 font-semibold">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      className="mt-2 border-red-200 focus:border-red-500"
                      placeholder="votre@email.fr"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-gray-800 font-semibold">
                      Téléphone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      className="mt-2 border-red-200 focus:border-red-500"
                      placeholder="01 23 45 67 89"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="subject" className="text-gray-800 font-semibold">
                    Sujet *
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    className="mt-2 border-red-200 focus:border-red-500"
                    placeholder="Objet de votre message"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-gray-800 font-semibold">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    rows={6}
                    className="mt-2 border-red-200 focus:border-red-500"
                    placeholder="Décrivez votre demande en détail..."
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="consent"
                    className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                  />
                  <label htmlFor="consent" className="text-sm text-gray-600">
                    J'accepte que mes données soient utilisées pour traiter ma demande 
                    conformément à la <a href="/4/confidentialite" className="text-red-600 hover:underline">politique de confidentialité</a>
                  </label>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-4 text-lg"
                >
                  Envoyer le message
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Kontakt;
