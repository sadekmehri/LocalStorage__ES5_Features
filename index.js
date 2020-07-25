const form = document.querySelector("#form");
const table = document.querySelector("#body");
const btnClear = document.querySelector("#clear");
var itemsArray = loadData();


Main();

function Main(){
    form.addEventListener('submit',ajouterPerson);
    btnClear.addEventListener('click',deletePerson);
    table.addEventListener('click',deleteOnePerson);
    document.addEventListener('DOMContentLoaded',fetchData(itemsArray));
}

// Get Data From local Storage
function loadData(){
    if (typeof(Storage) !== "undefined") { 
        return localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
    } else {
        console.log("No web storage Support.");
        return [];
    }
}

// Fetch data from local Storage
function fetchData(data){
    data.forEach(function(item) {
        const tr = document.createElement('tr');
        const td = `<td> ${item.nom}</td> <td> ${item.prenom} </td><td><a href="#">X</a></td>`;
        tr.innerHTML = td;
        table.appendChild(tr);
    });
}


// Ajouter un Personne
function ajouterPerson(e){
    e.preventDefault();
    const nom = form[0].value.trim();
    const prenom = form[1].value.trim();
    if(!verifString(nom) || !verifString(prenom)){
        alert("Please Try Again");
    }else{
        const p = new Person();
        p.setNom(nom);
        p.setPrenom(prenom);
        itemsArray.push(p);
        localStorage.setItem('items', JSON.stringify(itemsArray));
        buildTable(p);
        form[0].value = "";
        form[1].value = "";
    }
}

// Delete one Person
function deleteOnePerson(e){
    e.preventDefault();
    const element = e.target.parentElement.parentElement;
    const name = e.target.parentElement.previousElementSibling.previousElementSibling.textContent.trim();
    const prenom = e.target.parentElement.previousElementSibling.textContent.trim();
    if(element){
        if(confirm('Are You Sure To Delete this Record?')) {
            itemsArray.forEach(function(item,index) {
               if(name === item.nom && prenom === item.prenom){
                   itemsArray.splice(index,1);          
               }
            });
            element.remove();
            localStorage.setItem('items', JSON.stringify(itemsArray));
            alert("Deleted Successfully");
        }     
    }
}

// Delete une Personne
function deletePerson(e){
    e.preventDefault();
    if(confirm('Are You Sure To Delete all Records?')) {
        localStorage.clear();
        while(table.firstChild){
            table.removeChild(table.firstChild);
        }
        itemsArray = [];
        alert("Deleted Successfully");
    }   
}

// Allow only one Space
function filterString(string){
    if (/^(\w+\s?)*\s*$/.test(string)) {
        return string.replace(/\s+$/, '');
    }
    return null;
}

// Only Letters and Space
function verifString(string){
    if(filterString(string)){
        const regex = new RegExp(/^([a-zA-Z ]){3,10}$/);
        return string.match(regex)? true : false;
    }
    return false;   
}

// Build Table using HTMl
function buildTable(p){
    if(p){
        const tr = document.createElement('tr');
        const td = `<td> ${p.getNom()}</td> <td> ${p.getPrenom()} </td><td><a href="#">X</a></td>`;
        tr.innerHTML = td;
        table.appendChild(tr);
    }
}

/* -------------------------------------------- */

// Class Person
function Person(){
    this.nom = "";
    this.prenom = "";
}

Person.prototype.getNom = function(){
    return this.nom;
}

Person.prototype.getPrenom = function(){
    return this.prenom;
}

Person.prototype.setNom = function(nom){
    this.nom = nom;
}

Person.prototype.setPrenom = function(prenom){
    this.prenom = prenom;
}