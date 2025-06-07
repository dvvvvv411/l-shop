
import { useMemo } from 'react';

export interface OrderTranslations {
  success: {
    orderCreated: string;
    statusUpdated: string;
    orderHidden: string;
    orderUnhidden: string;
  };
  errors: {
    fetchOrders: string;
    createOrder: string;
    updateStatus: string;
    hideOrder: string;
    unhideOrder: string;
  };
  info: {
    orderProcessed: string;
  };
}

const translations = {
  de: {
    success: {
      orderCreated: 'Bestellung wurde erfolgreich erstellt.',
      statusUpdated: 'Bestellstatus wurde aktualisiert.',
      orderHidden: 'Bestellung wurde ausgeblendet.',
      orderUnhidden: 'Bestellung wurde wieder eingeblendet.'
    },
    errors: {
      fetchOrders: 'Bestellungen konnten nicht geladen werden.',
      createOrder: 'Bestellung konnte nicht erstellt werden.',
      updateStatus: 'Bestellstatus konnte nicht aktualisiert werden.',
      hideOrder: 'Bestellung konnte nicht ausgeblendet werden.',
      unhideOrder: 'Bestellung konnte nicht wieder eingeblendet werden.'
    },
    info: {
      orderProcessed: 'Diese Bestellung wurde bereits verarbeitet.'
    }
  },
  fr: {
    success: {
      orderCreated: 'Commande créée avec succès.',
      statusUpdated: 'Statut de commande mis à jour.',
      orderHidden: 'Commande masquée.',
      orderUnhidden: 'Commande affichée à nouveau.'
    },
    errors: {
      fetchOrders: 'Impossible de charger les commandes.',
      createOrder: 'Impossible de créer la commande.',
      updateStatus: 'Impossible de mettre à jour le statut de la commande.',
      hideOrder: 'Impossible de masquer la commande.',
      unhideOrder: 'Impossible d\'afficher à nouveau la commande.'
    },
    info: {
      orderProcessed: 'Cette commande a déjà été traitée.'
    }
  }
} as const;

export const useOrderTranslations = (): OrderTranslations => {
  return useMemo(() => {
    // Check if user came from French version
    const orderReferrer = localStorage.getItem('orderReferrer');
    const isFrench = orderReferrer === '/4/home';
    
    return translations[isFrench ? 'fr' : 'de'];
  }, []);
};
