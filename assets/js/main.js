// Buat nambahin hovered di sidebar list item icon
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => item.classList.remove("hovered"));
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};

// Fungsi untuk menghitung rata-rata pendapatan
function avgRevenue(datas) {
  let calculate = 0;
  for (let i = 0; i < datas.length; i++) {
    if (datas[i]["TransTotal"] == typeof String) {
      tidyUp = datas[i]["TransTotal"].replace(",", ".");
      intData = parseFloat(tidyUp);
    } else {
      intData = parseFloat(datas[i]["TransTotal"]);
    }
    calculate += intData;
  }
  return calculate / datas.length;
}

// Fungsi untuk menghitung total penjualan per lokasi
function calculateSales(data) {
  const salesByLocation = {};

  data.forEach(transaction => {
      const location = transaction.Location;
      const total = parseFloat(transaction.TransTotal);

      if (salesByLocation[location]) {
          salesByLocation[location] += total;
      } else {
          salesByLocation[location] = total;
      }
  });

  return salesByLocation;
}

// Fungsi untuk menemukan lokasi dengan penjualan tertinggi
function findTopSalesLocation(salesByLocation) {
  let topLocation = '';
  let maxSales = 0;

  for (const location in salesByLocation) {
      if (salesByLocation[location] > maxSales) {
          maxSales = salesByLocation[location];
          topLocation = location;
      }
  }

  return { topLocation, maxSales };
}

// Fungsi untuk menghitung pertumbuhan persentase 'percentageGrowth'
function revenueMonthly(datas) {
  let result = {};
  for (let i = 0; i < datas.length; i++) {
    let month = datas[i]["TransDate"].split("/")[1];
    let key = `${month}`;
    if (!result[key]) {
      result[key] = 0;
    }
    let intData;
    if (typeof datas[i]["TransTotal"] === "string") {
      intData = parseFloat(datas[i]["TransTotal"].replace(",", "."));
    } else {
      intData = parseFloat(datas[i]["TransTotal"]);
    }
    result[key] += intData;
  }
  return result;
}

// Fungsi untuk menghitung total transaksi berdasarkan jenis
function transactionTotalbyType(datas) {
  let result = {};
  for (let i = 0; i < datas.length; i++) {
    if (result[datas[i]["Type"]] == undefined) {
      result[datas[i]["Type"]] = 0;
    }
    if (datas[i]["TransTotal"] == typeof String) {
      tidyUp = datas[i]["TransTotal"].replace(",", ".");
      intData = parseFloat(tidyUp);
    }
    result[datas[i]["Type"]] += intData;
  }
  return result;
}

// Fungsi untuk menghitung total transaksi berdasarkan kategori
function transactionCategory(datas) {
  let result = {};
  for (let i = 0; i < datas.length; i++) {
    if (result[datas[i]["Category"]] == undefined) {
      result[datas[i]["Category"]] = 0;
    }
    if (datas[i]["TransTotal"] == typeof String) {
      tidyUp = datas[i]["TransTotal"].replace(",", ".");
      intData = parseFloat(tidyUp);
    }
    result[datas[i]["Category"]] += intData;
  }
  return result;
}

// Fungsi untuk menghitung transaksi bulanan
function transactionMonthly(datas) {
  let result = {};
  for (let i = 0; i < datas.length; i++) {
    let month = datas[i]["TransDate"].split("/")[1];
    let key = `${month}`;
    if (result[key] == undefined) {
      result[key] = 0;
    }
    if (datas[i]["TransTotal"] == typeof String) {
      tidyUp = datas[i]["TransTotal"].replace(",", ".");
      intData = parseFloat(tidyUp);
    }
    result[key] += intData;
  }
  return result;
}

// Fungsi untuk memvalidasi data
function validateData(datas) {
  let validatedData = [];
  for (let i = 0; i < datas.length; i++) {
    // datas[i]["RCoil"] = datas[i]["RCoil"].toString();
    // datas[i]["RPrice"] = datas[i]["RPrice"].toString();
    // datas[i]["RQty"] = datas[i]["RQty"].toString();
    // datas[i]["MCoil"] = datas[i]["MCoil"].toString();
    // datas[i]["MPrice"] = datas[i]["MPrice"].toString();
    // datas[i]["MQty"] = datas[i]["MQty"].toString();
    // datas[i]["LineTotal"] = datas[i]["LineTotal"].toString();
    datas[i]["TransTotal"] = datas[i]["TransTotal"].toString();
    validatedData.push(datas[i]);
  }
  return datas;
}

// Fungsi untuk menginisialisasi DataTable
function initializeDataTable(data) {
  if ($.fn.DataTable.isDataTable("#example")) {
    $("#example").DataTable().destroy();
  }

  $("#example").DataTable({
    data: data,
    columns: [
      { data: "Status" },
      { data: "Device_ID" },
      { data: "Location" },
      { data: "Machine" },
      { data: "Product" },
      { data: "Category" },
      { data: "TransDate" },
      { data: "Type" },
      { data: "TransTotal" },
    ],
  });
}

// Fungsi untuk mengisi dropdown kategori
// Fungsi untuk mengisi dropdown kategori dan produk
function populateDropdown(datas) {
  let categoryDropdown = document.getElementById("categoryDropdown");
  let productDropdown = document.getElementById("productDropdown");

  let categories = new Set();
  let products = new Set();

  datas.forEach((item) => {
    categories.add(item.Category);
    products.add(item.Product);
  });

  categories.forEach((category) => {
    let option = document.createElement("option");
    option.value = category;
    option.text = category;
    categoryDropdown.appendChild(option);
  });

  products.forEach((product) => {
    let option = document.createElement("option");
    option.value = product;
    option.text = product;
    productDropdown.appendChild(option);
  });
}

