
import React from 'react';
import Header from '@/components/v4/Header';
import Footer from '@/components/v4/Footer';

const Impressum = () => {
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
              <h1 className="text-3xl font-bold text-gray-900">Mentions Légales</h1>
            </div>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Éditeur du site</h2>
                <div className="bg-red-50/80 p-6 rounded-xl">
                  <p><strong>Fuel Express France</strong></p>
                  <p>SARL au capital de 50.000 €</p>
                  <p>RCS Paris : 123 456 789</p>
                  <p>SIRET : 123 456 789 00012</p>
                  <p>TVA intracommunautaire : FR 12 123456789</p>
                  <p>Code APE : 4671Z</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Siège social</h2>
                <p>
                  123 Avenue de la République<br />
                  75011 Paris<br />
                  France
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
                <p>
                  <strong>Téléphone :</strong> +33 1 23 45 67 89<br />
                  <strong>Email :</strong> contact@fuel-france.fr<br />
                  <strong>Horaires :</strong> Lundi - Vendredi : 8h00 - 18h00
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Directeur de la publication</h2>
                <p>Pierre Dubois, Gérant</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Hébergement</h2>
                <p>
                  Ce site est hébergé par :<br />
                  <strong>OVH SAS</strong><br />
                  2 rue Kellermann<br />
                  59100 Roubaix<br />
                  France
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Propriété intellectuelle</h2>
                <p>
                  L'ensemble de ce site relève de la législation française et internationale 
                  sur le droit d'auteur et la propriété intellectuelle. Tous les droits de 
                  reproduction sont réservés, y compris pour les documents téléchargeables 
                  et les représentations iconographiques et photographiques.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Responsabilité</h2>
                <p>
                  Les informations contenues sur ce site sont aussi précises que possible 
                  et le site remis à jour à différentes périodes de l'année, mais peut 
                  toutefois contenir des inexactitudes ou des omissions.
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

export default Impressum;
