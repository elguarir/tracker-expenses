import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Expense {
  id: number;
  description: string;
  amount: number;
  paidBy: string;
}

interface ExpenseStore {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  clearExpenses: () => void;
}

export const useExpenseStore = create<ExpenseStore>()(
  persist(
    (set) => ({
      expenses: [],
      addExpense: (expense) => set((state) => ({ expenses: [...state.expenses, expense] })),
      clearExpenses: () => set({ expenses: [] }),
    }),
    {
      name: 'expense-storage',
    }
  )
);