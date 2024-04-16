let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood='create';
let temp;

function getTotal(){
  
     if(price.value != ''){
        let result= (+price.value + +taxes.value + +ads.value)-(+discount.value);
        total.innerHTML=result;
        total.style.background = "#040";
     }
     else{
        total.innerHTML="";
        total.style.background = "#a00d02";
     }

}
let dataPro;
if(localStorage.Product != null){
   dataPro = JSON.parse(localStorage.Product);
}
else{
   dataPro=[];
}
function insertItem(){
   let newPro={
      title:title.value.toLowerCase(),
      price:price.value,
      taxes:taxes.value,
      ads:ads.value,
      discount:discount.value,
      total:total.innerHTML,
      count:count.value,
      category:category.value.toLowerCase()
   }
   if(title.value != '' && price.value!='' && category.value!='' && newPro.count<100){
      if(mood==='create'){
         if(newPro.count >1){
            for(let j=0;j<newPro.count;j++){
               dataPro.push(newPro);
            }
         }
         else{
            dataPro.push(newPro);
          
   
         }
      }else{
         dataPro[temp]=newPro;
         mood='create';
         submit.innerHTML='Create';
         count.style.display='block';
      }
      clearData();
   }
   
   
   localStorage.setItem('Product',JSON.stringify(dataPro));
   
   showData();
}
function clearData(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML ='';
    count.value='';
    category.value='';

}
function showData(){
   getTotal();
   let table= '';
   for(let i=0;i<dataPro.length;i++){
      table+=`
      <tr>
      <td>${i+1}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].taxes}</td>
      <td>${dataPro[i].ads}</td>
      <td>${dataPro[i].discount}</td>
      <td>${dataPro[i].total}</td>
      <td>${dataPro[i].category}</td>
      <td><button onclick="updateData(${i})" id="update">Update</button></td>
      <td><button onclick="deleteData(${i})" id="delete">Delete</button></td> 
      </tr>
      `
   }
   document.getElementById('tbody').innerHTML =table;
   let btndelete= document.getElementById('deleteAll');
   if(dataPro.length >0){
      btndelete.innerHTML=`
      <button onclick="deleteAll()">deleteAll(${dataPro.length})</button>
      `
   }else{
      btndelete.innerHTML='';
   }

}
showData();
function deleteData(i){
   dataPro.splice(i,1);
   localStorage.Product=JSON.stringify(dataPro);
   showData();
}
function deleteAll(){
   localStorage.clear();
   dataPro.splice(0);
   showData();
}
function updateData(i){
   title.value=dataPro[i].title;
   price.value=dataPro[i].price;
   taxes.value=dataPro[i].taxes;
   ads.value=dataPro[i].ads;
   discount.value=dataPro[i].discount;
   getTotal();
   count.style.display='none';
   category.value=dataPro[i].category;
   submit.innerHTML='Update';
   mood='update';
   temp=i;
   scroll({
      top:0,
      behavior:"smooth"
   }
  ) ;
  

}
let searchMood='title';
function getSearchMood(id){
   let search = document.getElementById('search');
   if(id == 'searchTitle'){
      searchMood='title';
   }
   else{
      searchMood='category';
   }
   search.placeholder='Search By '+searchMood ;
   search.focus();
   search.value='';
   showData();

}
function searchData(value){
   let table='';

   if(searchMood=='title'){
      for(let i=0;i<dataPro.length;i++){
         if(dataPro[i].title.includes(value.toLowerCase())){
            table+=`
            <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td> 
           </tr>
          `

         }
      }

   }else{
      for(let o=0;o<dataPro.length;o++){
         if(dataPro[o].category.includes(value.toLowerCase())){
            table+=`
            <tr>
            <td>${o}</td>
            <td>${dataPro[o].title}</td>
            <td>${dataPro[o].price}</td>
            <td>${dataPro[o].taxes}</td>
            <td>${dataPro[o].ads}</td>
            <td>${dataPro[o].discount}</td>
            <td>${dataPro[o].total}</td>
            <td>${dataPro[o].category}</td>
            <td><button onclick="updateData(${o})" id="update">Update</button></td>
            <td><button onclick="deleteData(${o})" id="delete">Delete</button></td> 
           </tr>
          `

         }
      }

   }
   document.getElementById('tbody').innerHTML =table;
   }

