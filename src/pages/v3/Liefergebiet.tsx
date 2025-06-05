import React from 'react';
import Header from '@/components/v3/Header';
import Footer from '@/components/Footer';
import { useDomainPageMeta } from '@/hooks/useDomainPageMeta';
import { Mountain, MapPin, Truck, Clock, CheckCircle } from 'lucide-react';
const Liefergebiet = () => {
  useDomainPageMeta('liefergebiet');
  const regions = [{
    name: 'Wien',
    cities: ['Wien'],
    color: 'violet',
    deliveryTime: '24h'
  }, {
    name: 'Niederösterreich',
    cities: ['St. Pölten', 'Wiener Neustadt', 'Krems', 'Baden', 'Mödling'],
    color: 'purple',
    deliveryTime: '24-48h'
  }, {
    name: 'Oberösterreich',
    cities: ['Linz', 'Wels', 'Steyr', 'Braunau', 'Ried'],
    color: 'violet',
    deliveryTime: '24-48h'
  }, {
    name: 'Salzburg',
    cities: ['Salzburg Stadt', 'Hallein', 'St. Johann', 'Zell am See'],
    color: 'amber',
    deliveryTime: '48h'
  }, {
    name: 'Tirol',
    cities: ['Innsbruck', 'Kufstein', 'Kitzbühel', 'Lienz'],
    color: 'purple',
    deliveryTime: '48h'
  }, {
    name: 'Vorarlberg',
    cities: ['Bregenz', 'Dornbirn', 'Feldkirch', 'Bludesch'],
    color: 'violet',
    deliveryTime: '48-72h'
  }, {
    name: 'Steiermark',
    cities: ['Graz', 'Leoben', 'Kapfenberg', 'Bruck a.d. Mur'],
    color: 'amber',
    deliveryTime: '24-48h'
  }, {
    name: 'Kärnten',
    cities: ['Klagenfurt', 'Villach', 'St. Veit', 'Spittal'],
    color: 'purple',
    deliveryTime: '48h'
  }, {
    name: 'Burgenland',
    cities: ['Eisenstadt', 'Neusiedl', 'Oberwart', 'Güssing'],
    color: 'violet',
    deliveryTime: '24-48h'
  }];
  return <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Mountain className="h-12 w-12 text-violet-600 mr-4" />
              <h1 className="text-4xl font-bold text-gray-900">Liefergebiete in Österreich</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Österreichweite Heizöl-Lieferung von den Alpen bis ins Burgenland - 
              schnell, zuverlässig und zu fairen Preisen.
            </p>
          </div>

          {/* Quick Facts */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-violet-100">
              <MapPin className="h-8 w-8 text-violet-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">9</div>
              <div className="text-sm text-gray-600">Bundesländer</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-violet-100">
              <Truck className="h-8 w-8 text-amber-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">100+</div>
              <div className="text-sm text-gray-600">Städte & Gemeinden</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-violet-100">
              <Clock className="h-8 w-8 text-violet-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">24h</div>
              <div className="text-sm text-gray-600">Express-Service</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-violet-100">
              <CheckCircle className="h-8 w-8 text-amber-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">98%</div>
              <div className="text-sm text-gray-600">Pünktliche Lieferung</div>
            </div>
          </div>

          {/* Regions Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-violet-800 mb-12">
              Unsere Liefergebiete
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {regions.map((region, index) => <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-violet-100 hover:border-violet-300 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{region.name}</h3>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${region.color === 'violet' ? 'bg-violet-100 text-violet-700' : region.color === 'purple' ? 'bg-purple-100 text-purple-700' : 'bg-amber-100 text-amber-700'}`}>
                      {region.deliveryTime}
                    </div>
                  </div>
                  <div className="space-y-2">
                    {region.cities.map((city, cityIndex) => <div key={cityIndex} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-gray-700 text-sm">{city}</span>
                      </div>)}
                  </div>
                </div>)}
            </div>
          </div>

          {/* Delivery Information */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-16 border border-violet-100">
            <h2 className="text-3xl font-bold text-center text-violet-800 mb-8">
              Lieferinformationen
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Lieferzeiten</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-violet-500 rounded-full"></div>
                    <span className="text-gray-700">Wien & Umgebung: 24 Stunden</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">Ostösterreich: 24-48 Stunden</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-700">Westösterreich: 48-72 Stunden</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">Mindestmengen</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">• Standardlieferung: ab 500 Liter</p>
                  <p className="text-gray-700">• Express-Lieferung: ab 1.000 Liter</p>
                  <p className="text-gray-700">• Berggebiete: ab 1.000 Liter</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Lieferkonditionen</h3>
                <div className="space-y-4">
                  <div className="bg-violet-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-violet-800 mb-2">Kostenlose Lieferung</h4>
                    <p className="text-sm text-gray-700">Ab 3.000 Liter ist die Lieferung in ganz Österreich kostenfrei.</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-amber-700 mb-2">Express-Service</h4>
                    <p className="text-sm text-gray-700">
                      24-Stunden-Lieferung gegen Aufpreis von €29,90 verfügbar.
                    </p>
                  </div>
                  <div className="bg-violet-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-violet-800 mb-2">Flexible Termine</h4>
                    <p className="text-sm text-gray-700">
                      Wunschtermine nach Absprache, auch samstags möglich.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact for Areas */}
          <div className="bg-gradient-to-r from-violet-600 to-purple-700 rounded-xl p-8 text-white text-center">
            <Mountain className="h-12 w-12 mx-auto mb-4 text-amber-300" />
            <h2 className="text-3xl font-bold mb-4">Ihr Gebiet nicht dabei?</h2>
            <p className="text-xl text-violet-100 max-w-2xl mx-auto mb-6">
              Wir erweitern kontinuierlich unsere Liefergebiete. Kontaktieren Sie uns - 
              oft können wir auch in angrenzende Gebiete liefern!
            </p>
            <div className="inline-flex items-center bg-white/20 px-6 py-3 rounded-lg">
              <span className="text-amber-300 font-medium">+43 1 234 5678</span>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default Liefergebiet;