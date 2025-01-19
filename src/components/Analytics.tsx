'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Line, Bar } from 'react-chartjs-2';
import {
  BanknotesIcon,
  CreditCardIcon,
  ArrowTrendingUpIcon,
  UserGroupIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartData,
  TooltipItem,
  Scale,
  CoreScaleOptions,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface Transaction {
  id: string;
  amount: number;
  type: 'deposit' | 'withdrawal';
  category: string;
  created_at: string;
}

interface MonthlyData {
  income: number;
  spending: number;
}

interface QuickStat {
  name: string;
  value: string | number;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: any;
  color: string;
}

export function Analytics() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
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
          .order('created_at', { ascending: true });

        if (error) throw error;
        setTransactions(data || []);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  // Calculate balance history
  const balanceHistory = transactions.reduce((acc: { date: string; balance: number }[], transaction) => {
    const lastBalance = acc.length > 0 ? acc[acc.length - 1].balance : 0;
    const change = transaction.type === 'deposit' ? transaction.amount : -transaction.amount;
    const date = new Date(transaction.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    return [...acc, { date, balance: lastBalance + change }];
  }, []);

  // Calculate monthly income and spending
  const monthlyData = transactions.reduce((acc: Record<string, MonthlyData>, transaction) => {
    const month = new Date(transaction.created_at).toLocaleDateString('en-US', { month: 'long' });
    if (!acc[month]) {
      acc[month] = { income: 0, spending: 0 };
    }
    
    if (transaction.type === 'deposit') {
      acc[month].income += transaction.amount;
    } else {
      acc[month].spending += transaction.amount;
    }
    
    return acc;
  }, {});

  // Calculate spending by category
  const categorySpending = transactions
    .filter(t => t.type === 'withdrawal')
    .reduce((acc: Record<string, number>, transaction) => {
      if (!acc[transaction.category]) {
        acc[transaction.category] = 0;
      }
      acc[transaction.category] += transaction.amount;
      return acc;
    }, {});

  const totalSpending = Object.values(categorySpending).reduce((sum, amount) => sum + amount, 0);
  const categoryPercentages = Object.entries(categorySpending).reduce((acc: Record<string, number>, [category, amount]) => {
    acc[category] = (amount / totalSpending) * 100;
    return acc;
  }, {});

  // Calculate financial summary
  const last30Days = new Date();
  last30Days.setDate(last30Days.getDate() - 30);
  
  const recentTransactions = transactions.filter(t => new Date(t.created_at) >= last30Days);
  const totalIncome = recentTransactions
    .filter(t => t.type === 'deposit')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalSpendingLast30Days = recentTransactions
    .filter(t => t.type === 'withdrawal')
    .reduce((sum, t) => sum + t.amount, 0);
  const currentBalance = balanceHistory.length > 0 ? balanceHistory[balanceHistory.length - 1].balance : 0;

  // Add new calculations for trends
  const monthlyTrend = Object.entries(monthlyData).map(([month, data]) => ({
    month,
    netChange: data.income - data.spending,
    savingsRate: data.income > 0 ? ((data.income - data.spending) / data.income) * 100 : 0
  }));

  const lastMonth = monthlyTrend[monthlyTrend.length - 1];
  const previousMonth = monthlyTrend[monthlyTrend.length - 2];
  const monthOverMonthChange = lastMonth && previousMonth
    ? ((lastMonth.netChange - previousMonth.netChange) / Math.abs(previousMonth.netChange)) * 100
    : 0;

  // Calculate average daily spending
  const averageDailySpending = totalSpendingLast30Days / 30;

  // Format currency consistently
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Calculate quick stats
  const quickStats: QuickStat[] = [
    {
      name: 'Total Balance',
      value: formatCurrency(currentBalance),
      change: `${monthOverMonthChange >= 0 ? '+' : ''}${monthOverMonthChange.toFixed(1)}%`,
      changeType: monthOverMonthChange >= 0 ? 'increase' : 'decrease',
      icon: BanknotesIcon,
      color: 'text-blue-600',
    },
    {
      name: 'Monthly Spending',
      value: formatCurrency(totalSpendingLast30Days),
      change: `${averageDailySpending > 150 ? '+' : ''}${((averageDailySpending - 150) / 150 * 100).toFixed(1)}%`,
      changeType: averageDailySpending > 150 ? 'increase' : 'decrease',
      icon: CreditCardIcon,
      color: 'text-red-600',
    },
    {
      name: 'Savings Goal',
      value: `${lastMonth ? lastMonth.savingsRate.toFixed(1) : 0}%`,
      change: `Target: 70%`,
      changeType: (lastMonth?.savingsRate || 0) >= 70 ? 'increase' : 'decrease',
      icon: ArrowTrendingUpIcon,
      color: 'text-green-600',
    },
    {
      name: 'Active Cards',
      value: '3',
      change: 'No change',
      changeType: 'neutral',
      icon: UserGroupIcon,
      color: 'text-purple-600',
    },
  ];

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#00A6FF] border-r-transparent"></div>
        <p className="mt-2 text-sm text-gray-500">Loading analytics...</p>
      </div>
    );
  }

  const balanceChartData: ChartData<'line'> = {
    labels: balanceHistory.map(item => item.date),
    datasets: [
      {
        label: 'Balance',
        data: balanceHistory.map(item => item.balance),
        borderColor: '#00A6FF',
        backgroundColor: 'rgba(0, 166, 255, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const monthlyChartData: ChartData<'bar'> = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: 'Income',
        data: Object.values(monthlyData).map(d => d.income),
        backgroundColor: '#10B981',
      },
      {
        label: 'Spending',
        data: Object.values(monthlyData).map(d => d.spending),
        backgroundColor: '#EF4444',
      },
    ],
  };

  const categoryChartData: ChartData<'pie'> = {
    labels: Object.keys(categoryPercentages).map(cat => 
      cat.charAt(0).toUpperCase() + cat.slice(1)
    ),
    datasets: [
      {
        data: Object.values(categoryPercentages),
        backgroundColor: [
          '#818CF8', // Entertainment
          '#A78BFA', // Utilities
          '#EC4899', // Shopping
          '#34D399', // Food & Dining
          '#F472B6', // Transport
          '#60A5FA', // Other
        ],
      },
    ],
  };

  return (
    <div className="space-y-6 p-6">
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat) => (
          <div
            key={stat.name}
            className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 pr-3">
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className={`text-xl font-bold mt-1 ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10 transform transition-transform duration-300 hover:scale-110 flex-shrink-0`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            <div className="flex items-center mt-3">
              {stat.changeType !== 'neutral' ? (
                <div
                  className={`flex items-center ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stat.changeType === 'increase' ? (
                    <ArrowUpIcon className="w-4 h-4 mr-1 flex-shrink-0" />
                  ) : (
                    <ArrowDownIcon className="w-4 h-4 mr-1 flex-shrink-0" />
                  )}
                  <span className="text-sm font-medium">{stat.change}</span>
                </div>
              ) : (
                <span className="text-sm text-gray-500 font-medium">{stat.change}</span>
              )}
            </div>
            {/* Decorative Element */}
            <div
              className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-xl ${
                stat.changeType === 'increase'
                  ? 'bg-gradient-to-r from-green-400 to-green-600'
                  : stat.changeType === 'decrease'
                  ? 'bg-gradient-to-r from-red-400 to-red-600'
                  : 'bg-gradient-to-r from-gray-200 to-gray-300'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Balance History Chart */}
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Balance History</h3>
              <p className="text-sm text-gray-500">Last {balanceHistory.length} days</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-900 bg-blue-50 px-3 py-1.5 rounded-full">
                Current: {formatCurrency(currentBalance)}
              </span>
            </div>
          </div>
          <div className="h-[350px]">
            <Line
              data={balanceChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: {
                      size: 14,
                      weight: 'bold'
                    },
                    bodyFont: {
                      size: 13
                    },
                    displayColors: false,
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: 'rgba(0, 0, 0, 0.05)',
                    },
                    ticks: {
                      padding: 6,
                      font: {
                        size: 11
                      },
                      callback: function(this: Scale<CoreScaleOptions>, value: number | string) {
                        if (typeof value === 'number') {
                          return formatCurrency(value);
                        }
                        return value;
                      },
                    },
                  },
                  x: {
                    grid: {
                      display: false,
                    },
                    ticks: {
                      padding: 6,
                      font: {
                        size: 11
                      }
                    }
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Monthly Income vs Spending */}
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Income vs Spending</h3>
              <p className="text-sm text-gray-500">Monthly comparison</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-green-600 mr-2"></div>
                <span className="text-sm text-gray-600">Income</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-400 to-red-600 mr-2"></div>
                <span className="text-sm text-gray-600">Spending</span>
              </div>
            </div>
          </div>
          <div className="h-[350px]">
            <Bar
              data={monthlyChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: {
                      size: 14,
                      weight: 'bold'
                    },
                    bodyFont: {
                      size: 13
                    },
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: 'rgba(0, 0, 0, 0.05)',
                    },
                    ticks: {
                      padding: 6,
                      font: {
                        size: 11
                      },
                      callback: function(this: Scale<CoreScaleOptions>, value: number | string) {
                        if (typeof value === 'number') {
                          return formatCurrency(value);
                        }
                        return value;
                      },
                    },
                  },
                  x: {
                    grid: {
                      display: false,
                    },
                    ticks: {
                      padding: 6,
                      font: {
                        size: 11
                      }
                    }
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Spending by Category */}
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Spending by Category</h3>
              <p className="text-sm text-gray-500">
                Total: <span className="font-medium">{formatCurrency(totalSpending)}</span>
              </p>
            </div>
          </div>
          <div className="h-[350px]">
            <Pie
              data={categoryChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      boxWidth: 12,
                      padding: 15,
                      font: {
                        size: 12,
                        weight: 500
                      }
                    }
                  },
                  tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: {
                      size: 14,
                      weight: 'bold'
                    },
                    bodyFont: {
                      size: 13
                    },
                    callbacks: {
                      label: (context: TooltipItem<'pie'>) => {
                        const label = context.label || '';
                        const value = context.raw as number;
                        const amount = (value / 100) * totalSpending;
                        return `${label}: ${formatCurrency(amount)} (${value.toFixed(1)}%)`;
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100 col-span-2">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Monthly Trends</h3>
              <p className="text-sm text-gray-500">Last {monthlyTrend.length} months</p>
            </div>
          </div>
          <div className="space-y-6">
            {monthlyTrend.map(({ month, netChange, savingsRate }) => (
              <div key={month} className="group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <p className="text-sm font-medium text-gray-900">{month}</p>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      savingsRate >= 70 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {savingsRate.toFixed(1)}% saved
                    </span>
                  </div>
                  <span className={`text-sm font-medium ${netChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(Math.abs(netChange))}
                  </span>
                </div>
                <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`absolute left-0 h-full transition-all duration-500 ${
                      netChange >= 0 
                        ? 'bg-gradient-to-r from-green-400 to-green-600' 
                        : 'bg-gradient-to-r from-red-400 to-red-600'
                    } group-hover:opacity-80`}
                    style={{ width: `${Math.min(Math.abs(savingsRate), 100)}%` }}
                  />
                  <div 
                    className="absolute left-0 h-full w-[2px] bg-white"
                    style={{ left: '70%' }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-500">0%</span>
                  <span className="text-xs text-gray-500">Target: 70%</span>
                  <span className="text-xs text-gray-500">100%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 