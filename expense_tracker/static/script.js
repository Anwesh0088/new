document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('expenseForm');
    const tableBody = document.getElementById('expenseTableBody');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const expense = {
            description: document.getElementById('description').value,
            amount: parseFloat(document.getElementById('amount').value),
            category: document.getElementById('category').value
        };

        fetch('/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(expense)
        })
        .then(res => res.json())
        .then(response => {
            if (response.status === 'success') {
                loadExpenses();
                form.reset();
            }
        });
    });

    function loadExpenses() {
        fetch('/data')
            .then(res => res.json())
            .then(data => {
                tableBody.innerHTML = '';
                data.forEach(exp => {
                    const row = `<tr>
                        <td>${exp.date}</td>
                        <td>${exp.description}</td>
                        <td>₹${exp.amount}</td>
                        <td>${exp.category}</td>
                    </tr>`;
                    tableBody.innerHTML += row;
                });
            });
    }

    loadExpenses();
});
