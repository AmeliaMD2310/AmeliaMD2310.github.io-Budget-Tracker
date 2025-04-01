class Transaction {
    constructor(amount, category, type) {
        this.amount = parseFloat(amount);
        this.category = category;
        this.type = type;
        this.date = new Date().toISOString().split('T')[0];
    }
}

class BudgetTracker {
    constructor() {
        this.transactions = [];
    }
    addTransaction(transaction) {
        this.transactions.push(transaction);
        this.updateUI();
    }
    getTotalIncome() {
        return this.transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    }
    getTotalExpenses() {
        return this.transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    }
    getRemainingBalance() {
        return this.getTotalIncome() - this.getTotalExpenses();
    }
    updateUI() {
        document.getElementById('total-income').textContent = this.getTotalIncome().toFixed(2);
        document.getElementById('total-expenses').textContent = this.getTotalExpenses().toFixed(2);
        document.getElementById('remaining-balance').textContent = this.getRemainingBalance().toFixed(2);

        const list = document.getElementById('transaction-list');
        list.innerHTML = '';
        this.transactions.forEach(t => {
            const li = document.createElement('li');
            li.className = t.type;
            li.textContent = `${t.date} - ${t.type.toUpperCase()}: $${t.amount} (${t.category})`;
            list.appendChild(li);
        });
    }
}

const tracker = new BudgetTracker();

function addTransaction() {
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const type = document.getElementById('type').value;

    if (amount && category) {
        const transaction = new Transaction(amount, category, type);
        tracker.addTransaction(transaction);
        document.getElementById('amount').value = '';
        document.getElementById('category').value = '';
    } else {
        alert("Please enter a valid amount and category.");
    }
}

