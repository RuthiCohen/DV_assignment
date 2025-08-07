const accounts = {
'12345': 1000,
'67890': 500,
};

const assertAccountExists = (accountNumber) => {
if (!(accountNumber in accounts)) {
    throw new Error('Account not found');
}
};

export const getBalance = (accountNumber) => {
    assertAccountExists(accountNumber);
    return { account_number: accountNumber, balance: accounts[accountNumber] };
}

export const depositToAccount = (accountNumber, amount) => {
    assertAccountExists(accountNumber);
    accounts[accountNumber] += amount;
    return { account_number: accountNumber, new_balance: accounts[accountNumber] };
}

export const withdrawFromAccount = (accountNumber, amount) => {
    assertAccountExists(accountNumber);
    if (accounts[accountNumber] < amount) {
        throw new Error('Insufficient funds');
    }
    accounts[accountNumber] -= amount;
    return { account_number: accountNumber, new_balance: accounts[accountNumber] };
}
