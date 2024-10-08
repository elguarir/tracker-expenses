"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useExpenseStore } from '@/lib/store';

const ExpenseTracker = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const { toast } = useToast();

  const { expenses, addExpense } = useExpenseStore();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ar-MA', { style: 'currency', currency: 'MAD' }).format(value);
  };

  const handleAddExpense = () => {
    if (description && amount && paidBy) {
      const newExpense = {
        id: Date.now(),
        description,
        amount: parseFloat(amount),
        paidBy,
      };
      addExpense(newExpense);
      setDescription('');
      setAmount('');
      setPaidBy('');
      toast({
        title: "Expense added",
        description: `${description} - ${formatCurrency(parseFloat(amount))} paid by ${paidBy}`,
      });
    }
  };

  const calculateSplitCosts = () => {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const splitAmount = totalExpenses / 5; // Assuming 5 roommates
    return formatCurrency(splitAmount);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Add New Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., Groceries"
              />
            </div>
            <div>
              <Label htmlFor="amount">Amount (MAD)</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="paidBy">Paid By</Label>
              <Input
                id="paidBy"
                value={paidBy}
                onChange={(e) => setPaidBy(e.target.value)}
                placeholder="Roommate's name"
              />
            </div>
            <Button onClick={handleAddExpense}>Add Expense</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expense List</CardTitle>
        </CardHeader>
        <CardContent>
          {expenses.length === 0 ? (
            <p>No expenses added yet.</p>
          ) : (
            <ul className="space-y-2">
              {expenses.map((expense) => (
                <li key={expense.id} className="flex justify-between items-center">
                  <span>{expense.description}</span>
                  <span>{formatCurrency(expense.amount)} (Paid by {expense.paidBy})</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cost Split</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Each roommate should pay: {calculateSplitCosts()}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseTracker;