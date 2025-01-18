'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { useMemo } from 'react';
import { useBankStore, TransactionCategory } from '../lib/store';

const COLORS = {
  salary: '#4F46E5',
  shopping: '#EC4899',
  food: '#10B981',
  transport: '#F59E0B',
  entertainment: '#6366F1',
  utilities: '#8B5CF6',
  other: '#6B7280',
};

const CATEGORY_NAMES = {
  salary: 'Salary',
  shopping: 'Shopping',
  food: 'Food & Dining',
  transport: 'Transportation',
  entertainment: 'Entertainment',
  utilities: 'Utilities',
  other: 'Other',
};

// Format date consistently for both server and client
function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = date.getDate();
  return `${month} ${day}`;
}

function formatCurrency(amount: number) {
  return amount.toFixed(2);
}

function getMonthName(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleString('en-US', { month: 'long' });
}

export function Analytics() {
  const { transactions, balance } = useBankStore();

  // Memoize all calculations
  const {
    balanceData,
    categorySpending,
    monthlySpending,
    thirtyDayIncome,
    thirtyDaySpending,
  } = useMemo(() => {
    // Process transactions for the balance chart
    const balanceData = transactions
      .slice()
      .reverse()
      .reduce((acc: any[], transaction) => {
        const lastBalance = acc.length > 0 ? acc[acc.length - 1].balance : balance;
        return [
          ...acc,
          {
            date: formatDate(transaction.date),
            balance:
              transaction.type === 'deposit'
                ? lastBalance - transaction.amount
                : lastBalance + transaction.amount,
            amount: transaction.amount,
          },
        ];
      }, []);

    // Calculate category spending
    const withdrawals = transactions.filter(tx => tx.type === 'withdrawal');
    const totalSpending = withdrawals.reduce((sum, tx) => sum + tx.amount, 0);
    
    const spendingByCategory = withdrawals.reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {} as Record<TransactionCategory, number>);

    const categorySpending = Object.entries(spendingByCategory).map(([category, amount]) => ({
      category: category as TransactionCategory,
      amount,
      percentage: totalSpending > 0 ? (amount / totalSpending) * 100 : 0,
    })).sort((a, b) => b.amount - a.amount);

    // Calculate monthly spending
    const monthlyData: Record<string, { spending: number; income: number }> = {};

    transactions.forEach(tx => {
      const month = getMonthName(tx.date);
      if (!monthlyData[month]) {
        monthlyData[month] = { spending: 0, income: 0 };
      }
      if (tx.type === 'withdrawal') {
        monthlyData[month].spending += tx.amount;
      } else {
        monthlyData[month].income += tx.amount;
      }
    });

    const monthlySpending = Object.entries(monthlyData)
      .map(([month, data]) => ({
        month,
        ...data,
      }))
      .reverse(); // Show most recent months first

    // Calculate 30-day totals
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    const thirtyDayIncome = transactions
      .filter(
        (tx) =>
          tx.type === 'deposit' &&
          new Date(tx.date).getTime() >= thirtyDaysAgo.getTime()
      )
      .reduce((sum, tx) => sum + tx.amount, 0);

    const thirtyDaySpending = transactions
      .filter(
        (tx) =>
          tx.type === 'withdrawal' &&
          new Date(tx.date).getTime() >= thirtyDaysAgo.getTime()
      )
      .reduce((sum, tx) => sum + tx.amount, 0);

    return {
      balanceData,
      categorySpending,
      monthlySpending,
      thirtyDayIncome,
      thirtyDaySpending,
    };
  }, [transactions, balance]);

  return (
    <div className="space-y-6">
      {/* Balance History Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
          Balance History
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={balanceData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="balance"
                stroke="#3b82f6"
                fill="#93c5fd"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Income vs Spending */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
          Monthly Income vs Spending
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlySpending}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" name="Income" fill="#10B981" />
              <Bar dataKey="spending" name="Spending" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Spending by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Spending by Category
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categorySpending}
                  dataKey="amount"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ category, percentage }: { category: TransactionCategory; percentage: number }) => 
                    `${CATEGORY_NAMES[category]} (${percentage.toFixed(1)}%)`
                  }
                >
                  {categorySpending.map((entry) => (
                    <Cell
                      key={entry.category}
                      fill={COLORS[entry.category]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Financial Summary
          </h3>
          <div className="grid grid-cols-1 gap-5">
            <div className="bg-blue-50 px-4 py-5 rounded-lg">
              <dt className="text-sm font-medium text-blue-500 truncate">
                Current Balance
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-blue-900">
                ${formatCurrency(balance)}
              </dd>
            </div>
            <div className="bg-green-50 px-4 py-5 rounded-lg">
              <dt className="text-sm font-medium text-green-500 truncate">
                Total Income (Last 30 Days)
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-green-900">
                ${formatCurrency(thirtyDayIncome)}
              </dd>
            </div>
            <div className="bg-red-50 px-4 py-5 rounded-lg">
              <dt className="text-sm font-medium text-red-500 truncate">
                Total Spending (Last 30 Days)
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-red-900">
                ${formatCurrency(thirtyDaySpending)}
              </dd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 