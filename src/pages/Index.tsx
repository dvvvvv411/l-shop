
import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Truck, 
  Shield, 
  Clock, 
  Star, 
  Phone, 
  Mail, 
  CheckCircle,
  Users,
  Building2,
  Zap,
  Award,
  ArrowRight,
  BarChart3,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { usePageMeta } from '@/hooks/usePageMeta';

const Index = () => {
  const { shopConfig } = usePageMeta('home');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{shopConfig.name}</h1>
                <p className="text-sm text-gray-600">Bundesweites Partnernetzwerk</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <span>{shopConfig.phone}</span>
              </div>
              <Button className="bg-red-600 hover:bg-red-700">
                Jetzt bestellen
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-50 via-white to-gray-50 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-96 h-96 bg-red-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-red-600 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center bg-red-100 text-red-700 px-6 py-3 rounded-full text-sm font-semibold mb-8">
                <Globe size={18} className="mr-2" />
                Deutschlands größtes Heizöl-Netzwerk
                <Award size={16} className="ml-2 fill-current" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                Heizöl
                <span className="text-red-600"> überall</span>
                <br />
                <span className="text-red-600">günstig</span> geliefert
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
                Unser bundesweites Partnernetzwerk mit über <strong className="text-red-600">500+ Standorten</strong> 
                garantiert schnelle Lieferung und beste Preise in ganz Deutschland.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-8 py-4">
                  Preis berechnen
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                  Netzwerk erkunden
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Key Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
          >
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-red-600 mb-2">500+</div>
                <div className="text-gray-600 font-medium">Partner-Standorte</div>
                <div className="text-xs text-gray-500 mt-1">Bundesweit</div>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-red-600 mb-2">24h</div>
                <div className="text-gray-600 font-medium">Express-Service</div>
                <div className="text-xs text-gray-500 mt-1">Notfall-Lieferung</div>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-red-600 mb-2">1M+</div>
                <div className="text-gray-600 font-medium">Kunden vertrauen</div>
                <div className="text-xs text-gray-500 mt-1">Seit 1998</div>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-red-600 mb-2">99.8%</div>
                <div className="text-gray-600 font-medium">Lieferzuverlässigkeit</div>
                <div className="text-xs text-gray-500 mt-1">Termingenau</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Network Overview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Unser <span className="text-red-600">Netzwerk</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Von der Nordsee bis zu den Alpen - unser dichtes Partnernetzwerk 
              sorgt für zuverlässige Heizöl-Versorgung in allen Regionen Deutschlands.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Interactive Map Placeholder */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 h-96 flex items-center justify-center border">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-red-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Interaktive Netzwerkkarte</h3>
                  <p className="text-gray-600 mb-4">
                    Entdecken Sie unsere Partner in Ihrer Nähe
                  </p>
                  <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                    Karte erkunden
                  </Button>
                </div>
              </div>
            </div>

            {/* Network Benefits */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building2 className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Lokale Expertise</h4>
                  <p className="text-gray-600">
                    Unsere Partner kennen die regionalen Besonderheiten und sorgen für 
                    optimale Beratung vor Ort.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Truck className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Kurze Lieferwege</h4>
                  <p className="text-gray-600">
                    Durch die dezentrale Struktur garantieren wir kurze Transportwege 
                    und damit umweltschonende Belieferung.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Flexible Lieferzeiten</h4>
                  <p className="text-gray-600">
                    Von Standardlieferung bis 24h-Express-Service - 
                    wir passen uns Ihren Bedürfnissen an.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Beste Preise</h4>
                  <p className="text-gray-600">
                    Durch unsere Einkaufsmacht und effiziente Logistik 
                    bieten wir deutschlandweit konkurrenzfähige Preise.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Certifications */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-red-600">Vertrauen</span> & Qualität
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Seit über 25 Jahren stehen wir für höchste Qualitätsstandards 
              und zuverlässigen Service im deutschen Heizölmarkt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">TÜV Zertifiziert</h3>
                <p className="text-gray-600">
                  Alle unsere Partner sind TÜV-zertifiziert und erfüllen 
                  höchste Sicherheitsstandards.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Ausgezeichnet</h3>
                <p className="text-gray-600">
                  Mehrfach ausgezeichnet für exzellenten Kundenservice 
                  und Servicequalität.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-yellow-600 fill-current" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.9/5 Sterne</h3>
                <p className="text-gray-600">
                  Über 50.000 Kundenbewertungen bestätigen 
                  unsere hervorragende Servicequalität.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quality Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <span className="font-medium text-gray-900">Premium Heizöl EL</span>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <span className="font-medium text-gray-900">Schwefelarmer Brennstoff</span>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <span className="font-medium text-gray-900">Additiviert verfügbar</span>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <span className="font-medium text-gray-900">Lagerbeständig</span>
            </div>
          </div>
        </div>
      </section>

      {/* Technology & Innovation */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Modernste <span className="text-red-400">Technologie</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Digitale Innovation für optimale Effizienz und 
              transparente Abwicklung Ihrer Heizöl-Bestellung.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                  <Truck className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Live-Tracking</h3>
                <p className="text-gray-300">
                  Verfolgen Sie Ihre Lieferung in Echtzeit von der Abfahrt 
                  bis zur Ankunft bei Ihnen.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Automatische Planung</h3>
                <p className="text-gray-300">
                  KI-basierte Routenoptimierung für maximale Effizienz 
                  und kürzeste Lieferzeiten.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Sichere Zahlung</h3>
                <p className="text-gray-300">
                  Modernste Verschlüsselung und vielfältige Zahlungsmöglichkeiten 
                  für maximale Sicherheit.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Bereit für günstiges Heizöl?
            </h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90">
              Profitieren Sie von unserem bundesweiten Netzwerk und bestellen Sie 
              noch heute Ihr Heizöl zum garantiert besten Preis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4 bg-white text-red-600 hover:bg-gray-100">
                Jetzt Preis berechnen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-red-600">
                Kostenlos beraten lassen
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-sm opacity-90">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>{shopConfig.phone} (kostenlos)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>{shopConfig.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Mo-Fr: 8-20 Uhr, Sa: 9-16 Uhr</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold">{shopConfig.brand}</span>
              </div>
              <p className="text-gray-400 text-sm">
                Deutschlands führendes Heizöl-Netzwerk für zuverlässige 
                und günstige Heizöl-Lieferung.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Service</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Heizöl bestellen</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Preisrechner</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Liefergebiete</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Express-Service</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Unternehmen</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Über uns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partner werden</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Karriere</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Presse</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Rechtliches</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Impressum</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Datenschutz</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AGB</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Widerrufsrecht</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 {shopConfig.name} GmbH. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
