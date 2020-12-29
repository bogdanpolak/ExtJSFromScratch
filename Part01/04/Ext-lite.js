var Ext = {};
Ext.application = function(item) {
	Ext.application.launch = item.launch;
};
Ext.create = function(item) {
	var createditem = {};
	const componentBuilder = ComponentBuilder();
	switch(item.xtype) {
	case "grid":
		createditem = componentBuilder.buildDataGrid(item);
		break;
	default:
		break;
	}
	return createditem;
};

function _nn(tagName, id, className, child) {
	var newNode = document.createElement(tagName);
	if (id) {
		newNode.id = id;
	}
	if (className) {
		newNode.classList.add(className);
	}
	if (child && typeof child === "object" && child instanceof Array) {
		child.forEach(item => {
			if (item && typeof item === "string") 
				newNode.innerHTML = item;
			if (item && typeof item === "object" && item instanceof HTMLElement) 
				newNode.appendChild(item);
		});
	}
	if (child && typeof child === "string") {
		newNode.innerHTML = child;
	}
	if (child && typeof child === "object" && child instanceof HTMLElement) {
		newNode.appendChild(child);
	}
	return newNode;
}

function ComponentBuilder() {
		
	return {
		buildDataGrid: function(item) {
			const table = _nn("table","","datagrid-table");
			buildDataTableHeader(table);
			buildDataTableBody(table);
			const grid = _nn("div","data-grid1","datagrid-div",[
				_nn("div","","gridTitle",item.title),
				table
			]);
			return grid;

			function buildDataTableHeader(table){
				var header = table.createTHead();
				var htmltableHeaderRow = header.insertRow(0);   
				for (i=0;i<item.columns.length;i++) {
					th = document.createElement('th');
					th.innerHTML = item.columns[i].text;
					htmltableHeaderRow.appendChild(th);
				}
			}
			function buildDataTableBody(table){
				const body = table.createTBody();
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
			}
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
