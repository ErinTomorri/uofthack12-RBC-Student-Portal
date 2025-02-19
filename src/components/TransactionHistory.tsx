'use client';

import { useState, useEffect } from 'react';
import { ArrowDownIcon, ArrowUpIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { TransactionCategory } from '../lib/store';
import { supabase } from '@/lib/supabase';

const CATEGORY_ICONS: Record<TransactionCategory, string> = {
  salary: '💼',
  shopping: '🛍️',
  food: '🍽️',
  transport: '🚗',
  entertainment: '🎮',
  utilities: '💡',
  other: '📦',
};

const CATEGORY_NAMES: Record<TransactionCategory, string> = {
  salary: 'Salary',
  shopping: 'Shopping',
  food: 'Food & Dining',
  transport: 'Transportation',
  entertainment: 'Entertainment',
  utilities: 'Utilities',
  other: 'Other',
};

const INITIAL_VISIBLE_DAYS = 7;

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatTime(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  });
}

interface Transaction {
  id: string;
  amount: number;
  type: 'deposit' | 'withdrawal';
  category: TransactionCategory;
  description: string;
  created_at: string;
}

export function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [expandedDates, setExpandedDates] = useState<Record<string, boolean>>({});
  const [showAllDates, setShowAllDates] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from('transactions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setTransactions(data || []);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();

    // Subscribe to new transactions
    const subscription = supabase
      .channel('transactions')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'transactions',
        },
        (payload) => {
          setTransactions((current) => [payload.new as Transaction, ...current]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Group transactions by date
  const groupedTransactions = transactions.reduce((groups, transaction) => {
    const date = formatDate(transaction.created_at);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {} as Record<string, Transaction[]>);

  const sortedDates = Object.keys(groupedTransactions).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  const visibleDates = showAllDates 
    ? sortedDates 
    : sortedDates.slice(0, INITIAL_VISIBLE_DAYS);

  const toggleDate = (date: string) => {
    setExpandedDates(prev => ({
      ...prev,
      [date]: !prev[date]
    }));
  };

  const remainingTransactions = sortedDates.length - INITIAL_VISIBLE_DAYS;

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#00A6FF] border-r-transparent"></div>
          <p className="mt-2 text-sm text-gray-500">Loading transactions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Transaction History
        </h3>
        <span className="text-sm text-gray-500">
          {transactions.length} transactions
        </span>
      </div>
      <div className="border-t border-gray-200">
        {transactions.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <span className="text-4xl">💰</span>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No transactions
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Start by adding your first transaction.
            </p>
          </div>
        ) : (
          <>
            {visibleDates.map((date) => (
              <div key={date} className="divide-y divide-gray-200">
                <button
                  onClick={() => toggleDate(date)}
                  className="w-full bg-gray-50 px-4 py-2 flex items-center justify-between hover:bg-gray-100 transition-colors duration-150"
                >
                  <h4 className="text-sm font-medium text-gray-500">{date}</h4>
                  {expandedDates[date] ? (
                    <ChevronUpIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {expandedDates[date] && (
                  <ul role="list" className="divide-y divide-gray-200">
                    {groupedTransactions[date].map((transaction) => (
                      <li
                        key={transaction.id}
                        className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors duration-150"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center min-w-0">
                            <div
                              className={`p-2 rounded-full ${
                                transaction.type === 'deposit'
                                  ? 'bg-green-100'
                                  : 'bg-red-100'
                              }`}
                            >
                              {transaction.type === 'deposit' ? (
                                <ArrowUpIcon
                                  className="h-5 w-5 text-green-600"
                                  aria-hidden="true"
                                />
                              ) : (
                                <ArrowDownIcon
                                  className="h-5 w-5 text-red-600"
                                  aria-hidden="true"
                                />
                              )}
                            </div>
                            <div className="ml-4 truncate">
                              <div className="flex items-center">
                                <span className="text-sm font-medium text-gray-900 truncate">
                                  {transaction.description}
                                </span>
                                <span className="ml-2 text-sm text-gray-500">
                                  {CATEGORY_ICONS[transaction.category]}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <span className="text-sm text-gray-500">
                                  {CATEGORY_NAMES[transaction.category]}
                                </span>
                                <span className="mx-2 text-gray-300">·</span>
                                <span className="text-sm text-gray-500">
                                  {formatTime(transaction.created_at)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`text-sm font-medium ${
                              transaction.type === 'deposit'
                                ? 'text-green-600'
                                : 'text-red-600'
                            }`}
                          >
                            {transaction.type === 'deposit' ? '+' : '-'}$
                            {transaction.amount.toFixed(2)}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            {remainingTransactions > 0 && !showAllDates && (
              <button
                onClick={() => setShowAllDates(true)}
                className="w-full py-4 text-sm text-blue-600 hover:text-blue-700 font-medium hover:bg-blue-50 transition-colors duration-150"
              >
                Show {remainingTransactions} more {remainingTransactions === 1 ? 'day' : 'days'}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
} 