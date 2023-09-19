let names= document.getElementById('names')
let phone= document.getElementById('phone')
let Age= document.getElementById('Age')
let date= document.getElementById('date')
let price= document.getElementById('price')
let payment= document.getElementById('payment')
let checkup= document.getElementById('checkup')
let total= document.getElementById('total')
let note= document.getElementById('note')
let submit= document.getElementById('submit')
let tbody= document.getElementById('tbody')
let btnDelete =document.getElementById('deleteAll')
let mood ='create';
let temp ;


//// function ////////



function getTotal(){

  if(price.value != ''){
    var result = (+price.value) - (+payment.value);
    total.innerHTML= result;
    total.style.background ="#040";
  }else{
    total.innerHTML=''
    total.style.background ="#f10"
  }
}

//// create product /////

let dataPro;
if(localStorage.product != null){
  dataPro = JSON.parse(localStorage.product)
}else{
  dataPro=[];
}

submit.onclick =function(){
  let newPro ={
    names:names.value,
    phone:phone.value,
    Age:Age.value,
    date:date.value,
    price:price.value,
    payment:payment.value,
    checkup:checkup.value,
    total:total.innerHTML,
    note:note.value,
  }

  if(mood === 'create'){

    dataPro.push(newPro);

  }else{
    dataPro [temp] = newPro;
    menu='create'
    submit.innerHTML='create'
  }

  //// save localStorage ///

  localStorage.setItem('product',   JSON.stringify(dataPro));

  clearData()
  
  showData()

  getTotal()

  // whatsapp()
}

/////// whatsapp///////

function whatsapp(){
var names = document.getElementById("names").value;
var phone = document.getElementById("phone").value;
var date = document.getElementById("date").value;

let url = "https://wa.me/+201284484772?text="
+"*Name :* " + names +"%0a"
+"*Phone :* "+phone+"%0a"
+"*Date :* "+date+"%0a"

window.open(url,'_blank').focus();
}

//// clear data /////

function clearData(){
  names.value = '';
  phone.value = '';
  Age.value = ''
  date.value = '';
  price.value = '';
  payment.value = '';
  checkup.value = '';
  total.innerHTML = '';
  note.value= '';
}

/// show data ///

function showData(){

  let table = '';
  for(let i = 1; i < dataPro.length;i++){
    table += `
        <tr>
          <td>${i}</td>
          <td>${dataPro[i].names}</td>
          <td>${dataPro[i].phone}</td>
          <td>${dataPro[i].Age}</td>
          <td>${dataPro[i].date}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].payment}</td>
          <td>${dataPro[i].checkup}</td>
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].note}</td>
          <td>
          <button onclick="updateData(${i})" id="update" class="inp">
          <i class="fa-solid fa-pen-to-square fa-fade" style="color: #fc2803;"></i>update
          </button>
          </td>

          <td>
            <button onclick=deleteData(${i}) id="delete" class="inp">
            <i class="fa-solid fa-trash fa-bounce" style="color: #fc2803;"></i>delete
            </button>
          </td>
      </tr>
    `
  }
  document.getElementById('tbody').innerHTML=table;

    ////// deleteAll /////

  if(dataPro.length > 1 ){
    btnDelete.innerHTML=`
      <button id=deleteAll onclick=deleteAll()>Delete All</button>
    `
  }else{
    btnDelete.innerHTML=''
  }
}
showData()

///// delete ///

function deleteData(i){
  dataPro.splice(i,1)
  localStorage.product= JSON.stringify(dataPro);
  showData()
}

//// delete All //////

function deleteAll(){
  localStorage.clear()
  dataPro.splice(1)
  showData()
}

//// updateData ////

function updateData(i){
  names.value = dataPro[i].names;
  phone.value = dataPro[i].phone;
  Age.value = dataPro[i].Age;
  date.value = dataPro[i].date;
  price.value = dataPro[i].price;
  payment.value = dataPro[i].payment;
  checkup.value = dataPro[i].checkup;
  note.value = dataPro[i].note;
  submit.innerHTML='update';
  mood='update';
  temp=i;
  scroll({
    top:0,
    behavior:"smooth"
  })
  getTotal()
}

//// searchData ////

function searchData(value){
  let table='';

    for(let i = 1 ; i < dataPro.length; i++){

    if(dataPro[i].names.includes(value)){
    table +=  `
        <tr>
          <td>${i}</td>
          <td>${dataPro[i].names}</td>
          <td>${dataPro[i].phone}</td>
          <td>${dataPro[i].Age}</td>
          <td>${dataPro[i].date}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].payment}</td>
          <td>${dataPro[i].checkup}</td>
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].note}</td>
          <td>
          <button onclick="updateData(${i})" id="update" class="inp">
          <i class="fa-solid fa-pen-to-square fa-fade" style="color: #fc2803;"></i>update
          </button>
          </td>

          <td>
            <button onclick=deleteData(${i}) id="delete" class="inp">
            <i class="fa-solid fa-trash fa-bounce" style="color: #fc2803;"></i>delete
            </button>
          </td>
      </tr>
    `;
    }
    
    if(dataPro[i].phone.includes(value)){
      table +=`
        <tr>
          <td>${i}</td>
          <td>${dataPro[i].names}</td>
          <td>${dataPro[i].phone}</td>
          <td>${dataPro[i].Age}</td>
          <td>${dataPro[i].date}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].payment}</td>
          <td>${dataPro[i].checkup}</td>
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].note}</td>
          <td>
          <button onclick="updateData(${i})" id="update" class="inp">
          <i class="fa-solid fa-pen-to-square fa-fade" style="color: #fc2803;"></i>update
          </button>
          </td>

          <td>
            <button onclick=deleteData(${i}) id="delete" class="inp">
            <i class="fa-solid fa-trash fa-bounce" style="color: #fc2803;"></i>delete
            </button>
          </td>
      </tr>
    `;
    }
  }
  document.getElementById('tbody').innerHTML=table;
}

  //////////////

  content = document.querySelector('.content')
  data = document.querySelector('.data')
  create =document.getElementById('create')
  Data =document.getElementById('Data')

  create.onclick=function(){
    content.classList.toggle("active1")
  }
  Data.onclick=function(){
    data.classList.toggle("active1")
  }

  ////// menu ///////

  nah = document.querySelector(".navigation");
  menu = document.querySelector(".menu");

    menu.onclick = function () {
    nah.classList.toggle("active")
    };

    /// button-search /// 

    document.querySelector("#button-search").onclick = ()=>{

    document.getElementById("search").classList.toggle("activeBar2");
    }
