import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ArrowUpRight, ArrowDownLeft, Smartphone } from 'lucide-react-native';

interface TransactionItemProps {
  id: string;
  type: 'debit' | 'credit' | 'nfc';
  amount: number;
  currency: string;
  merchant: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export default function TransactionItem({
  type,
  amount,
  currency,
  merchant,
  date,
  status,
}: TransactionItemProps) {
  const getIcon = () => {
    switch (type) {
      case 'debit':
        return <ArrowUpRight size={20} color="#EF4444" />;
      case 'credit':
        return <ArrowDownLeft size={20} color="#10B981" />;
      case 'nfc':
        return <Smartphone size={20} color="#3B82F6" />;
      default:
        return <ArrowUpRight size={20} color="#6B7280" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return '#10B981';
      case 'pending':
        return '#F59E0B';
      case 'failed':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getAmountColor = () => {
    switch (type) {
      case 'credit':
        return '#10B981';
      case 'debit':
      case 'nfc':
        return '#EF4444';
      default:
        return '#374151';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {getIcon()}
      </View>
      
      <View style={styles.details}>
        <Text style={styles.merchant}>{merchant}</Text>
        <Text style={styles.date}>{date}</Text>
        <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor()}20` }]}>
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {status === 'completed' ? 'Terminé' : 
             status === 'pending' ? 'En cours' : 'Échoué'}
          </Text>
        </View>
      </View>
      
      <View style={styles.amountContainer}>
        <Text style={[styles.amount, { color: getAmountColor() }]}>
          {type === 'credit' ? '+' : '-'}
          {amount.toLocaleString('fr-FR', { 
            style: 'currency', 
            currency: currency 
          })}
        </Text>
        <Text style={styles.type}>
          {type === 'nfc' ? 'Paiement NFC' : 
           type === 'credit' ? 'Crédit' : 'Débit'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    marginVertical: 4,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  merchant: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#374151',
    marginBottom: 2,
  },
  date: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    marginBottom: 2,
  },
  type: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: '#6B7280',
  },
});