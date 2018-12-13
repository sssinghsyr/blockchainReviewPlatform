web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"user","type":"string"},{"name":"p_review","type":"string"},{"name":"p_name","type":"string"},{"name":"p_link","type":"string"},{"name":"p_price","type":"uint256"},{"name":"p_date","type":"string"}],"name":"submitReview","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"user","type":"string"},{"name":"index","type":"uint256"}],"name":"getUserProdReview","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"user","type":"string"},{"name":"index","type":"uint256"}],"name":"getUserProdName","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"user","type":"string"},{"name":"index","type":"uint256"}],"name":"getUserProdDate","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"user","type":"string"},{"name":"index","type":"uint256"}],"name":"getUserProdLink","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"user","type":"string"},{"name":"index","type":"uint256"}],"name":"getUserProdPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"databaseInit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"user","type":"string"}],"name":"getUserReviewCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":true,"stateMutability":"payable","type":"constructor"}]')

ReviewPlatformContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = ReviewPlatformContract.at('0x97ac11a9fb750d55c3865c98af0433fd44367e98');
var account;

userName = "None";
var isLoggedIn = false;
var recordCount = 0;

function userLogin(){
  //$("table.order-list").empty();
  $("table.order-list > tbody").html("");
  userName = $("#username").val();
  isLoggedIn = true;
  document.getElementById('loginButton').className = 'btn btn-success';
  recordCount = contractInstance.getUserReviewCount.call(userName).toString();
  document.getElementById('reviewCount').value = recordCount;

  // Adding rows
  for (var i = 0; i < recordCount; i++) {
    var newRow = $("<tr>");
    var cols = "";

    cols += '<td><input type="text" class="form-control" value="' + contractInstance.getUserProdName.call(userName,i).toString() + '"/></td>';
    cols += '<td><input type="text" class="form-control" value="'+ contractInstance.getUserProdLink.call(userName,i).toString()+'"></td>';
    cols += '<td><input type="text" class="form-control" value="'+ contractInstance.getUserProdPrice.call(userName,i).toString()+'"></td>';
    cols += '<td><input type="text" class="form-control" value="'+ contractInstance.getUserProdReview.call(userName,i).toString()+'"></td>';
    cols += '<td><input type="text" class="form-control" value="'+ contractInstance.getUserProdDate.call(userName,i).toString()+'"></td>';
    newRow.append(cols);
    $("table.order-list").append(newRow);
  }
}


function refreshUserReview(){
  if(isLoggedIn){
    recordCount = contractInstance.getUserReviewCount.call(userName).toString();
    document.getElementById('reviewCount').value = recordCount;
    $("table.order-list > tbody").html("");
    // Adding rows
    for (var i = 0; i < recordCount; i++) {
      var newRow = $("<tr>");
      var cols = "";

      cols += '<td><input type="text" class="form-control" value="' + contractInstance.getUserProdName.call(userName,i).toString() + '"/></td>';
      cols += '<td><input type="text" class="form-control" value="'+ contractInstance.getUserProdLink.call(userName,i).toString()+'"></td>';
      cols += '<td><input type="text" class="form-control" value="'+ contractInstance.getUserProdPrice.call(userName,i).toString()+'"></td>';
      cols += '<td><input type="text" class="form-control" value="'+ contractInstance.getUserProdReview.call(userName,i).toString()+'"></td>';
      cols += '<td><input type="text" class="form-control" value="'+ contractInstance.getUserProdDate.call(userName,i).toString()+'"></td>';
      newRow.append(cols);
      $("table.order-list").append(newRow);
    }
  }
}


function getUserReview() {
  let div_id = 1;
  let result =  contractInstance.getUserReviewCount.call(userName).toString();
  $("#" + div_id).html(contractInstance.getUserReviewCount.call(userName).toString());
}

    
function submitUserReview() {
  if(isLoggedIn){
    p_review = $("#prod_review").val();
    p_name = $("#prod_name").val();
    p_link = $("#prod_link").val();
    p_price = $("#prod_price").val();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    } 
    if (mm < 10) {
      mm = '0' + mm;
    }
    p_date = dd + '/' + mm + '/' + yyyy;
    contractInstance.submitReview(userName, p_review, p_name, p_link, parseInt(p_price), p_date, {from: web3.eth.accounts[0], gas:900000});
  }
}

$(document).ready(function() {
  let val = contractInstance.getUserReviewCount.call(userName).toString();
  $("#" + 1).html(val);
});

