import { useState } from 'react';
import { useBankStore, TransactionCategory } from '../lib/store';

const CATEGORY_OPTIONS: { value: TransactionCategory; label: string }[] = [
  { value: 'salary', label: 'Salary' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'food', label: 'Food & Dining' },
  { value: 'transport', label: 'Transportation' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'utilities', label: 'Utilities' },
  { value: 'other', label: 'Other' },
];

export function TransactionForm() {
  const addTransaction = useBankStore((state) => state.addTransaction);
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'deposit' | 'withdrawal'>('deposit');
  const [category, setCategory] = useState<TransactionCategory>('other');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) return;

    addTransaction(parseFloat(amount), type, category, description);
    setAmount('');
    setDescription('');
    setCategory('other');
    setType('deposit');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
        New Transaction
      </h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                name="amount"
                id="amount"
                step="0.01"
                min="0"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Type
            </label>
            <select
              id="type"
              name="type"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={type}
              onChange={(e) => setType(e.target.value as 'deposit' | 'withdrawal')}
            >
              <option value="deposit">Deposit</option>
              <option value="withdrawal">Withdrawal</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={category}
            onChange={(e) => setCategory(e.target.value as TransactionCategory)}
          >
            {CATEGORY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="description"
              id="description"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter transaction description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              type === 'deposit'
                ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
            } focus:outline-none focus:ring-2 focus:ring-offset-2`}
          >
            {type === 'deposit' ? 'Add Deposit' : 'Add Withdrawal'}
          </button>
        </div>
      </div>
    </form>
  );
} 