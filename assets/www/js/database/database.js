function initializeDataBase() {
	var dbShell = window.openDatabase("myGoals", "1.0", "myGoals", 1000000);
	dbShell.transaction(createTables, error, success);
}

function createTables(tx) {
	tx.executeSql('CREATE TABLE IF NOT EXISTS GOAL(id INTEGER PRIMARY KEY AUTOINCREMENT, goal, date)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS ITEM(id INTEGER PRIMARY KEY AUTOINCREMENT, item, date, goalID)');
}

function error(tx, error) {
	alert('Ocorreu um erro ao inicializar sua base de dados ' + error);
}

function success() {

}

function insertGoal(tx) {
	tx.executeSql("INSERT INTO GOAL(goal, date) VALUES ('teste','12/12/2012') ");
	tx.executeSql("INSERT INTO GOAL(goal, date) VALUES ('teste1','12/12/2012') ");

}

function insertItem(date, item, goalID) {
	tx.executeSql('INSERT INTO ITEM(item, date, goalID) VALUES (' + item + ','
			+ date + ',' + goalID + ') ');

}

function openToInsert() {
	var dbShell = window.openDatabase("myGoals", "1.0", "myGoals", 1000000);
	dbShell.transaction(insertGoal, error, success);
}

function openToQuery() {
	var dbShell = window.openDatabase("myGoals", "1.0", "myGoals", 1000000);
	dbShell.transaction(selectGoal, error, success);
}

function selectGoal(tx) {
	alert(tx);
	tx.executeSql('SELECT * FROM GOAL', [], querySuccess, errorCB);
}

function querySuccess(tx, results) {
    // the number of rows returned by the select statement
    alert("Insert ID = " + results.rows.length);
    
    var len = results.rows.length;
    for (var i=0; i<len; i++){
	   alert("Row = " + i + " ID = " + results.rows.item(i).id + " Goal =  " + results.rows.item(i).goal);
     }
}

function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}
