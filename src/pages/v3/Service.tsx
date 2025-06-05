
import React from 'react';
import Header from '@/components/v3/Header';
import Footer from '@/components/Footer';
import { useDomainPageMeta } from '@/hooks/useDomainPageMeta';
import { Mountain, Shield, Clock, Award, Truck, Users, Heart } from 'lucide-react';

const Service = () => {
  useDomainPageMeta('service');

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Mountain className="h-12 w-12 text-violet-600 mr-4" />
              <h1 className="text-4xl font-bold text-gray-900">Über uns</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Seit über 25 Jahren sind wir Ihr verlässlicher Partner für Premium-Heizöl 
              in ganz Österreich - von den Alpen bis ins Burgenland.
            </p>
          </div>

          {/* Company Story */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-violet-800">Unsere Geschichte</h2>
              <p className="text-gray-700 leading-relaxed">
                Die Heizöl Österreich GmbH wurde 1998 in Wien gegründet mit der Vision, 
                österreichweit qualitativ hochwertiges Heizöl zu fairen Preisen anzubieten. 
                Was als kleines Familienunternehmen begann, ist heute einer der führenden 
                Heizöl-Lieferanten in Österreich.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Unsere Wurzeln liegen in der österreichischen Tradition von Qualität, 
                Zuverlässigkeit und persönlichem Service. Diese Werte prägen unser 
                Unternehmen bis heute und sind die Grundlage unseres Erfolges.
              </p>
              <div className="bg-gradient-to-r from-violet-100 to-amber-100 p-6 rounded-lg">
                <h3 className="font-semibold text-violet-800 mb-2">Unser Versprechen</h3>
                <p className="text-gray-700">
                  Österreichische Qualität, faire Preise und persönlicher Service - 
                  darauf können sich unsere Kunden seit über 25 Jahren verlassen.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-violet-100">
              <h3 className="text-2xl font-bold text-violet-800 mb-6">Zahlen & Fakten</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-violet-100 p-3 rounded-lg">
                    <Award className="h-6 w-6 text-violet-600" />
                  </div>
                  <div>
                    <p className="font-bold text-2xl text-gray-900">25+</p>
                    <p className="text-gray-600">Jahre Erfahrung</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-amber-100 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-bold text-2xl text-gray-900">50.000+</p>
                    <p className="text-gray-600">Zufriedene Kunden</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-violet-100 p-3 rounded-lg">
                    <Truck className="h-6 w-6 text-violet-600" />
                  </div>
                  <div>
                    <p className="font-bold text-2xl text-gray-900">9</p>
                    <p className="text-gray-600">Bundesländer</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-amber-100 p-3 rounded-lg">
                    <Heart className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-bold text-2xl text-gray-900">98%</p>
                    <p className="text-gray-600">Weiterempfehlung</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-violet-800 mb-12">
              Unsere Services
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-violet-100">
                <div className="bg-violet-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-violet-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Express-Lieferung</h3>
                <p className="text-gray-600">
                  24-Stunden-Service österreichweit. Ihre Bestellung erreicht Sie 
                  schnell und zuverlässig.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-violet-100">
                <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Premium-Qualität</h3>
                <p className="text-gray-600">
                  Nur beste österreichische und EU-zertifizierte Heizöl-Qualität 
                  für Ihre Heizanlage.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-violet-100">
                <div className="bg-violet-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-violet-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Persönliche Beratung</h3>
                <p className="text-gray-600">
                  Kompetente Fachberatung von unserem österreichischen Kundenservice-Team.
                </p>
              </div>
            </div>
          </div>

          {/* Austrian Commitment */}
          <div className="bg-gradient-to-r from-violet-600 to-purple-700 rounded-xl p-8 text-white text-center">
            <Mountain className="h-12 w-12 mx-auto mb-4 text-amber-300" />
            <h2 className="text-3xl font-bold mb-4">Österreichische Werte</h2>
            <p className="text-xl text-violet-100 max-w-4xl mx-auto mb-6">
              Als österreichisches Unternehmen stehen wir für Qualität, Verlässlichkeit 
              und fairen Umgang mit unseren Kunden. Diese Werte leben wir jeden Tag.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div>
                <h3 className="font-bold text-amber-300 mb-2">Nachhaltigkeit</h3>
                <p className="text-violet-100">Umweltbewusste Lieferung und hochwertige Brennstoffe</p>
              </div>
              <div>
                <h3 className="font-bold text-amber-300 mb-2">Regionalität</h3>
                <p className="text-violet-100">Lokale Partner und kurze Transportwege</p>
              </div>
              <div>
                <h3 className="font-bold text-amber-300 mb-2">Vertrauen</h3>
                <p className="text-violet-100">Transparente Preise und ehrliche Beratung</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Service;
