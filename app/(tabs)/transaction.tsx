import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Smartphone, Wifi, CheckCircle, XCircle, Loader } from 'lucide-react-native';

type TransactionState = 'idle' | 'scanning' | 'processing' | 'success' | 'error';

export default function TransactionScreen() {
  const [transactionState, setTransactionState] = useState<TransactionState>('idle');
  const [amount, setAmount] = useState<number | null>(null);
  const [pulseAnimation] = useState(new Animated.Value(1));

  useEffect(() => {
    if (transactionState === 'scanning') {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnimation, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      
      return () => pulse.stop();
    }
  }, [transactionState, pulseAnimation]);

  const startNFCPayment = () => {
    Alert.alert(
      'Paiement NFC',
      'Cette fonctionnalité nécessite:\n\n' +
      '• Un device Android avec NFC\n' +
      '• Implémentation native React Native\n' +
      '• API HCE Android\n' +
      '• Certification EMV\n\n' +
      'Simuler une transaction?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Simuler', onPress: simulateNFCTransaction }
      ]
    );
  };

  const simulateNFCTransaction = () => {
    setTransactionState('scanning');
    
    // Simuler la détection NFC
    setTimeout(() => {
      setAmount(25.99);
      setTransactionState('processing');
      
      // Simuler le traitement
      setTimeout(() => {
        const success = Math.random() > 0.3; // 70% de succès
        setTransactionState(success ? 'success' : 'error');
        
        // Reset après 3 secondes
        setTimeout(() => {
          setTransactionState('idle');
          setAmount(null);
        }, 3000);
      }, 2000);
    }, 2000);
  };

  const getStatusIcon = () => {
    switch (transactionState) {
      case 'scanning':
        return <Wifi size={60} color="#3B82F6" />;
      case 'processing':
        return <Loader size={60} color="#F59E0B" />;
      case 'success':
        return <CheckCircle size={60} color="#10B981" />;
      case 'error':
        return <XCircle size={60} color="#EF4444" />;
      default:
        return <Smartphone size={60} color="#6B7280" />;
    }
  };

  const getStatusText = () => {
    switch (transactionState) {
      case 'scanning':
        return 'Recherche d\'un terminal NFC...';
      case 'processing':
        return 'Traitement du paiement...';
      case 'success':
        return 'Paiement réussi !';
      case 'error':
        return 'Paiement échoué';
      default:
        return 'Prêt pour le paiement NFC';
    }
  };

  const getStatusColor = () => {
    switch (transactionState) {
      case 'scanning':
        return '#3B82F6';
      case 'processing':
        return '#F59E0B';
      case 'success':
        return '#10B981';
      case 'error':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Paiement NFC</Text>
        <Text style={styles.subtitle}>
          Approchez votre téléphone du terminal
        </Text>
      </View>

      <View style={styles.transactionArea}>
        <Animated.View style={[
          styles.nfcIndicator,
          transactionState === 'scanning' && {
            transform: [{ scale: pulseAnimation }]
          }
        ]}>
          {getStatusIcon()}
        </Animated.View>

        <Text style={[styles.statusText, { color: getStatusColor() }]}>
          {getStatusText()}
        </Text>

        {amount && (
          <View style={styles.amountContainer}>
            <Text style={styles.amountLabel}>Montant</Text>
            <Text style={styles.amount}>
              {amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
            </Text>
          </View>
        )}

        {transactionState === 'idle' && (
          <TouchableOpacity 
            style={styles.payButton}
            onPress={startNFCPayment}
          >
            <Text style={styles.payButtonText}>Démarrer le paiement</Text>
          </TouchableOpacity>
        )}

        {transactionState === 'scanning' && (
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={() => setTransactionState('idle')}
          >
            <Text style={styles.cancelButtonText}>Annuler</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Configuration HCE requise</Text>
        <View style={styles.requirementsList}>
          <Text style={styles.requirement}>• Android 4.4+ avec NFC activé</Text>
          <Text style={styles.requirement}>• Application définie comme service de paiement par défaut</Text>
          <Text style={styles.requirement}>• Certificats de sécurité validés</Text>
          <Text style={styles.requirement}>• Intégration avec processeurs de paiement</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#374151',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  transactionArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  nfcIndicator: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  statusText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
  },
  amountContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  amountLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  amount: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#1E40AF',
  },
  payButton: {
    backgroundColor: '#1E40AF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  payButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#ffffff',
  },
  cancelButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  cancelButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#ffffff',
  },
  infoSection: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
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
  requirementsList: {
    marginLeft: 8,
  },
  requirement: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 4,
  },
});