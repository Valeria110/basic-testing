// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  const initialBalance = 1000;
  const bankAccount = getBankAccount(initialBalance);

  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    try {
      bankAccount.withdraw(10000);
    } catch (err) {
      expect(err).toEqual(new InsufficientFundsError(bankAccount.getBalance()));
    }
  });

  test('should throw error when transferring more than balance', () => {
    try {
      bankAccount.transfer(10000, getBankAccount(500));
    } catch (err) {
      expect(err).toEqual(new InsufficientFundsError(bankAccount.getBalance()));
    }
  });

  test('should throw error when transferring to the same account', () => {
    try {
      bankAccount.transfer(10000, bankAccount);
    } catch (err) {
      expect(err).toEqual(new TransferFailedError());
    }
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(1000);
    expect(bankAccount.deposit(500).getBalance()).toBe(1500);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(1000);
    expect(bankAccount.withdraw(500).getBalance()).toBe(500);
  });

  test('should transfer money', () => {
    const bankAccount = getBankAccount(1000);
    expect(bankAccount.transfer(400, getBankAccount(300)).getBalance()).toBe(
      600,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const result = await bankAccount.fetchBalance();
    if (result) {
      expect(typeof result).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const result = await bankAccount.fetchBalance();
    if (!result) {
      expect(result).toBeNull();
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    try {
      await bankAccount.synchronizeBalance();
    } catch (err) {
      expect(err).toEqual(new SynchronizationFailedError());
    }
  });
});