//fungsi chart

function drawCharts(totalByTypeData, revMonthly, categoryData, monthlyData) {
  //inisialisasi bulan
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Mengambil data untuk chart
  const labelsTransaction = Object.keys(totalByTypeData);
  const dvTransaction = Object.values(totalByTypeData);
  const labelsRevMonth = Object.keys(revMonthly)
    .sort((a, b) => a - b)
    .map((key) => monthNames[parseInt(key) - 1]);
  const dvRevMonth = Object.keys(revMonthly)
    .sort((a, b) => a - b)
    .map((key) => revMonthly[key]);
  const labelsCategory = Object.keys(categoryData);
  const dvCategory = Object.values(categoryData);
  const labelsTransMonth = Object.keys(monthlyData)
    .sort((a, b) => a - b)
    .map((key) => monthNames[parseInt(key) - 1]);
  const dvTransMonth = Object.keys(monthlyData)
    .sort((a, b) => a - b)
    .map((key) => monthlyData[key]);

  // Bagian tipe transaksi
  const ctxTransaction = document
    .getElementById("transactionChart")
    .getContext("2d");
  new Chart(ctxTransaction, {
    type: "bar",
    data: {
      labels: labelsTransaction,
      datasets: [
        {
          label: "Total Type Transaction",
          data: dvTransaction,
          backgroundColor: ["rgba(253, 189, 42)", "rgba(17, 24, 39)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  //Bagian revenue Monthly
  const ctxRevMonth = document.getElementById("revenueChart").getContext("2d");
  new Chart(ctxRevMonth, {
    type: "bar",
    data: {
      labels: labelsRevMonth,
      datasets: [
        {
          label: "Revenue Monthly",
          data: dvRevMonth,
          backgroundColor: [
            "rgba(253, 189, 42)",
            "rgba(226, 229, 236)",
            "rgba(17, 24, 39)",
          ],
          borderWidth: 1,
          borderRadius: 5,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
    },
  });

  // Bagian kategori penjualan
  const ctxSales = document
    .getElementById("salesCategoryChart")
    .getContext("2d");
  new Chart(ctxSales, {
    type: "bar",
    data: {
      labels: labelsCategory,
      datasets: [
        {
          label: "Sales Category",
          data: dvCategory,
          backgroundColor: [
            "rgba(253, 189, 42)",
            "rgba(226, 229, 236)",
            "rgba(17, 24, 39)",
          ],
          borderWidth: 1,
          borderRadius: 5,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
    },
  });

  // Transaksi per bulan
  const ctxMonth = document.getElementById("salesMonth").getContext("2d");
  new Chart(ctxMonth, {
    type: "bar",
    data: {
      labels: labelsTransMonth,
      datasets: [
        {
          label: "Sales Monthly",
          data: dvTransMonth,
          backgroundColor: [
            "rgba(253, 189, 42)",
            "rgba(226, 229, 236)",
            "rgba(17, 24, 39)",
          ],
          borderWidth: 1,
          borderRadius: 5,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
    },
  });
}

// Fungsi untuk mengambil data
function fetchData(filteredCategory = "all", filteredProduct = "all") {
  fetch("./assets/json/sales_vendingmachine.json")
    .then((response) => response.json())
    .then((datas) => {
      // Average revenue
      let avgRev = avgRevenue(datas);
      document.getElementById(
        "average-revenue"
      ).textContent = `$${avgRev.toFixed(2)} M`;
      console.log(avgRev);

      //Top sales by location
      let salesByLocation = calculateSales(datas);
      const{topLocation, maxSales} = findTopSalesLocation(salesByLocation);
      document.getElementById('top-Sales').innerText = 
        `${topLocation} has total sales of $${maxSales.toFixed(2)}`

      // PercentageGrowth / revenueMonthly
      let revMonthly = revenueMonthly(datas);
      console.log(revMonthly);

      // Prepare bar chart for transaction type -> transTotal
      let totalByTypeData = transactionTotalbyType(datas);
      console.log(totalByTypeData);

      // Prepare bar chart total sales by category
      let categoryData = transactionCategory(datas);
      console.log(categoryData);

      // Prepare bar chart for transaction monthly
      let monthlyData = transactionMonthly(datas);
      console.log(monthlyData);

      if (filteredCategory === "all" && filteredProduct === "all") {
        populateDropdown(datas);
      }

      let filteredData = datas.filter((item) => {
        let categoryMatch =
          filteredCategory === "all" || item.Category === filteredCategory;
        let productMatch =
          filteredProduct === "all" || item.Product === filteredProduct;
        return categoryMatch && productMatch;
      });

      initializeDataTable(filteredData);
      drawCharts(totalByTypeData, revMonthly, categoryData, monthlyData);
    });
}

// On change event for select, filtered by product
document.addEventListener("DOMContentLoaded", function () {
  fetchData();

  document
    .getElementById("categoryDropdown")
    .addEventListener("change", function () {
      let selectedCategory = this.value;
      let selectedProduct = document.getElementById("productDropdown").value;
      console.log(`Selected category: ${selectedCategory}`);
      fetchData(selectedCategory, selectedProduct);
    });

  document
    .getElementById("productDropdown")
    .addEventListener("change", function () {
      let selectedProduct = this.value;
      let selectedCategory = document.getElementById("categoryDropdown").value;
      console.log(`Selected product: ${selectedProduct}`);
      fetchData(selectedCategory, selectedProduct);
    });
});
