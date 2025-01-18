import { create } from 'zustand';

// Seeded random number generator for consistent data
function seededRandom(seed: number) {
  return function() {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

// Use a fixed seed for consistent data generation
const random = seededRandom(123456);

export type TransactionCategory =
  | 'salary'
  | 'shopping'
  | 'food'
  | 'transport'
  | 'entertainment'
  | 'utilities'
  | 'other';

interface Transaction {
  id: string;
  amount: number;
  type: 'deposit' | 'withdrawal';
  category: TransactionCategory;
  description: string;
  date: string; // Store as ISO string instead of Date object
}

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  date: string; // Store as ISO string instead of Date object
}

interface CategorySpending {
  category: TransactionCategory;
  amount: number;
  percentage: number;
}

interface BankStore {
  balance: number;
  transactions: Transaction[];
  notifications: Notification[];
  addTransaction: (amount: number, type: 'deposit' | 'withdrawal', category: TransactionCategory, description: string) => void;
  addNotification: (message: string, type: 'info' | 'warning' | 'success') => void;
  dismissNotification: (id: string) => void;
  getCategorySpending: () => CategorySpending[];
  getMonthlySpending: () => { month: string; spending: number; income: number }[];
}

// Generate fake initial transactions
const generateInitialTransactions = (): Transaction[] => {
  const categories: TransactionCategory[] = ['salary', 'shopping', 'food', 'transport', 'entertainment', 'utilities'];
  const descriptions = {
    salary: ['Monthly Salary', 'Bonus Payment'],
    shopping: ['Amazon Purchase', 'Walmart Shopping', 'Target'],
    food: ['Grocery Store', 'Restaurant', 'Coffee Shop'],
    transport: ['Gas Station', 'Public Transport', 'Uber Ride'],
    entertainment: ['Cinema', 'Concert Tickets', 'Netflix Subscription'],
    utilities: ['Electricity Bill', 'Water Bill', 'Internet Bill'],
  };

  const transactions: Transaction[] = [];
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);

  // Generate transactions for the last 3 months
  for (let i = 0; i < 90; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() - i);

    // Add salary on 1st of each month
    if (date.getDate() === 1) {
      transactions.push({
        id: `salary-${date.getTime()}`,
        amount: 5000,
        type: 'deposit',
        category: 'salary',
        description: descriptions.salary[0],
        date: date.toISOString(),
      });
    }

    // Random transactions
    if (random() > 0.7) {
      const category = categories[Math.floor(random() * categories.length)];
      const isDeposit = category === 'salary';
      const amount = isDeposit 
        ? Math.floor(random() * 1000) + 500
        : Math.floor(random() * 200) + 20;

      transactions.push({
        id: `tx-${date.getTime()}-${Math.floor(random() * 1000)}`,
        amount,
        type: isDeposit ? 'deposit' : 'withdrawal',
        category,
        description: descriptions[category][Math.floor(random() * descriptions[category].length)],
        date: date.toISOString(),
      });
    }
  }

  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

let initialTransactions: Transaction[] = [];
let initialBalance = 0;

try {
  initialTransactions = generateInitialTransactions();
  initialBalance = initialTransactions.reduce(
    (sum, tx) => sum + (tx.type === 'deposit' ? tx.amount : -tx.amount),
    0
  );
} catch (error) {
  console.error('Error generating initial data:', error);
  // Provide fallback data if generation fails
  initialTransactions = [];
  initialBalance = 10000;
}

export const useBankStore = create<BankStore>((set, get) => ({
  balance: initialBalance,
  transactions: initialTransactions,
  notifications: [],
  addTransaction: (amount, type, category, description) => {
    const newTransaction: Transaction = {
      id: `tx-${Date.now()}-${Math.floor(random() * 1000)}`,
      amount,
      type,
      category,
      description,
      date: new Date().toISOString(),
    };

    set((state) => {
      const newBalance = type === 'deposit' 
        ? state.balance + amount 
        : state.balance - amount;

      // Add notification for withdrawal
      if (type === 'withdrawal') {
        const notification: Notification = {
          id: `notif-${Date.now()}-${Math.floor(random() * 1000)}`,
          message: `Alert: $${amount.toFixed(2)} spent on ${category}`,
          type: 'warning',
          date: new Date().toISOString(),
        };
        return {
          balance: newBalance,
          transactions: [newTransaction, ...state.transactions],
          notifications: [notification, ...state.notifications],
        };
      }

      return {
        balance: newBalance,
        transactions: [newTransaction, ...state.transactions],
        notifications: [
          {
            id: `notif-${Date.now()}-${Math.floor(random() * 1000)}`,
            message: `Success: $${amount.toFixed(2)} deposited to your account`,
            type: 'success',
            date: new Date().toISOString(),
          },
          ...state.notifications
        ],
      };
    });
  },
  addNotification: (message, type) =>
    set((state) => ({
      notifications: [
        {
          id: `notif-${Date.now()}-${Math.floor(random() * 1000)}`,
          message,
          type,
          date: new Date().toISOString(),
        },
        ...state.notifications,
      ],
    })),
  dismissNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  getCategorySpending: () => {
    const state = get();
    const withdrawals = state.transactions.filter(tx => tx.type === 'withdrawal');
    const totalSpending = withdrawals.reduce((sum, tx) => sum + tx.amount, 0);
    
    const spendingByCategory = withdrawals.reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {} as Record<TransactionCategory, number>);

    return Object.entries(spendingByCategory).map(([category, amount]) => ({
      category: category as TransactionCategory,
      amount,
      percentage: (amount / totalSpending) * 100,
    })).sort((a, b) => b.amount - a.amount);
  },
  getMonthlySpending: () => {
    const state = get();
    const monthlyData: Record<string, { spending: number; income: number }> = {};

    state.transactions.forEach(tx => {
      const month = new Date(tx.date).toLocaleString('en-US', { month: 'long' });
      if (!monthlyData[month]) {
        monthlyData[month] = { spending: 0, income: 0 };
      }
      if (tx.type === 'withdrawal') {
        monthlyData[month].spending += tx.amount;
      } else {
        monthlyData[month].income += tx.amount;
      }
    });

    return Object.entries(monthlyData).map(([month, data]) => ({
      month,
      ...data,
    }));
  },
})); 