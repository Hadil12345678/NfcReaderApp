import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Filter, Calendar, TrendingDown, TrendingUp } from 'lucide-react-native';
import TransactionItem from '@/components/TransactionItem';

const mockTransactions = [
  {
    id: '1',
    type: 'nfc' as const,
    amount: 25.99,
    currency: 'EUR',
    merchant: 'Café de la Place',
    date: 'Aujourd\'hui 14:32',
    status: 'completed' as const,
  },
  {
    id: '2',
    type: 'nfc' as const,
    amount: 12.50,
    currency: 'EUR',
    merchant: 'Boulangerie Martin',
    date: 'Aujourd\'hui 09:15',
    status: 'completed' as const,
  },
  {
    id: '3',
    type: 'credit' as const,
    amount: 500.00,
    currency: 'EUR',
    merchant: 'Virement salaire',
    date: 'Hier 08:00',
    status: 'completed' as const,
  },
  {
    id: '4',
    type: 'nfc' as const,
    amount: 89.99,
    currency: 'EUR',
    merchant: 'Supermarché Casino',
    date: 'Hier 18:45',
    status: 'completed' as const,
  },
  {
    id: '5',
    type: 'nfc' as const,
    amount: 15.00,
    currency: 'EUR',
    merchant: 'Pharmacie Centrale',
    date: '15 Jan 16:20',
    status: 'failed' as const,
  },
  {
    id: '6',
    type: 'debit' as const,
    amount: 45.00,
    currency: 'EUR',
    merchant: 'Prélèvement Netflix',
    date: '14 Jan 12:00',
    status: 'completed' as const,
  },
];

export default function HistoryScreen() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'nfc' | 'credit' | 'debit'>('all');

  const filteredTransactions = mockTransactions.filter(transaction => {
    if (selectedFilter === 'all') return true;
    return transaction.type === selectedFilter;
  });

  const getTotalSpent = () => {
    return mockTransactions
      .filter(t => t.type === 'nfc' || t.type === 'debit')
      .filter(t => t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getTotalReceived = () => {
    return mockTransactions
      .filter(t => t.type === 'credit')
      .filter(t => t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const filterButtons = [
    { key: 'all' as const, label: 'Tout', count: mockTransactions.length },
    { key: 'nfc' as const, label: 'NFC', count: mockTransactions.filter(t => t.type === 'nfc').length },
    { key: 'credit' as const, label: 'Crédits', count: mockTransactions.filter(t => t.type === 'credit').length },
    { key: 'debit' as const, label: 'Débits', count: mockTransactions.filter(t => t.type === 'debit').length },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Historique</Text>
          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.headerButton}>
              <Calendar size={20} color="#1E40AF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Filter size={20} color="#1E40AF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <TrendingDown size={20} color="#EF4444" />
              <Text style={styles.summaryLabel}>Dépenses</Text>
            </View>
            <Text style={styles.summaryAmount}>
              -{getTotalSpent().toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
            </Text>
          </View>
          
          <View style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <TrendingUp size={20} color="#10B981" />
              <Text style={styles.summaryLabel}>Revenus</Text>
            </View>
            <Text style={[styles.summaryAmount, { color: '#10B981' }]}>
              +{getTotalReceived().toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
            </Text>
          </View>
        </View>

        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filterButtons.map((filter) => (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.filterButton,
                  selectedFilter === filter.key && styles.filterButtonActive
                ]}
                onPress={() => setSelectedFilter(filter.key)}
              >
                <Text style={[
                  styles.filterButtonText,
                  selectedFilter === filter.key && styles.filterButtonTextActive
                ]}>
                  {filter.label} ({filter.count})
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.transactionsContainer}>
          <Text style={styles.sectionTitle}>Transactions</Text>
          {filteredTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              id={transaction.id}
              type={transaction.type}
              amount={transaction.amount}
              currency={transaction.currency}
              merchant={transaction.merchant}
              date={transaction.date}
              status={transaction.status}
            />
          ))}
          
          {filteredTransactions.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                Aucune transaction trouvée pour ce filtre
              </Text>
            </View>
          )}
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
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    padding: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  summaryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  summaryAmount: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#EF4444',
  },
  filtersContainer: {
    marginBottom: 20,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginHorizontal: 4,
    marginLeft: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  filterButtonActive: {
    backgroundColor: '#1E40AF',
  },
  filterButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#6B7280',
  },
  filterButtonTextActive: {
    color: '#ffffff',
  },
  transactionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#374151',
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});