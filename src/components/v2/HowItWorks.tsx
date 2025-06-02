import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, MapPin, Truck, CheckCircle } from 'lucide-react';
const HowItWorks = () => {
  const steps = [{
    step: 1,
    icon: Calculator,
    title: "Preis berechnen",
    description: "Geben Sie Ihre PLZ und gewünschte Menge ein. Unser Rechner zeigt Ihnen sofort den aktuellen Bestpreis."
  }, {
    step: 2,
    icon: MapPin,
    title: "Bestellung tätigen",
    description: "Wählen Sie Ihren Wunschtermin aus den verfügbaren Lieferterminen in Ihrer Region."
  }, {
    step: 3,
    icon: CheckCircle,
    title: "Rechnung erhalten",
    description: "Sie erhalten Ihre Rechnung per E-Mail und können bequem per Überweisung oder Lastschrift bezahlen."
  }, {
    step: 4,
    icon: Truck,
    title: "Lieferung erhalten",
    description: "Unser Lieferfahrzeug kommt zum vereinbarten Termin und befüllt Ihren Tank professionell und sauber."
  }];
  return;
};
export default HowItWorks;