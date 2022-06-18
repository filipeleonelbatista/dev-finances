const ModalBudjet = {
  open() {
    // Abrir modal
    // Adicionar a class active ao modal
    document.querySelector(".modal-overlay-budjet").classList.add("active");
  },
  close() {
    // fechar o modal
    // remover a class active do modal
    document.querySelector(".modal-overlay-budjet").classList.remove("active");
  },
};

const FormBudjet = {
  budjet_amount: document.querySelector("input#budjet_amount"),

  getValues() {
    return {
      budjet_amount: FormBudjet.budjet_amount.value,
    };
  },

  validateFields() {
    const { budjet_amount } = FormBudjet.getValues();

    if (budjet_amount.trim() === "") {
      throw new Error("Por favor, preencha todos os campos");
    }
  },

  formatValues() {
    let { budjet_amount } = FormBudjet.getValues();

    budjet_amount = Utils.formatAmount(budjet_amount);

    return {
      budjet_amount,
    };
  },

  clearFields() {
    FormBudjet.budjet_amount.value = "";
  },

  submit(event) {
    event.preventDefault();

    try {
      FormBudjet.validateFields();
      const transaction = FormBudjet.formatValues();
      BudjetTransaction.add(transaction);
      FormBudjet.clearFields();
      ModalBudjet.close();
    } catch (error) {
      alert(error.message);
    }
  },
};

const StorageBudjet = {
  get() {
    return JSON.parse(localStorage.getItem("dev.finances:budjet")) || {};
  },

  set(transactions) {
    localStorage.setItem("dev.finances:budjet", JSON.stringify(transactions));
  },
};

const BudjetTransaction = {
  all: StorageBudjet.get(),

  add(transaction) {
    StorageBudjet.set(transaction);

    App.reload();
  },

  budjet() {
    let income = BudjetTransaction.all.budjet_amount;
    return income;
  },
};

const Storage = {
  get() {
    return JSON.parse(localStorage.getItem("dev.finances:products")) || [];
  },

  set(transactions) {
    localStorage.setItem("dev.finances:products", JSON.stringify(transactions));
  },
};

const Modal = {
  open() {
    // Abrir modal
    // Adicionar a class active ao modal
    document.querySelector(".modal-overlay").classList.add("active");
  },
  close() {
    // fechar o modal
    // remover a class active do modal
    document.querySelector(".modal-overlay").classList.remove("active");
  },
};

const Transaction = {
  all: Storage.get(),

  add(transaction) {
    Transaction.all.push(transaction);

    App.reload();
  },

  remove(index) {
    if (confirm("Deseja remover este produto")) {
      Transaction.all.splice(index, 1);
    }

    App.reload();
  },

  addQuantity(index) {
    Transaction.all[index].quantity = Transaction.all[index].quantity + 1;
    Transaction.all[index].total_amount =
      Transaction.all[index].quantity * Transaction.all[index].unity_amount;

    App.reload();
  },

  subtractQuantity(index) {
    if (Transaction.all[index].quantity > 0) {
      Transaction.all[index].quantity = Transaction.all[index].quantity - 1;
      Transaction.all[index].total_amount =
        Transaction.all[index].quantity * Transaction.all[index].unity_amount;
    }

    App.reload();
  },

  toggleStatus(index) {
    Transaction.all[index].status =
      Transaction.all[index].status == 0 ? "1" : "0";

    App.reload();
  },

  total() {
    let income = 0;
    Transaction.all.forEach((transaction) => {
      if (transaction.total_amount > 0) {
        income += transaction.total_amount;
      }
    });
    return income;
  },
};

