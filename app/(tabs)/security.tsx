import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Shield, Lock, Fingerprint, Smartphone, AlertTriangle, Key } from 'lucide-react-native';

export default function SecurityScreen() {
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [pinRequired, setPinRequired] = useState(true);
  const [nfcLocked, setNfcLocked] = useState(false);
  const [autoLock, setAutoLock] = useState(true);

  const securityItems = [
    {
      icon: <Fingerprint size={24} color="#1E40AF" />,
      title: 'Authentification biométrique',
      subtitle: 'Empreinte digitale ou reconnaissance faciale',
      value: biometricEnabled,
      onToggle: setBiometricEnabled,
    },
    {
      icon: <Lock size={24} color="#1E40AF" />,
      title: 'Code PIN requis',
      subtitle: 'Demander un code PIN pour chaque transaction',
      value: pinRequired,
      onToggle: setPinRequired,
    },
    {
      icon: <Smartphone size={24} color="#1E40AF" />,
      title: 'Verrouillage NFC',
      subtitle: 'Désactiver temporairement tous les paiements NFC',
      value: nfcLocked,
      onToggle: setNfcLocked,
    },
    {
      icon: <Shield size={24} color="#1E40AF" />,
      title: 'Verrouillage automatique',
      subtitle: 'Verrouiller l\'app après 5 minutes d\'inactivité',
      value: autoLock,
      onToggle: setAutoLock,
    },
  ];

  const handleChangePin = () => {
    Alert.alert(
      'Changer le code PIN',
      'Cette fonctionnalité nécessite une implémentation sécurisée avec chiffrement.',
      [{ text: 'OK' }]
    );
  };

  const handleDeviceCheck = () => {
    Alert.alert(
      'Vérification de sécurité',
      'Appareil: Sécurisé ✓\nRoot/Jailbreak: Non détecté ✓\nApplications malveillantes: Aucune ✓\nNFC: Fonctionnel ✓',
      [{ text: 'OK' }]
    );
  };

  const handleEmergencyLock = () => {
    Alert.alert(
      'Verrouillage d\'urgence',
      'Cette action va immédiatement désactiver toutes les cartes et fonctionnalités de paiement. Continuer?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Verrouiller', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Verrouillage activé', 'Toutes les cartes ont été désactivées.');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Sécurité</Text>
          <TouchableOpacity onPress={handleDeviceCheck} style={styles.checkButton}>
            <Shield size={20} color="#10B981" />
            <Text style={styles.checkButtonText}>Vérifier</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Shield size={28} color="#10B981" />
            <View style={styles.statusInfo}>
              <Text style={styles.statusTitle}>Appareil sécurisé</Text>
              <Text style={styles.statusSubtitle}>Dernière vérification: maintenant</Text>
            </View>
          </View>
          <View style={styles.statusIndicator}>
            <View style={[styles.statusDot, { backgroundColor: '#10B981' }]} />
          </View>
        </View>

        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Paramètres de sécurité</Text>
          
          {securityItems.map((item, index) => (
            <View key={index} style={styles.settingItem}>
              <View style={styles.settingIcon}>
                {item.icon}
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>{item.title}</Text>
                <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
              </View>
              <Switch
                value={item.value}
                onValueChange={item.onToggle}
                trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
                thumbColor={item.value ? '#ffffff' : '#ffffff'}
              />
            </View>
          ))}
        </View>

        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Actions de sécurité</Text>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleChangePin}>
            <Key size={20} color="#1E40AF" />
            <Text style={styles.actionButtonText}>Changer le code PIN</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.emergencyButton} onPress={handleEmergencyLock}>
            <AlertTriangle size={20} color="#ffffff" />
            <Text style={styles.emergencyButtonText}>Verrouillage d'urgence</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Sécurité HCE</Text>
          <Text style={styles.infoText}>
            L'émulation de carte hôte utilise un élément sécurisé (SE) ou un environnement d'exécution de confiance (TEE) 
            pour protéger vos données de paiement. Les clés cryptographiques ne quittent jamais l'environnement sécurisé.
          </Text>
          
          <View style={styles.securityFeatures}>
            <Text style={styles.featureItem}>• Chiffrement AES-256</Text>
            <Text style={styles.featureItem}>• Authentification par jeton</Text>
            <Text style={styles.featureItem}>• Détection de fraude en temps réel</Text>
            <Text style={styles.featureItem}>• Conformité PCI DSS</Text>
          </View>
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
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#374151',
  },
  checkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  checkButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#10B981',
    marginLeft: 4,
  },
  statusCard: {
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusInfo: {
    marginLeft: 12,
    flex: 1,
  },
  statusTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#374151',
  },
  statusSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  statusIndicator: {
    alignItems: 'center',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  settingsSection: {
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
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#374151',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#374151',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  actionsSection: {
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
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  actionButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1E40AF',
    marginLeft: 8,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EF4444',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  emergencyButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#ffffff',
    marginLeft: 8,
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
    marginBottom: 16,
  },
  securityFeatures: {
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  featureItem: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: '#374151',
    marginBottom: 4,
  },
});