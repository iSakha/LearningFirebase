// ============ Firebase Config ===============

let firebaseConfig = {
    apiKey: "AIzaSyDtY9LIQJoFuYy_dIpLFH3B5jnx5Ta-gjs",
    authDomain: "third-ac40d.firebaseapp.com",
    databaseURL: "https://third-ac40d.firebaseio.com",
    projectId: "third-ac40d",
    storageBucket: "",
    messagingSenderId: "225707986765",
    appId: "1:225707986765:web:3d6dc784e9cd983e63b104"
};

// ============ Initialize Firebase ===============

firebase.initializeApp(firebaseConfig);

let mySelectId = '';
let myNameId = '';
let myColorId = '';
let myQtyId = '';

let table1RowsQty = 0;

//================= Create form 1 =========================

let form1 = document.createElement('form');
let parentForm1 = document.getElementById('frm1');
parentForm1.appendChild(form1);
form1.id = 'form1'

//====================== # firstRow ===================

let div1 = document.createElement('div');
form1.appendChild(div1);
div1.id = 'firstRow';

let txtInput_1 = document.createElement('input');
div1.appendChild(txtInput_1);
txtInput_1.type = 'text';
txtInput_1.size = 20;
txtInput_1.id = 'txt1'

let lblPar1 = document.createElement('p');
div1.appendChild(lblPar1);
lblPar1.innerHTML = '&nbsp This is NAME field'
lblPar1.id = 'lbl1'

let par1 = document.createElement('p');
form1.appendChild(par1);

//===================== # secondRow ==================

let div2 = document.createElement('div');
form1.appendChild(div2);
div2.id = 'secondRow';

let txtInput_2 = document.createElement('input');
div2.appendChild(txtInput_2);
txtInput_2.type = 'text';
txtInput_2.size = 20;
txtInput_2.id = 'txt2'

let lblPar2 = document.createElement('p');
div2.appendChild(lblPar2);
lblPar2.innerHTML = '&nbsp This is COLOR field'
lblPar2.id = 'lbl2'

let par2 = document.createElement('p');
form1.appendChild(par2);

//======================= # thirdRow =====================

let div3 = document.createElement('div');
form1.appendChild(div3);
div3.id = 'thirdRow';

let txtInput_3 = document.createElement('input');
div3.appendChild(txtInput_3);
txtInput_3.type = 'text';
txtInput_3.size = 20;
txtInput_3.id = 'txt3'

let lblPar3 = document.createElement('p');
div3.appendChild(lblPar3);
lblPar3.innerHTML = '&nbsp This is QUANTITY field'
lblPar3.id = 'lbl3'

//======================= # fourthRow =====================

let div4 = document.createElement('div');
form1.appendChild(div4);
div4.id = 'fourthRow';

let btnS = document.createElement('input');
div4.appendChild(btnS);
btnS.type = 'button';
btnS.value = "SET";
btnS.onclick = setData;
btnS.id = 'btnS';


let btnP = document.createElement('input');
div4.appendChild(btnP);
btnP.type = 'button';
btnP.value = "PUSH";
btnP.onclick = pushData;
btnP.id = 'btnP';

//================== Functions =======================

function setData() {
    let database = firebase.database();
    let fruitRef = database.ref('/Learning/fruit');
    let result = fruitRef.set({
        name: txtInput_1.value,
        color: txtInput_2.value,
        quantity: txtInput_3.value
    });
}

function pushData() {
    let database = firebase.database();
    let fruitRef = database.ref().child('Learning');
    // console.log (fruitRef);
    let key = fruitRef.push().key;
    let update = {};
    update[key] = {
        name: txtInput_1.value,
        color: txtInput_2.value,
        quantity: txtInput_3.value,
    }
    let result = fruitRef.update(update);
}

function getKeys(data) {

    let mySelect = document.getElementById(mySelectId);

    var fruits = data.val();
    //console.log(fruits);
    var keys = Object.keys(fruits);
    //console.log(keys);

    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        let option = document.createElement('option');
        option.text = k;
        mySelect.add(option);
        //  console.log(k);

    }
}

function showItem(data) {

    let mySelect = document.getElementById(mySelectId);
    let txtName = document.getElementById(myNameId);
    let txtColor = document.getElementById(myColorId);
    let txtQty = document.getElementById(myQtyId);

    let fruits = data.val();
    //console.log(fruits);
    //let keys = Object.keys(fruits);
    //console.log(keys);
    let n = mySelect.options.selectedIndex;
    let k = mySelect[n].text
    // console.log(fruits[k].name);

    txtName.value = fruits[k].name;
    txtColor.value = fruits[k].color;
    txtQty.value = fruits[k].quantity;

}

