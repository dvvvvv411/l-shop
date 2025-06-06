
import React from 'react';
import Header from '@/components/v4/Header';
import Footer from '@/components/v4/Footer';

const Widerrufsrecht = () => {
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
              <h1 className="text-3xl font-bold text-gray-900">Droit de Rétractation</h1>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Délai de rétractation</h2>
                <div className="bg-red-50/80 p-6 rounded-xl">
                  <p className="font-semibold">
                    Vous disposez d'un délai de 14 jours pour exercer votre droit 
                    de rétractation sans avoir à justifier de motifs ni à payer de pénalités.
                  </p>
                </div>
                <p>
                  Le délai de rétractation expire 14 jours après le jour de la livraison 
                  de votre commande de fioul domestique.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Exercice du droit de rétractation</h2>
                <p>
                  Pour exercer le droit de rétractation, vous devez nous notifier 
                  votre décision de rétractation au moyen d'une déclaration dénuée d'ambiguïté.
                </p>
                
                <div className="bg-blue-50/80 p-6 rounded-xl">
                  <h3 className="font-bold mb-2">Moyens de contact :</h3>
                  <p>
                    <strong>Email :</strong> retractation@fuel-france.fr<br />
                    <strong>Téléphone :</strong> +33 1 23 45 67 89<br />
                    <strong>Courrier :</strong><br />
                    Fuel Express France<br />
                    Service Rétractation<br />
                    123 Avenue de la République<br />
                    75011 Paris, France
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Modèle de formulaire de rétractation</h2>
                <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-red-600">
                  <p className="italic">
                    À l'attention de Fuel Express France :<br /><br />
                    
                    Je vous notifie par la présente ma rétractation du contrat portant 
                    sur la vente du bien ci-dessous :<br /><br />
                    
                    - Commandé le : [Date]<br />
                    - Reçu le : [Date]<br />
                    - Nom du consommateur : [Nom]<br />
                    - Adresse du consommateur : [Adresse]<br />
                    - Signature du consommateur (uniquement en cas de notification sur papier)<br />
                    - Date : [Date]
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Effets de la rétractation</h2>
                <p>
                  En cas de rétractation de votre part, nous vous rembourserons 
                  tous les paiements reçus de vous, y compris les frais de livraison, 
                  sans retard excessif et au plus tard 14 jours à compter du jour 
                  où nous sommes informés de votre décision de rétractation.
                </p>
                
                <div className="bg-yellow-50/80 p-6 rounded-xl border border-yellow-200">
                  <h3 className="font-bold mb-2 text-yellow-800">⚠️ Attention :</h3>
                  <p className="text-yellow-800">
                    En raison de la nature du produit (fioul domestique livré), 
                    le droit de rétractation ne peut être exercé qu'avant la livraison. 
                    Une fois le fioul livré et déchargé dans votre cuve, 
                    la rétractation n'est plus possible pour des raisons d'hygiène et de sécurité.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Remboursement</h2>
                <p>
                  Nous procéderons au remboursement en utilisant le même moyen 
                  de paiement que celui que vous avez utilisé pour la transaction initiale, 
                  sauf si vous convenez expressément d'un moyen différent.
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

export default Widerrufsrecht;
