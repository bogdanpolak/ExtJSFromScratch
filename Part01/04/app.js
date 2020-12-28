Ext.application({
	launch: function () {
		Ext.Viewport.add({
			xtype: 'grid',
			title: 'Users',

			columns: [
				{text: 'Name', width: 100, dataIndex: 'name'},
				{text: 'Email Address', flex: 1, dataIndex: 'email'},
				{text: 'Phone Number', width: 200, dataIndex: 'phone'},
				{text: 'State', width: 40, dataIndex: 'state'}
			],
			data: GetData(),
			listeners: {
				select: function (sender, dataObj) {
					console.log('HTMLTableRow rowIndex:', sender.rowIndex);
					console.log(sender);  // tr element
					alert(
						'Person: '+dataObj.name+'\n'+
						'Email:  '+dataObj.email+'\n'+
						'Phone:  '+dataObj.phone
					);
				}
    		}
		});
	}
});
