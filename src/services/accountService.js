const accounts = {
'12345': 1000,
'67890': 500,
};

export const getBalance = (accountNumber) => {
    if (!(accountNumber in accounts)) {
        throw new Error('Account not found');
    }
    return { account_number: accountNumber, balance: accounts[accountNumber] };
}

export const depositToAccount = (accountNumber, amount) => {
    if (!(accountNumber in accounts)) {
        throw new Error('Account not found');
    }
    accounts[accountNumber] += amount;
    return { account_number: accountNumber, new_balance: accounts[accountNumber] };
}

export const withdrawFromAccount = (accountNumber, amount) => {
    if (!(accountNumber in accounts)) {
        throw new Error('Account not found');
    }
    if (accounts[accountNumber] < amount) {
        throw new Error('Insufficient funds');
    }
    accounts[accountNumber] -= amount;
    return { account_number: accountNumber, new_balance: accounts[accountNumber] };
}
