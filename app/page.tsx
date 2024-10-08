import ExpenseTracker from '@/components/ExpenseTracker';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Roommate Expense Tracker</h1>
      <ExpenseTracker />
    </div>
  );
}