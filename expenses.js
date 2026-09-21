const expensesKey = 'yubara-expenses';
let expenses = readExpenses();

function readExpenses() {
  try {
    const value = JSON.parse(localStorage.getItem(expensesKey));
    return Array.isArray(value) ? value.filter(item => item && typeof item.name === 'string' && Number.isSafeInteger(item.amount) && item.amount > 0 && ['T', 'M'].includes(item.payer)) : [];
  } catch { return []; }
}

function saveExpenses() {
  localStorage.setItem(expensesKey, JSON.stringify(expenses));
}

function expenseMarkup() {
  const paidT = expenses.filter(item => item.payer === 'T').reduce((sum, item) => sum + item.amount, 0);
  const paidM = expenses.filter(item => item.payer === 'M').reduce((sum, item) => sum + item.amount, 0);
  const total = paidT + paidM;
  const transfer = Math.ceil(Math.abs(paidT - paidM) / 2);
  const yen = value => `${value.toLocaleString('ja-JP')}円`;
  const settlement = transfer === 0 ? '精算は不要です' : `${paidT > paidM ? 'M' : 'T'} → ${paidT > paidM ? 'T' : 'M'} に ${yen(transfer)} 渡す`;
  return `<section class="expenses-section" id="expenses" aria-labelledby="expenses-title">
    <div class="section-heading"><div><p class="eyebrow">TRIP EXPENSES</p><h2 id="expenses-title">旅の家計簿</h2></div><span class="section-counter">T & M</span></div>
    <p class="expenses-lead">支払った人を記録して、ふたりで折半した精算額を計算します。</p>
    <form id="expense-form" class="expense-form">
      <label>品目<input name="name" type="text" maxlength="80" placeholder="例：ランチ" required></label>
      <label>金額（円）<input name="amount" type="number" min="1" max="999999999" step="1" inputmode="numeric" placeholder="例：2500" required></label>
      <label>支払った人<select name="payer" required><option value="T">T</option><option value="M">M</option></select></label>
      <button type="submit">記録する</button>
    </form>
    <div class="expenses-summary" aria-live="polite"><div><span>合計</span><strong>${yen(total)}</strong></div><div><span>T の支払い</span><strong>${yen(paidT)}</strong></div><div><span>M の支払い</span><strong>${yen(paidM)}</strong></div></div>
    <p class="expenses-settlement" aria-live="polite">${settlement}</p>
    ${transfer && Math.abs(paidT - paidM) % 2 ? '<p class="expenses-note">1円未満の端数は切り上げて精算します。</p>' : ''}
    <div class="expenses-list" aria-label="支払い記録">${expenses.length ? expenses.map(item => `<div class="expense-item"><span class="expense-payer">${item.payer}</span><span class="expense-name">${esc(item.name)}</span><strong>${yen(item.amount)}</strong><button type="button" data-remove-expense="${esc(item.id)}" aria-label="${esc(item.name)}の記録を削除">削除</button></div>`).join('') : '<p class="expenses-empty">まだ支払いの記録はありません。</p>'}</div>
    <p class="expenses-note">記録はこのブラウザに保存されます。別の端末とは共有されません。</p>
  </section>`;
}

function renderExpenses() {
  const root = document.getElementById('expenses');
  if (root) root.outerHTML = expenseMarkup();
}

document.addEventListener('submit', event => {
  if (event.target.id !== 'expense-form') return;
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  const name = String(data.get('name') || '').trim();
  const amount = Number(data.get('amount'));
  const payer = data.get('payer');
  if (!name || !Number.isSafeInteger(amount) || amount < 1 || amount > 999999999 || !['T', 'M'].includes(payer)) return;
  expenses.push({id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, name, amount, payer});
  saveExpenses();
  renderExpenses();
  document.querySelector('#expense-form input[name="name"]')?.focus();
});

document.addEventListener('click', event => {
  const button = event.target.closest('[data-remove-expense]');
  if (!button) return;
  expenses = expenses.filter(item => item.id !== button.dataset.removeExpense);
  saveExpenses();
  renderExpenses();
});