const DOM = {
  transactionsContainer: document.querySelector("#data-table tbody"),

  addTransaction(transaction, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);
    tr.dataset.index = index;

    DOM.transactionsContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction, index) {
    const unity_amount = Utils.formatCurrency(transaction.unity_amount);
    const total_amount = Utils.formatCurrency(transaction.total_amount);

    const html = `
        <td class="description">${transaction.name}</td>
        <td class="description">${transaction.quantity}</td>
        <td class="description">${unity_amount}</td>
        <td class="income">${total_amount}</td>
        <td class="date">${transaction.date}</td>
        <td class="description">${transaction.location}</td>
        <td>
            <img onclick="Transaction.addQuantity(${index})" src="./assets/plus.svg" alt="Adicionar quantidade" title="Adicionar quantidade">
            <img onclick="Transaction.remove(${index})" src="./assets/trash.svg" alt="Remover Produto" title="Remover Produto">
            <img onclick="Transaction.subtractQuantity(${index})" src="./assets/minus.svg" alt="Remover Quantidade" title="Remover Quantidade">
        </td>
        `;

    return html;
  },

  updateBalance() {
    document.getElementById("incomeDisplay").innerHTML = Utils.formatCurrency(
      StorageBudjet.get().budjet_amount
    );
    document.getElementById("expenseDisplay").innerHTML = Utils.formatCurrency(
      Transaction.total()
    );
    document.getElementById("totalDisplay").innerHTML = Utils.formatCurrency(
      StorageBudjet.get().budjet_amount - Transaction.total()
    );
  },

  clearTransactions() {
    DOM.transactionsContainer.innerHTML = "";
  },
};

const Utils = {
  formatAmount(value) {
    // value = Number(value.replace(/\,\./g, "")) * 100

    // return value
    value = value * 100;
    return Math.round(value);
  },

  formatDate(date) {
    const splittedDate = date.split("-");
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
  },

  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : "";

    value = String(value).replace(/\D/g, "");

    value = Number(value) / 100;

    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return signal + value;
  },
};

const Form = {
  name: document.querySelector("input#name"),
  quantity: document.querySelector("input#quantity"),
  unity_amount: document.querySelector("input#unity_amount"),
  total_amount: document.querySelector("input#total_amount"),
  date: document.querySelector("input#date"),
  location: document.querySelector("input#location"),

  getValues() {
    return {
      name: Form.name.value,
      quantity: Form.quantity.value,
      unity_amount: Form.unity_amount.value,
      total_amount: Form.total_amount.value,
      date: Form.date.value,
      location: Form.location.value,
    };
  },

  validateFields() {
    const { name, quantity, unity_amount, total_amount, date, location } =
      Form.getValues();

    if (
      name.trim() === "" ||
      quantity.trim() === "" ||
      unity_amount.trim() === "" ||
      total_amount.trim() === "" ||
      date.trim() === "" ||
      location.trim() === ""
    ) {
      throw new Error("Por favor, preencha todos os campos");
    }
  },

  formatValues() {
    let { name, quantity, unity_amount, total_amount, date, location } =
      Form.getValues();

    date = Utils.formatDate(date);

    return {
      name,
      quantity: Utils.formatAmount(quantity),
      unity_amount: Utils.formatAmount(unity_amount),
      total_amount: Utils.formatAmount(total_amount),
      date,
      location,
    };
  },

  clearFields() {
    Form.name.value = "";
    Form.quantity.value = "";
    Form.unity_amount.value = "";
    Form.total_amount.value = "";
    Form.date.value = "";
    Form.location.value = "";
  },

  submit(event) {
    event.preventDefault();

    try {
      Form.validateFields();
      const transaction = Form.formatValues();
      Transaction.add(transaction);
      Form.clearFields();
      Modal.close();
    } catch (error) {
      alert(error.message);
    }
  },
};

const App = {
  init() {
    Transaction.all.forEach(DOM.addTransaction);

    DOM.updateBalance();

    Storage.set(Transaction.all);
  },
  reload() {
    DOM.clearTransactions();
    App.init();
  },
};

App.init();

const valor_unitario = document.querySelector("input#unity_amount");
const quantidade = document.querySelector("input#quantity");
const data_compra = document.querySelector("input#date");
data_compra.value = new Date(Date.now()).toISOString().split("T")[0];

function calculaValor() {
  let valor_total = document.querySelector("input#total_amount");
  valor_total.value = quantidade.value * valor_unitario.value;
}

valor_unitario.addEventListener("input", (event) => calculaValor());

quantidade.addEventListener("input", (event) => calculaValor());

function exportJson() {
  const data = JSON.stringify(Storage.get());
  const budjet = JSON.stringify(StorageBudjet.get());
  const database = {
    budjet,
    data,
  };

  const dataUri =
    "data:application/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(database));
  let linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", "database_compras.json");
  linkElement.click();
  linkElement.remove();
}
