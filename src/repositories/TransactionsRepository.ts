import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface ListBalance {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): ListBalance {
    const balance = this.getBalance();

    return { transactions: this.transactions, balance };
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (accumulator, { type, value }) => {
        return {
          ...accumulator,
          [type]: accumulator[type] + value,
        };
      },
      { income: 0, outcome: 0 },
    );

    return {
      ...balance,
      total: balance.income - balance.outcome,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
