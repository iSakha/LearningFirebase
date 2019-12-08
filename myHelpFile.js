// Examples from Firebase


//              Methods     https://firebase.google.com/docs/reference/js/firebase.database.Reference.html#methods


//********************
//      SET          *       https://firebase.google.com/docs/reference/js/firebase.database.Reference.html#set
//********************

var adaNameRef = firebase.database().ref('users/ada/name');
adaNameRef.child('first').set('Ada');
adaNameRef.child('last').set('Lovelace');
// We've written 'Ada' to the Database location storing Ada's first name,
// and 'Lovelace' to the location storing her last name.

adaNameRef.set({ first: 'Ada', last: 'Lovelace' });
// Exact same effect as the previous example, except we've written
// Ada's first and last name simultaneously.


adaNameRef.set({ first: 'Ada', last: 'Lovelace' })
  .then(function() {
    console.log('Synchronization succeeded');
  })
  .catch(function(error) {
    console.log('Synchronization failed');
  });
// Same as the previous example, except we will also log a message
// when the data has finished synchronizing.



//********************
//     PUSH          *       https://firebase.google.com/docs/reference/js/firebase.database.Reference.html#push
//********************





//********************
//    REMOVE         *       https://firebase.google.com/docs/reference/js/firebase.database.Reference.html#remove
//********************

var adaRef = firebase.database().ref('users/ada');
adaRef.remove()
  .then(function() {
    console.log("Remove succeeded.")
  })
  .catch(function(error) {
    console.log("Remove failed: " + error.message)
  });


// in my case
  var ref = firebase.database().ref('Learning/-Lv_nfqdwVpBwM6yWtWh');
  ref.remove();




// DOM element SELECT

var mySelect = document.getElementById('keysfrm3');
var selValue = mySelect.options[mySelect.selectedIndex].value;
console.log(selValue);