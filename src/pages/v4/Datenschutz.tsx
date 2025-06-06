
import React from 'react';
import Header from '@/components/v4/Header';
import Footer from '@/components/v4/Footer';

const Datenschutz = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3 mb-8">
              <div className="flex space-x-1">
                <div className="w-3 h-2 bg-blue-600 rounded-sm"></div>
                <div className="w-3 h-2 bg-white border border-gray-300 rounded-sm"></div>
                <div className="w-3 h-2 bg-red-600 rounded-sm"></div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Politique de Confidentialité</h1>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Collecte des données</h2>
                <p>
                  Fuel Express France collecte les données personnelles nécessaires 
                  à la gestion de votre commande et à la livraison de fioul domestique.
                </p>
                <div className="bg-red-50/80 p-6 rounded-xl">
                  <h3 className="font-bold mb-2">Données collectées :</h3>
                  <ul className="space-y-1">
                    <li>• Nom, prénom, adresse</li>
                    <li>• Numéro de téléphone</li>
                    <li>• Adresse email</li>
                    <li>• Informations de livraison</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Utilisation des données</h2>
                <p>Vos données personnelles sont utilisées pour :</p>
                <ul className="space-y-2">
                  <li>• Traiter et livrer votre commande</li>
                  <li>• Vous contacter concernant votre livraison</li>
                  <li>• Améliorer nos services</li>
                  <li>• Vous envoyer des informations commerciales (avec votre accord)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Protection des données</h2>
                <p>
                  Nous mettons en œuvre toutes les mesures techniques et organisationnelles 
                  appropriées pour protéger vos données personnelles contre la perte, 
                  l'utilisation abusive, l'accès non autorisé, la divulgation, la modification ou la destruction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Vos droits</h2>
                <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                <ul className="space-y-2">
                  <li>• Droit d'accès à vos données</li>
                  <li>• Droit de rectification</li>
                  <li>• Droit à l'effacement</li>
                  <li>• Droit à la limitation du traitement</li>
                  <li>• Droit à la portabilité</li>
                  <li>• Droit d'opposition</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
                <p>
                  Pour exercer vos droits ou pour toute question relative à la protection 
                  de vos données personnelles, contactez-nous :
                </p>
                <div className="bg-blue-50/80 p-6 rounded-xl">
                  <p>
                    <strong>Email :</strong> dpo@fuel-france.fr<br />
                    <strong>Courrier :</strong> Fuel Express France - Service DPO<br />
                    123 Avenue de la République<br />
                    75011 Paris, France
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Datenschutz;
