
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle } from 'lucide-react';
import Header from '@/components/v4/Header';
import Footer from '@/components/v4/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useDomainPageMeta } from '@/hooks/useDomainPageMeta';

const Kontakt = () => {
  useDomainPageMeta('contact');
  
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    consent: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        consent: false
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const contactCards = [
    {
      icon: Phone,
      title: 'Téléphone',
      primary: '+33 1 23 45 67 89',
      secondary: 'Lun-Ven 8h-18h',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50'
    },
    {
      icon: Mail,
      title: 'Email',
      primary: 'contact@fuel-france.fr',
      secondary: 'Réponse sous 24h',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Clock,
      title: 'Horaires',
      primary: 'Lundi - Vendredi',
      secondary: '8h00 - 18h00',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-600 to-red-700 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-red-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <div className="inline-flex items-center space-x-2 mb-6">
              <div className="flex space-x-1">
                <div className="w-4 h-3 bg-blue-600 rounded-sm"></div>
                <div className="w-4 h-3 bg-white rounded-sm"></div>
                <div className="w-4 h-3 bg-red-600 rounded-sm"></div>
              </div>
              <span className="text-red-100">•</span>
              <MessageCircle className="h-5 w-5" />
              <span className="font-medium">Contact Premium</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-light mb-6">
              Parlons de votre
              <span className="block font-bold">projet énergétique</span>
            </h1>
            
            <p className="text-xl text-red-100 max-w-2xl mx-auto">
              Notre équipe française vous accompagne personnellement pour tous vos besoins en fioul domestique
            </p>
          </motion.div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-16">
        {/* Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-16 -mt-10 relative z-10"
        >
          {contactCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Card key={index} className={`${card.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300`}>
                <CardContent className="p-6 text-center">
                  <div className={`w-14 h-14 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center mb-4 mx-auto`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{card.title}</h3>
                  <p className="font-semibold text-gray-800 mb-1">{card.primary}</p>
                  <p className="text-gray-600 text-sm">{card.secondary}</p>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="shadow-xl border-0 bg-white">
              <CardContent className="p-8">
                {!isSubmitted ? (
                  <>
                    <div className="flex items-center space-x-3 mb-8">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center">
                        <MessageCircle className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Envoyez-nous un message</h2>
                        <p className="text-gray-600">Nous vous répondons rapidement</p>
                      </div>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstname" className="text-gray-800 font-medium mb-2 block">
                            Prénom *
                          </Label>
                          <Input
                            id="firstname"
                            name="firstname"
                            type="text"
                            value={formData.firstname}
                            onChange={handleChange}
                            className="border-gray-200 focus:border-red-500 h-12"
                            placeholder="Votre prénom"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastname" className="text-gray-800 font-medium mb-2 block">
                            Nom *
                          </Label>
                          <Input
                            id="lastname"
                            name="lastname"
                            type="text"
                            value={formData.lastname}
                            onChange={handleChange}
                            className="border-gray-200 focus:border-red-500 h-12"
                            placeholder="Votre nom"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email" className="text-gray-800 font-medium mb-2 block">
                            Email *
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border-gray-200 focus:border-red-500 h-12"
                            placeholder="votre@email.fr"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone" className="text-gray-800 font-medium mb-2 block">
                            Téléphone
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            className="border-gray-200 focus:border-red-500 h-12"
                            placeholder="01 23 45 67 89"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="subject" className="text-gray-800 font-medium mb-2 block">
                          Sujet *
                        </Label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full h-12 px-3 border border-gray-200 rounded-md focus:border-red-500 focus:ring-red-500"
                          required
                        >
                          <option value="">Sélectionnez un sujet</option>
                          <option value="devis">Demande de devis</option>
                          <option value="livraison">Question sur la livraison</option>
                          <option value="produit">Information produit</option>
                          <option value="facturation">Question facturation</option>
                          <option value="autre">Autre demande</option>
                        </select>
                      </div>
                      
                      <div>
                        <Label htmlFor="message" className="text-gray-800 font-medium mb-2 block">
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          className="border-gray-200 focus:border-red-500 resize-none"
                          placeholder="Décrivez votre demande en détail..."
                          required
                        />
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          id="consent"
                          name="consent"
                          checked={formData.consent}
                          onChange={handleChange}
                          className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 mt-0.5"
                          required
                        />
                        <label htmlFor="consent" className="text-sm text-gray-600 leading-relaxed">
                          J'accepte que mes données soient utilisées pour traiter ma demande conformément à la{' '}
                          <a href="/4/confidentialite" className="text-red-600 hover:underline font-medium">
                            politique de confidentialité
                          </a>
                        </label>
                      </div>
                      
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white h-12 text-lg font-medium"
                      >
                        <Send className="h-5 w-5 mr-2" />
                        Envoyer le message
                      </Button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message envoyé !</h3>
                    <p className="text-gray-600">
                      Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Company Info & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-8"
          >
            {/* Company Info */}
            <Card className="shadow-xl border-0">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <MapPin className="h-6 w-6 text-red-600" />
                  <h3 className="text-xl font-bold text-gray-900">Fuel Express France</h3>
                </div>
                
                <div className="space-y-4 text-gray-600">
                  <p className="font-medium">123 Avenue de la République</p>
                  <p>75011 Paris, France</p>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="font-semibold text-gray-900 mb-3">Accès & Transport</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Métro :</strong> République (Lignes 3, 5, 8, 9, 11)</p>
                      <p><strong>Bus :</strong> Lignes 20, 56, 65, 75</p>
                      <p><strong>Parking :</strong> Disponible à proximité</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick CTA */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-red-600 to-red-700 text-white">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">Besoin d'un devis rapide ?</h3>
                <p className="text-red-100 mb-6">
                  Calculez votre prix personnalisé en quelques clics et recevez votre devis instantanément.
                </p>
                <Button 
                  asChild
                  className="w-full bg-white text-red-600 hover:bg-gray-100 font-medium"
                >
                  <a href="/4/home#calculator">
                    Calculer mon prix maintenant
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Service Promise */}
            <Card className="shadow-xl border-0 bg-blue-50">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Notre engagement service</h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>Réponse garantie sous 24h</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>Conseil personnalisé gratuit</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>Équipe française experte</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Kontakt;