function errData(err) {
    console.log('Error!');
    console.log(err);
}


function prev(data) {

    mySelectId = 'keysfrm2'
    let mySelect = document.getElementById(mySelectId);
    let txtName = document.getElementById(myNameId);
    let txtColor = document.getElementById(myColorId);
    let txtQty = document.getElementById(myQtyId);

    let fruits = data.val();

    let n = mySelect.options.selectedIndex - 1;

    if (n < 0) {
        alert('This is first item!')
    } else {
        let k = mySelect[n].text

        txtName.value = fruits[k].name;
        txtColor.value = fruits[k].color;
        txtQty.value = fruits[k].quantity;

        mySelect.selectedIndex = n;
    }

}


function next(data) {

    mySelectId = 'keysfrm2'
    let mySelect = document.getElementById(mySelectId);
    let txtName = document.getElementById(myNameId);
    let txtColor = document.getElementById(myColorId);
    let txtQty = document.getElementById(myQtyId);

    let fruits = data.val();

    let n = mySelect.options.selectedIndex + 1;
    console.log(n);
    if (n > mySelect.options.length - 1) {
        alert('This is last item!')
    } else {
        let k = mySelect[n].text

        txtName.value = fruits[k].name;
        txtColor.value = fruits[k].color;
        txtQty.value = fruits[k].quantity;

        mySelect.selectedIndex = n;
    }


}

function createTable(data) {

    let array = new Array();

    var fruits = data.val();
    console.log(fruits);
    var keys = Object.keys(fruits);
    console.log(keys);

    if (table1RowsQty > 0) { 

        console.log('remove table');
        myTable1.remove();        

    }

    console.log('create table');

        let table1 = document.createElement('table');
        let parentTable = document.getElementById('table1');
        table1.id = 'myTable1';
    
        console.log('rows qty: ' + table1.rows.length);
    
        let myRow = document.createElement('tr');
        //console.log(myRow);
        let myCell = document.createElement('th');
        myCell.innerHTML = 'key';
        myRow.appendChild(myCell);
        myCell = document.createElement('th');
        myCell.innerHTML = 'Name';
        myRow.appendChild(myCell);
        myCell = document.createElement('th');
        myCell.innerHTML = 'Color';
        myRow.appendChild(myCell);
        myCell = document.createElement('th');
        myCell.innerHTML = 'Quantity';
        myRow.appendChild(myCell);
    
        table1.appendChild(myRow);
        parentTable.appendChild(table1);
    
        for (var i = 0; i < keys.length; i++) {
    
            var k = keys[i];
    
            array[0] = k;
            array[1] = fruits[k].name;
            array[2] = fruits[k].color;
            array[3] = fruits[k].quantity;
    
            console.log(array);
    
            // create a new row
            var newRow = table1.insertRow(i + 1);
    
            for (var j = 0; j < 4; j++) {
    
                // create a new cell
                var cell = newRow.insertCell(j);
    
                // add value to the cell
                cell.innerHTML = array[j];
            }
    
        }

    table1RowsQty = table1.rows.length;
        
    }


//*********************************************************************************

//====================              Form 2                  =======================

//*********************************************************************************

let btnGetKeys2 = document.getElementById('btn1frm2');
let btnShowItem2 = document.getElementById('btn2frm2');
let btnClear2 = document.getElementById('btn3frm2');
let btnPrev = document.getElementById('btn4frm2');
let btnNext = document.getElementById('btn5frm2');




btnGetKeys2.addEventListener('click', () => {

    mySelectId = 'keysfrm2';

    var database = firebase.database();
    var ref = database.ref().child('Learning');
    ref.on('value', getKeys, errData);

})



btnShowItem2.addEventListener('click', () => {

    mySelectId = 'keysfrm2';
    myNameId = 'txt1frm2';
    myColorId = 'txt2frm2';
    myQtyId = 'txt3frm2';

    var database = firebase.database();
    var ref = database.ref().child('Learning');
    ref.on('value', showItem, errData);

    //var n = mySelect.options.selectedIndex;
    // console.log(mySelect[n].text);

})



