var Ext = {};
Ext.application = function(item) {
	Ext.application.launch = item.launch;
};
Ext.create = function(item) {
	var createditem = {};
	const componentBuilder = ComponentBuilder();
	switch(item.xtype) {
	case "grid":
		createditem = componentBuilder.buildExtGrid(item);
		break;
	default:
		break;
	}
	return createditem;
};

function ComponentBuilder() {
	return {
		buildExtGrid: function(item) {
			var grid = document.createElement("div");
			grid.setAttribute("id", "data-grid1");
			grid.setAttribute("class", "db-grid");
			var title = document.createElement("div");
			title.setAttribute("class", "gridTitle");
			title.innerHTML = item.title;
			var table = document.createElement("table");
			table.setAttribute("class", "dataTable");
			var header = table.createTHead();
			var htmltableHeaderRow = header.insertRow(0);   
			for (i=0;i<item.columns.length;i++) {
				th = document.createElement('th');
				th.innerHTML = item.columns[i].text;
				htmltableHeaderRow.appendChild(th);
			}
			var body = table.createTBody();
			const addGridRow = function(rowidx) {
				const htmltableRow = body.insertRow(i);
				const rowObj = {};
				for (colIdx=0; colIdx<item.columns.length; colIdx++) {
					prop = item.columns[colIdx].dataIndex;
					const value = item.data[rowidx][prop];
					rowObj[prop] = value;
					td = document.createElement('td');
					td.innerHTML = value;
					htmltableRow.appendChild(td);
				}
				// var record=[]; record[0] = {};  record[0].data = o;
				htmltableRow.onclick = function() {
					return item.listeners.select(htmltableRow,rowObj)
				};  
			};
			for (var i=0;i<item.data.length;i++) {
				addGridRow(i);
			};
			grid.appendChild(title);
			grid.appendChild(table);
			return grid;
		}
	}	
}

document.addEventListener("DOMContentLoaded", function(event) {

	var viewport = document.createElement("DIV");
	viewport.setAttribute("id", "ext-viewport");
	viewport.setAttribute("class", "x-viewport");
	document.body.appendChild(viewport);
	Ext.Viewport = viewport;
	Ext.Viewport.add = function(item) {
		Ext.Viewport.appendChild(Ext.create(item));
	};
	Ext.application.launch()
	//launch();
});

function addRowHandlers(table) {
	var table = document.getElementById(table);
	var rows = table.getElementsByTagName("tr");
	for (i = 1; i < rows.length; i++) {
		var row = table.rows[i];
		row.onclick = function(myrow){
			return function() { 
				var cell = myrow.getElementsByTagName("td")[0];
				var id = cell.innerHTML;
				alert("id:" + id);
			};
		}(row);
	}
}
