import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Eye, EyeOff, RefreshCw } from 'lucide-react-native';
import NFCCard from '@/components/NFCCard';

const mockCards = [
  {
    id: '1',
    cardNumber: '4532123456789012',
    holderName: 'Jean Dupont',
    expiryDate: '12/26',
    balance: 1234.56,
    currency: 'EUR',
    isActive: true,
  },
  {
    id: '2',
    cardNumber: '5555123456789001',
    holderName: 'Jean Dupont',
    expiryDate: '08/25',
    balance: 567.89,
    currency: 'EUR',
    isActive: false,
  },
];

export default function HomeScreen() {
  const [cards, setCards] = useState(mockCards);
  const [showBalance, setShowBalance] = useState(true);

  const toggleCardStatus = (cardId: string) => {
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === cardId ? { ...card, isActive: !card.isActive } : card
      )
    );
  };

  const addNewCard = () => {
    Alert.alert(
      'Ajouter une carte',
      'Cette fonctionnalité nécessite une implémentation native complète avec les APIs bancaires.',
      [{ text: 'OK' }]
    );
  };

  const refreshCards = () => {
    Alert.alert(
      'Actualisation',
      'Synchronisation avec les services bancaires...',
      [{ text: 'OK' }]
    );
  };

  const totalBalance = cards.reduce((sum, card) => sum + card.balance, 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Bonjour,</Text>
            <Text style={styles.userName}>Jean Dupont</Text>
          </View>
          <TouchableOpacity onPress={refreshCards} style={styles.refreshButton}>
            <RefreshCw size={20} color="#1E40AF" />
          </TouchableOpacity>
        </View>

        <View style={styles.balanceContainer}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>Solde total</Text>
            <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
              {showBalance ? 
                <Eye size={20} color="#6B7280" /> : 
                <EyeOff size={20} color="#6B7280" />
              }
            </TouchableOpacity>
          </View>
          <Text style={styles.totalBalance}>
            {showBalance ? 
              totalBalance.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) :
              '••••••'
            }
          </Text>
        </View>

        <View style={styles.cardsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mes Cartes NFC</Text>
            <TouchableOpacity onPress={addNewCard} style={styles.addButton}>
              <Plus size={20} color="#1E40AF" />
            </TouchableOpacity>
          </View>

          {cards.map((card) => (
            <NFCCard
              key={card.id}
              cardNumber={card.cardNumber}
              holderName={card.holderName}
              expiryDate={card.expiryDate}
              balance={card.balance}
              currency={card.currency}
              isActive={card.isActive}
              onToggle={() => toggleCardStatus(card.id)}
            />
          ))}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>À propos de HCE</Text>
          <Text style={styles.infoText}>
            L'émulation de carte hôte (HCE) permet à votre téléphone d'agir comme une carte de paiement sans contact. 
            Activez une carte pour effectuer des paiements NFC en approchant votre téléphone d'un terminal de paiement.
          </Text>
          <Text style={styles.warningText}>
            ⚠️ Cette démo nécessite une implémentation native complète avec React Native et les APIs Android HCE.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  greeting: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
  },
  userName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#374151',
  },
  refreshButton: {
    padding: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  balanceContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  balanceLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  totalBalance: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#1E40AF',
  },
  cardsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#374151',
  },
  addButton: {
    padding: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoSection: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#374151',
    marginBottom: 12,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  warningText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#F59E0B',
    backgroundColor: '#FEF3C7',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
});