btnClear2.addEventListener('click', () => {

    let mySelect = document.getElementById('keysfrm2');
    let txtName = document.getElementById('txt1frm2');
    let txtColor = document.getElementById('txt2frm2');
    let txtQty = document.getElementById('txt3frm2');

    txtName.value = '';
    txtColor.value = '';
    txtQty.value = '';

    let opt = mySelect.options
    while (mySelect.options.length > 0) {
        //console.log(mySelect.options.length);
        opt[mySelect.options.length - 1] = null;
    }

})


btnPrev.addEventListener('click', () => {
    var database = firebase.database();
    var ref = database.ref().child('Learning');
    ref.on('value', prev, errData);
});

btnNext.addEventListener('click', () => {
    var database = firebase.database();
    var ref = database.ref().child('Learning');
    ref.on('value', next, errData);
});

//*********************************************************************************

//====================              Form 3                  =======================

//*********************************************************************************


let btnGetKeys3 = document.getElementById('btn1frm3');
let btnShowItem3 = document.getElementById('btn2frm3');
let btnClear3 = document.getElementById('btn3frm3');
let btnAdd = document.getElementById('btn4frm3');
let btnRmv = document.getElementById('btn5frm3');

btnGetKeys3.addEventListener('click', () => {

    mySelectId = 'keysfrm3';

    var database = firebase.database();
    var ref = database.ref().child('Learning');
    ref.on('value', getKeys, errData);

})

btnShowItem3.addEventListener('click', () => {

    mySelectId = 'keysfrm3';
    myNameId = 'txt1frm3';
    myColorId = 'txt2frm3';
    myQtyId = 'txt3frm3';

    var database = firebase.database();
    var ref = database.ref().child('Learning');
    ref.on('value', showItem, errData);

    //var n = mySelect.options.selectedIndex;
    // console.log(mySelect[n].text);

})

btnClear3.addEventListener('click', () => {

    let mySelect = document.getElementById('keysfrm3');
    let txtName = document.getElementById('txt1frm3');
    let txtColor = document.getElementById('txt2frm3');
    let txtQty = document.getElementById('txt3frm3');

    txtName.value = '';
    txtColor.value = '';
    txtQty.value = '';

    let opt = mySelect.options
    while (mySelect.options.length > 0) {
        //console.log(mySelect.options.length);
        opt[mySelect.options.length - 1] = null;
    }

})

btnAdd.addEventListener('click', () => {

    let txtName = document.getElementById('txt1frm3');
    let txtColor = document.getElementById('txt2frm3');
    let txtQty = document.getElementById('txt3frm3');

    let database = firebase.database();
    let fruitRef = database.ref().child('Learning');

    // console.log (fruitRef);
    let key = fruitRef.push().key;
    let update = {};
    update[key] = {
        name: txtName.value,
        color: txtColor.value,
        quantity: txtQty.value,
    }
    let result = fruitRef.update(update);
})

btnRmv.addEventListener('click', () => {

    let mySelect = document.getElementById('keysfrm3');
    let n = mySelect.options.selectedIndex;
    let selKey = mySelect.options[n].value;
    let pathToDelete = 'Learning/' + selKey

    var ref = firebase.database().ref(pathToDelete);
    ref.remove();


})


let btnName = document.createElement('button');
let parBtnName = document.getElementById('btntbl');
let btnColor = document.createElement('button');
let parBtnColor = document.getElementById('btntbl');
let btnQty = document.createElement('button');
let parBtnQty = document.getElementById('btntbl');

parBtnName.appendChild(btnName);
parBtnColor.appendChild(btnColor);
parBtnQty.appendChild(btnQty);

btnName.id = 'btnName';
btnName.innerHTML = 'Name';
btnColor.id = 'btnColor';
btnColor.innerHTML = 'Color';
btnQty.id = 'btnQty';
btnQty.innerHTML = 'Quantity';





let btnLoad = document.createElement('button');
let parBtnLoad = document.getElementById('table1');
parBtnLoad.appendChild(btnLoad);
btnLoad.innerHTML = 'Load data';
btnLoad.id = 'btnLoad';

btnLoad.addEventListener('click', () => {

    var database = firebase.database();
    var ref = database.ref().child('Learning');
    ref.on('value', createTable, errData);

})

btnName.addEventListener('click', () => {

    var database = firebase.database();
    var ref = database.ref().child('Learning').orderByChild('name');
    ref.once('value', function(snapshot) {
console.log('key: ' + JSON.stringify(snapshot.key));
console.log('val: ' + JSON.stringify(snapshot.val()));
console.log('numChildren: ' + JSON.stringify(snapshot.numChildren()));

snapshot.forEach(function(item) {
    console.log(JSON.stringify(item.val()))
})

    });

})