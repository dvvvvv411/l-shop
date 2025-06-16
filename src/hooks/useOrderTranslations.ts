
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
  },
  it: {
    success: {
      orderCreated: 'Ordine creato con successo.',
      statusUpdated: 'Stato dell\'ordine aggiornato.',
      orderHidden: 'Ordine nascosto.',
      orderUnhidden: 'Ordine mostrato di nuovo.'
    },
    errors: {
      fetchOrders: 'Impossibile caricare gli ordini.',
      createOrder: 'Impossibile creare l\'ordine.',
      updateStatus: 'Impossibile aggiornare lo stato dell\'ordine.',
      hideOrder: 'Impossibile nascondere l\'ordine.',
      unhideOrder: 'Impossibile mostrare di nuovo l\'ordine.'
    },
    info: {
      orderProcessed: 'Questo ordine è già stato elaborato.'
    }
  },
  nl: {
    success: {
      orderCreated: 'Bestelling succesvol aangemaakt.',
      statusUpdated: 'Bestelling status bijgewerkt.',
      orderHidden: 'Bestelling verborgen.',
      orderUnhidden: 'Bestelling weer zichtbaar gemaakt.'
    },
    errors: {
      fetchOrders: 'Kon bestellingen niet laden.',
      createOrder: 'Kon bestelling niet aanmaken.',
      updateStatus: 'Kon bestelling status niet bijwerken.',
      hideOrder: 'Kon bestelling niet verbergen.',
      unhideOrder: 'Kon bestelling niet weer zichtbaar maken.'
    },
    info: {
      orderProcessed: 'Deze bestelling is al verwerkt.'
    }
  }
} as const;

export const useOrderTranslations = (): OrderTranslations => {
  return useMemo(() => {
    // Check if user came from Italian, French, Belgian or German version
    const orderReferrer = localStorage.getItem('orderReferrer');
    const isItalian = orderReferrer === '/5/home';
    const isFrench = orderReferrer === '/4/home';
    const isBelgian = orderReferrer === '/7/home';
    
    if (isItalian) {
      return translations.it;
    } else if (isFrench) {
      return translations.fr;
    } else if (isBelgian) {
      return translations.nl;
    }
    
    return translations.de;
  }, []);
};
