const ModalAutonomy = {
  open() {
    // Abrir modal
    // Adicionar a class active ao modal
    document.querySelector(".modal-overlay-autonomy").classList.add("active");
  },
  close() {
    // fechar o modal
    // remover a class active do modal
    document.querySelector(".modal-overlay-autonomy").classList.remove("active");
  },
};

const FormAutonomy = {
  autonomy: document.querySelector("input#autonomy"),

  getValues() {
    return {
      autonomy: FormAutonomy.autonomy.value,
    };
  },

  validateFields() {
    const { autonomy } = FormAutonomy.getValues();

    if (autonomy.trim() === "") {
      throw new Error("Por favor, preencha todos os campos");
    }
  },

  formatValues() {
    let { autonomy } = FormAutonomy.getValues();

    autonomy = parseInt(autonomy);

    return {
      autonomy,
    };
  },

  clearFields() {
    FormAutonomy.autonomy.value = "";
  },

  submit(event) {
    event.preventDefault();

    try {
      FormAutonomy.validateFields();
      const transaction = FormAutonomy.formatValues();
      AutonomyTransaction.add(transaction);
      FormAutonomy.clearFields();
      ModalAutonomy.close();
    } catch (error) {
      alert(error.message);
    }
  },
};

const StorageAutonomy = {
  get() {
    return JSON.parse(localStorage.getItem("dev.finances:autonomy")) || {autonomy:0};
  },

  set(transactions) {
    localStorage.setItem("dev.finances:autonomy", JSON.stringify(transactions));
  },
};

const AutonomyTransaction = {
  all: StorageAutonomy.get(),

  add(transaction) {
    StorageAutonomy.set(transaction);

    App.reload();
  },

  budjet() {
    let income = AutonomyTransaction.all.autonomy;
    return income;
  },
};

const Storage = {
  get() {
    return JSON.parse(localStorage.getItem("dev.finances:runs")) || [];
  },

  set(transactions) {
    localStorage.setItem("dev.finances:runs", JSON.stringify(transactions));
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
    if (confirm("Deseja remover este registro")) {
      Transaction.all.splice(index, 1);
    }

    App.reload();
  },

  actual_distance() {    
    return Transaction.all.length > 0 ? Transaction.all[0].actual_distance : 0;
  },

  estimate_distance() {    
    return Transaction.all.length > 0 
    ? parseInt(parseFloat(Transaction.all[0].actual_distance) + (Transaction.all[0].fuel_volume *  StorageAutonomy.get().autonomy))
    : 0;
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
    const fuel_type_dic = ["Comum","Aditivada","Etanol","Dísel s20","Disel"]
    const unity_amount = Utils.formatCurrency(transaction.unity_amount);
    const total_amount = Utils.formatCurrency(parseFloat((parseFloat(transaction.unity_amount)/100 * transaction.fuel_volume).toFixed(2)));

    const html = `
        <td class="description">${transaction.actual_distance}</td>
        <td class="description">${transaction.fuel_volume}</td>
        <td class="description">${unity_amount}</td>
        <td class="description">${total_amount}</td>
        <td class="description">${fuel_type_dic[transaction.fuel_type]}</td>
        <td class="date">${transaction.date}</td>
        <td class="description">${transaction.location}</td>
        <td>
            <img onclick="Transaction.remove(${index})" src="./assets/trash.svg" alt="Remover Produto" title="Remover Produto">
        </td>
        `;

    return html;
  },

  updateBalance() {
    document.getElementById("incomeDisplay").innerHTML = 
      StorageAutonomy.get().autonomy == undefined ? "0 L" : StorageAutonomy.get().autonomy + " L";
    document.getElementById("expenseDisplay").innerHTML = Transaction.actual_distance();
    document.getElementById("totalDisplay").innerHTML = Transaction.estimate_distance();
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
  actual_distance: document.querySelector("input#actual_distance"),
  fuel_volume: document.querySelector("input#fuel_volume"),
  unity_amount: document.querySelector("input#unity_amount"),
  fuel_type: document.querySelector("select#fuel_type"),
  date: document.querySelector("input#date"),
  location: document.querySelector("input#location"),

  getValues() {
    return {
      actual_distance: Form.actual_distance.value,
      fuel_volume: Form.fuel_volume.value,
      unity_amount: Form.unity_amount.value,
      fuel_type: Form.fuel_type.value,
      date: Form.date.value,
      location: Form.location.value,
    };
  },

  validateFields() {
    const {
      actual_distance,
      fuel_volume,
      unity_amount,
      fuel_type,
      date,
      location,
    } = Form.getValues();

    if (
      actual_distance.trim() === "" ||
      fuel_volume.trim() === "" ||
      unity_amount.trim() === "" ||
      fuel_type.trim() === "" ||
      date.trim() === "" ||
      location.trim() === ""
    ) {
      throw new Error("Por favor, preencha todos os campos");
    }
  },

  formatValues() {
    let {
      actual_distance,
      fuel_volume,
      unity_amount,
      fuel_type,
      date,
      location,
    } = Form.getValues();

    date = Utils.formatDate(date);

    return {
      actual_distance,
      fuel_volume: parseFloat(fuel_volume),
      unity_amount: Utils.formatAmount(unity_amount),
      fuel_type,
      date,
      location,
    };
  },

  clearFields() {
    Form.actual_distance.value = "";
    Form.fuel_volume.value = "";
    Form.unity_amount.value = "";
    Form.fuel_type.value = "";
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
    StorageAutonomy.get()

    DOM.updateBalance();

    Storage.set(Transaction.all);
    StorageAutonomy.set(StorageAutonomy.get())
  },
  reload() {
    DOM.clearTransactions();
    App.init();
  },
};

App.init();

const data_compra = document.querySelector("input#date");
data_compra.value = new Date(Date.now()).toISOString().split("T")[0];

function exportJson() {
  const data = JSON.stringify(Storage.get());
  const autonomy = JSON.stringify(StorageAutonomy.get());
  const database = {
    autonomy,
    data,
  };

  const dataUri =
    "data:application/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(database));
  let linkElement = document.createElement("a");
  linkElement.setAttribute("href", dataUri);
  linkElement.setAttribute("download", "database_corridas.json");
  linkElement.click();
  linkElement.remove();
}

const linkElement = document.querySelector("input#import-json");

const viewFile = (files) => {
  let f = files[0];
  let reader = new FileReader();
  reader.onload = (function (theFile) {
    return function (e) {
      if (
        confirm(
          "Deseja carregar este arquivo? Isso sobreescreverá o conteúdo existente!"
        )
      ) {
        const database = JSON.parse(e.target.result.replace(/\\\//g, "/"));

        Storage.set(JSON.parse(database.data));
        StorageAutonomy.set(JSON.parse(database.autonomy));

        location.reload();
      }
    };
  })(f);

  reader.readAsText(f);
};
