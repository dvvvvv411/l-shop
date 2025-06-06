
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
                  <p><strong>Energy OIL Company Sàrl</strong></p>
                  <p>95 rue Compans</p>
                  <p>75019 Paris</p>
                  <p>France</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Informations légales</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p><strong>SIRET :</strong> 40538489200015</p>
                    <p><strong>TVA intracommunautaire :</strong> FR03145160497</p>
                    <p><strong>RCS :</strong> Paris 405 384 892</p>
                  </div>
                  <div>
                    <p><strong>Code APE :</strong> 4671Z</p>
                    <p><strong>Forme juridique :</strong> SARL</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
                <p>
                  <strong>Email :</strong> info@fioul-rapide.fr<br />
                  <strong>Site web :</strong> fioul-rapide.fr<br />
                  <strong>Horaires :</strong> Lundi - Vendredi : 8h00 - 18h00
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Directeur de la publication</h2>
                <p>Energy OIL Company Sàrl</p>
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
