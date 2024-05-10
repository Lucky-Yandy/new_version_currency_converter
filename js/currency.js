const droplist = document.querySelectorAll(".drop-list select");
const getButton =document.querySelector("form button");
const fromCurrency =document.querySelector("form select");
const toCurrency = document.querySelector(".to select");
const  exchangeText = document.querySelector(".exchange-rate");
for(let i=0; i<droplist.length; i++ ){
   for (country in country_list){
      // selecting USD by default as From Currency and NPR as To currency
      let selected;
      if(i ==0){
        selected = country =="USD" ?"selected":"";
      }else if(i==1){
        selected = country =="NPR" ?"selected":"";
      
      }
      
      //create option tag with passing currency code as a text and value
      let optionElement=` <option value="${country}"${selected} >${country}</option>`;
      // insert option tag inside select tag
      droplist[i].insertAdjacentHTML("beforeend",optionElement)  
   }
   
    droplist[i].addEventListener("change",e =>{
     loadFlag(e.target);
    
    });  
}

function loadFlag(element){
 for (currencyname in country_list ){
    if(currencyname ==element.value){ // if currency is equal to option.value
    let imgTag = element.parentElement.querySelector("img");
    imgTag.src=`https://flagsapi.com/${country_list[currencyname]}/flat/64.png`;
    }
 }
}


window.addEventListener("load",()=>{
 
  getExchangeRate();
 
 });


getButton.addEventListener("click",e=>{
  e.preventDefault();//preventing form from submit
  getExchangeRate();
 
 });

const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click",()=>{
     let tempCode = fromCurrency.value;
     fromCurrency.value = toCurrency.value;
     toCurrency.value =tempCode;
     getExchangeRate();
     loadFlag(fromCurrency);
     loadFlag(toCurrency);
})


let api_key= "6e4a05ef852519608829d87d"

function getExchangeRate(){
 const amount = document.querySelector(".amount input");
 let amountVal= amount.value;
 //if user don't enter any value or enter 0,then we will put one value on default
 if(amountVal =="" || amountVal=="0"){
   amount.value="1";
   amountVal=1;
 }
 exchangeText.innerText="Getting exchange rate";
 let url =`https://v6.exchangerate-api.com/v6/${api_key}/latest/${fromCurrency.value}`;
 
 fetch(url)
  .then(response => response.json()) // Parse the JSON response
  .then(data => {
     let excangeRate = data.conversion_rates[toCurrency.value];
     //console.log(data);
     //console.log(excangeRate);
     let totalExchangeRate=( amountVal*excangeRate).toFixed(2);
     //console.log(totalExchangeRate);
   
     exchangeText.innerText=`${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
  })
  .catch(error => {
     exchangeText.innerText="Something went wrong...";
  });
 
 
 
 }

//6e4a05ef852519608829d87d





















