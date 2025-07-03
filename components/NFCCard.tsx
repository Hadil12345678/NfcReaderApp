import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CreditCard, Wifi } from 'lucide-react-native';

interface NFCCardProps {
  cardNumber: string;
  holderName: string;
  expiryDate: string;
  balance: number;
  currency: string;
  isActive: boolean;
  onToggle: () => void;
}

export default function NFCCard({
  cardNumber,
  holderName,
  expiryDate,
  balance,
  currency,
  isActive,
  onToggle,
}: NFCCardProps) {
  return (
    <TouchableOpacity onPress={onToggle} style={styles.container}>
      <LinearGradient
        colors={isActive ? ['#1E40AF', '#3B82F6'] : ['#6B7280', '#9CA3AF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}>
        <View style={styles.header}>
          <View style={styles.chipContainer}>
            <View style={styles.chip} />
            <Wifi size={24} color="white" style={styles.nfcIcon} />
          </View>
          <View style={[styles.statusIndicator, { backgroundColor: isActive ? '#10B981' : '#EF4444' }]} />
        </View>
        
        <View style={styles.cardNumberContainer}>
          <Text style={styles.cardNumber}>
            {cardNumber.replace(/(.{4})/g, '$1 ').trim()}
          </Text>
        </View>
        
        <View style={styles.cardDetails}>
          <View>
            <Text style={styles.label}>TITULAIRE</Text>
            <Text style={styles.holderName}>{holderName}</Text>
          </View>
          <View>
            <Text style={styles.label}>EXPIRE</Text>
            <Text style={styles.expiryDate}>{expiryDate}</Text>
          </View>
        </View>
        
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Solde disponible</Text>
          <Text style={styles.balance}>
            {balance.toLocaleString('fr-FR', { 
              style: 'currency', 
              currency: currency 
            })}
          </Text>
        </View>
        
        <View style={styles.footer}>
          <CreditCard size={20} color="rgba(255,255,255,0.8)" />
          <Text style={styles.statusText}>
            {isActive ? 'CARTE ACTIVE' : 'CARTE DÉSACTIVÉE'}
          </Text> 
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  card: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    padding: 20,
    justifyContent: 'space-between',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chip: {
    width: 30,
    height: 24,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 4,
    marginRight: 12,
  },
  nfcIcon: {
    transform: [{ rotate: '90deg' }],
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  cardNumberContainer: {
    marginVertical: 8,
  },
  cardNumber: {
    fontFamily: 'RobotoMono-Regular',
    fontSize: 18,
    color: 'white',
    letterSpacing: 2,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 2,
  },
  holderName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: 'white',
    textTransform: 'uppercase',
  },
  expiryDate: {
    fontFamily: 'RobotoMono-Regular',
    fontSize: 12,
    color: 'white',
  },
  balanceContainer: {
    alignItems: 'center',
  },
  balanceLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
  },
  balance: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: 'white',
    marginTop: 2,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 0.5,
  },
});