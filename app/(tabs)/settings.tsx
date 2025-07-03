import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Bell, Globe, HelpCircle, LogOut, ChevronRight, Smartphone, CreditCard } from 'lucide-react-native';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const profileItems = [
    {
      icon: <User size={20} color="#6B7280" />,
      title: 'Profil utilisateur',
      subtitle: 'Jean Dupont • jean.dupont@email.com',
      onPress: () => Alert.alert('Profil', 'Modification du profil utilisateur'),
    },
    {
      icon: <CreditCard size={20} color="#6B7280" />,
      title: 'Cartes liées',
      subtitle: '2 cartes actives',
      onPress: () => Alert.alert('Cartes', 'Gestion des cartes bancaires'),
    },
  ];

  const appSettings = [
    {
      icon: <Bell size={20} color="#6B7280" />,
      title: 'Notifications',
      subtitle: 'Recevoir les alertes de transaction',
      hasSwitch: true,
      value: notificationsEnabled,
      onToggle: setNotificationsEnabled,
    },
    {
      icon: <Smartphone size={20} color="#6B7280" />,
      title: 'Son de confirmation',
      subtitle: 'Son lors des paiements réussis',
      hasSwitch: true,
      value: soundEnabled,
      onToggle: setSoundEnabled,
    },
    {
      icon: <Globe size={20} color="#6B7280" />,
      title: 'Langue',
      subtitle: 'Français',
      onPress: () => Alert.alert('Langue', 'Sélection de la langue'),
    },
  ];

  const supportItems = [
    {
      icon: <HelpCircle size={20} color="#6B7280" />,
      title: 'Centre d\'aide',
      subtitle: 'FAQ et support technique',
      onPress: () => Alert.alert('Aide', 'Centre d\'aide et documentation'),
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Déconnexion', style: 'destructive', onPress: () => Alert.alert('Déconnecté', 'Vous avez été déconnecté') }
      ]
    );
  };

  const renderSettingItem = (item: any, index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.settingItem}
      onPress={item.onPress}
      disabled={item.hasSwitch}
    >
      <View style={styles.settingIcon}>
        {item.icon}
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{item.title}</Text>
        <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
      </View>
      {item.hasSwitch ? (
        <Switch
          value={item.value}
          onValueChange={item.onToggle}
          trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
          thumbColor={item.value ? '#ffffff' : '#ffffff'}
        />
      ) : (
        <ChevronRight size={16} color="#9CA3AF" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Paramètres</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compte</Text>
          {profileItems.map(renderSettingItem)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Application</Text>
          {appSettings.map(renderSettingItem)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          {supportItems.map(renderSettingItem)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>À propos</Text>
          <View style={styles.aboutContainer}>
            <Text style={styles.appName}>NFC Payment HCE</Text>
            <Text style={styles.version}>Version 1.0.0</Text>
            <Text style={styles.description}>
              Application de démonstration pour les paiements NFC avec Host Card Emulation (HCE).
            </Text>
            
            <View style={styles.technicalInfo}>
              <Text style={styles.techTitle}>Informations techniques:</Text>
              <Text style={styles.techItem}>• SDK Android minimum requis: API 19</Text>
              <Text style={styles.techItem}>• NFC HCE support requis</Text>
              <Text style={styles.techItem}>• React Native avec modules natifs</Text>
              <Text style={styles.techItem}>• Intégration EMV et ISO 14443</Text>
            </View>
          </View>
        </View>

        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="#EF4444" />
            <Text style={styles.logoutText}>Déconnexion</Text>
          </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#374151',
  },
  section: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#374151',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
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
  aboutContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  appName: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#374151',
    marginBottom: 4,
  },
  version: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 16,
  },
  technicalInfo: {
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#3B82F6',
  },
  techTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    color: '#374151',
    marginBottom: 8,
  },
  techItem: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  logoutSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  logoutText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#EF4444',
    marginLeft: 8,
  },
});