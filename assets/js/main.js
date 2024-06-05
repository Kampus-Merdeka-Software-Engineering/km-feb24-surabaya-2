// buat nambahin hovered di sidebar list item icon
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

//Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

 toggle.onclick = function () {
   navigation.classList.toggle("active");
   main.classList.toggle("active");
};

function avgRevenue(datas) {
  let calculate = 0;
  for (let i = 0; i < datas.length; i++) {
    if (datas[i]["TransTotal"] == typeof String) {
      tidyUp = datas[i]['TransTotal'].replace(",", ".");
      intData = parseFloat(tidyUp);
    }else{
      intData = parseFloat(datas[i]["TransTotal"]);
    }
    calculate += intData;
  }
  return calculate / datas.length;
}

function transactionTotalbyType(datas) {
  let result = {};
  for (let i = 0; i < datas.length; i++) {
    if (result[datas[i]["Type"]] == undefined) {
      result[datas[i]["Type"]] = 0;
    }
    if (datas[i]["TransTotal"] == typeof String) {
      tidyUp = datas[i]['TransTotal'].replace(",", ".");
      intData = parseFloat(tidyUp);
    }
    result[datas[i]["Type"]] += intData;
  }
  return result;
}

function transactionMonthly(datas) {
  let result = {};
  for (let i = 0; i < datas.length; i++) {
    let month = datas[i]["TransDate"].split("/")[1];
    let key = `${month}`;
    if (result[key] == undefined) {
      result[key] = 0;
    }
    if (datas[i]["TransTotal"] == typeof String) {
      tidyUp = datas[i]['TransTotal'].replace(",", ".");
      intData = parseFloat(tidyUp);
    }
    result[key] += intData;
  }
  return result;
}

function transactionCategory(datas) {
  let result = {};
  for (let i = 0; i < datas.length; i++) {
    if (result[datas[i]["Category"]] == undefined) {
      result[datas[i]["Category"]] = 0;
    }
    if (datas[i]["TransTotal"] == typeof String) {
      tidyUp = datas[i]['TransTotal'].replace(",", ".");
      intData = parseFloat(tidyUp);
    }
    result[datas[i]["Category"]] += intData;
  }
  return result;
}

function validateData(datas){
  let validatedData = []
  for (let i = 0; i < datas.length; i++) {
      datas[i]["RCoil"] = toString(datas[i]["RCoil"])
      datas[i]["RPrice"] = toString(datas[i]["RPrice"])
      datas[i]["RQty"] = toString(datas[i]["RQty"])
      datas[i]["MCoil"] = toString(datas[i]["MCoil"])
      datas[i]["MPrice"] = toString(datas[i]["MPrice"])
      datas[i]["MQty"] = toString(datas[i]["MQty"])
      datas[i]["LineTotal"] = toString(datas[i]["LineTotal"])
      datas[i]["TransTotal"] = toString(datas[i]["TransTotal"])
      validatedData.push(datas[i])
  }
  return datas
}

// function buildBarChart(data, title, id) 

// function buildDataTables(data, id)

function fetchData(filtered = null) {
  fetch("./assets/json/sales_vendingmachine.json").
  then(response => response.json()).
  then(datas => {

    if (filtered != null) {
    // function to update the data with filter
    }
    
    // average revenue
    avgRevenue = avgRevenue(datas);
    console.log(avgRevenue);

    // prepare bar chart for transaction type -> transTotal
    totalByTypeData = transactionTotalbyType(datas);
    console.log(totalByTypeData);

    // prepare bar chart for transaction monthly
    monthlyData = transactionMonthly(datas);
    console.log(monthlyData);

    // prepare bar chart total sales by category
    categoryData = transactionCategory(datas);
    console.log(categoryData);

    const table = new DataTable("#example", {
      stateSave: true,
      stateLoadParams: function (settings, data) {
        data.search.search = "";
      },
      responsive: true,
      columns: [
        { data: "Status" },
        { data: "Device_ID" },
        { data: "Location" },
        { data: "Machine" },
        { data: "Product" },
        { data: "Category" },
        { data: "Transaction" },
        { data: "TransDate" },
        { data: "Type" },
        { data: "RCoil" },
        { data: "RPrice" },
        { data: "RQty" },
        { data: "MCoil" },
        { data: "MPrice" },
        { data: "MQty" },
        { data: "LineTotal" },
        { data: "TransTotal" },
        { data: "Prcd_Date" },
      ],
    });

    datas.forEach((item) => {
      table.row.add({
        Status: item.Status,
        Device_ID: item.Device_ID,
        Location: item.Location,
        Machine: item.Machine,
        Product: item.Product,
        Category: item.Category,
        Transaction: item.Transaction,
        TransDate: item.TransDate,
        Type: item.Type,
        RCoil: item.RCoil,
        RPrice: item.RPrice,
        RQty: item.RQty,
        MCoil: item.MCoil,
        MPrice: item.MPrice,
        MQty: item.MQty,
        LineTotal: item.LineTotal,
        TransTotal: item.TransTotal,
        Prcd_Date: item.Prcd_Date,
      }).draw();
    });
  });
}

// onchange event for select
// filtered by product

document.addEventListener("DOMContentLoaded", function () {
  fetchData(null);
});

// Untuk Table
// document.addEventListener("DOMContentLoaded", () => {
//   const table = new DataTable("#example", {
//     stateSave: true,
//     stateLoadParams: function (settings, data) {
//       data.search.search = "";
//     },
//     responsive: true,
//     columns: [
//       { data: "Status" },
//       { data: "Device_ID" },
//       { data: "Location" },
//       { data: "Machine" },
//       { data: "Product" },
//       { data: "Category" },
//       { data: "Transaction" },
//       { data: "TransDate" },
//       { data: "Type" },
//       { data: "RCoil" },
//       { data: "RPrice" },
//       { data: "RQty" },
//       { data: "MCoil" },
//       { data: "MPrice" },
//       { data: "MQty" },
//       { data: "LineTotal" },
//       { data: "TransTotal" },
//       { data: "Prcd_Date" },
//     ],
//   });

//   fetch("assets/json/sales_vendingmachine.json")
//   .then((res) => res.json())
//   .then((data) => {
//     data.forEach((item) => {
//       table.row.add({
//         Status: item.Status,
//         Device_ID: item.Device_ID,
//         Location: item.Location,
//         Machine: item.Machine,
//         Product: item.Product,
//         Category: item.Category,
//         Transaction: item.Transaction,
//         TransDate: item.TransDate,
//         Type: item.Type,
//         RCoil: item.RCoil,
//         RPrice: item.RPrice,
//         RQty: item.RQty,
//         MCoil: item.MCoil,
//         MPrice: item.MPrice,
//         MQty: item.MQty,
//         LineTotal: item.LineTotal,
//         TransTotal: item.TransTotal,
//         Prcd_Date: item.Prcd_Date,
//       }).draw();
//     });
//   })
//   .catch((error) => console.error("Error fetching data:", error));
// });