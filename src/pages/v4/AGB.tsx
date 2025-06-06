
import React from 'react';
import Header from '@/components/v4/Header';
import Footer from '@/components/v4/Footer';

const AGB = () => {
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
              <h1 className="text-3xl font-bold text-gray-900">Conditions Générales de Vente</h1>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 1 - Objet</h2>
                <p>
                  Les présentes conditions générales de vente régissent les relations 
                  contractuelles entre Fuel Express France et ses clients dans le cadre 
                  de la vente et de la livraison de fioul domestique.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 2 - Prix</h2>
                <div className="bg-red-50/80 p-6 rounded-xl">
                  <ul className="space-y-2">
                    <li>• Les prix sont indiqués en euros TTC</li>
                    <li>• Les prix incluent les frais de livraison pour les commandes ≥ 3000L</li>
                    <li>• Frais de livraison de 39€ pour les commandes &lt; 3000L</li>
                    <li>• Les prix peuvent être modifiés à tout moment selon les cours du marché</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 3 - Commandes</h2>
                <p>
                  Les commandes peuvent être passées en ligne 24h/24 ou par téléphone 
                  du lundi au vendredi de 8h à 18h. Toute commande vaut acceptation 
                  des présentes conditions générales de vente.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 4 - Livraison</h2>
                <ul className="space-y-2">
                  <li>• Délai de livraison : 24-48h selon les régions</li>
                  <li>• Livraison en France métropolitaine uniquement</li>
                  <li>• Accès camion obligatoire (tuyau de livraison 50m maximum)</li>
                  <li>• Présence obligatoire du client ou de son représentant</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 5 - Paiement</h2>
                <p>
                  Le paiement s'effectue à la livraison par chèque, espèces ou carte bancaire, 
                  ou par virement bancaire pour les commandes importantes. 
                  Aucun escompte n'est accordé en cas de paiement anticipé.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 6 - Réclamations</h2>
                <p>
                  Toute réclamation doit être formulée dans les 48h suivant la livraison. 
                  Les réclamations peuvent être adressées par email à contact@fuel-france.fr 
                  ou par téléphone au +33 1 23 45 67 89.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Article 7 - Droit applicable</h2>
                <p>
                  Les présentes conditions générales sont soumises au droit français. 
                  En cas de litige, compétence est donnée aux tribunaux de Paris.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AGB;
