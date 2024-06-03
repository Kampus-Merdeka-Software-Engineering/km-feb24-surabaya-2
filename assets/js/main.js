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

// function buildBarChart(data, title, id) 

// function buildDataTables(data, id)

function fetchData(filtered = null) {
  if (filtered != null) {
    fetch("./assets/json/sales_vendingmachine.json").
    then(response => response.json()).
    then(datas => {
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
    });
  }else{
    fetch("./assets/json/sales_vendingmachine.json").
    then(response => response.json()).
    then(datas => {
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
    });
  }
}

// onchange event for select
// filtered by product

document.addEventListener("DOMContentLoaded", function () {
  fetchData();
});
