require(["scripts/libreria.js"], function (Libreria) {
	Libreria.askPermission("CONTACTS");
});

var algo,str;
str = "<select class=' selectionfield span12' id='sfld2' onchange='showSelect()' onkeypress='if(event.keyCode==13){clickButton(\'ln32|ln23\'); return false;}' name='sfld2'><option value=''>No selection</option></select>"
algo = document.getElementById('sfld2');
algo.parentNode.innerHTML=str;
function showSelect()
{

 require(["scripts/libreria.js"], function (Libreria) {
	
		function errorContact() {
            alert('Error obteniendo contactos');
        }

        Libreria.contacts(function (obj) {
			var select = document.getElementById('sfld2').value;
			var i, str="";
			var ultimo = obj.contacts[parseInt(select)].phoneNumbers.length;
			
			for(i=0; i<ultimo; i = i + 1) {
				str = str + "<option id='contact"+i+"'>"+obj.contacts[parseInt(select)].phoneNumbers[i];+"</option>"
			}
			
			document.getElementById("sfld3").innerHTML=str;   
        },errorContact);


    });
	
	


}

function cargarcontactos(){
	require(["scripts/libreria.js"], function (Libreria) {
		var i, str = "<option id ='wp'>No selection</option> </select>";
		function errorContact() {
            alert('Error obteniendo contactos');
        }

        Libreria.contacts(function (obj) {
            var ultimo = obj.contacts.length;
            for(i=0; i<ultimo; i = i + 1) {
				str = str + "<option id='contact"+i+"' value='"+i+"'>"+obj.contacts[i].name.givenName+"</option>"
			}
			document.getElementById("sfld2").innerHTML=str;   
        },errorContact);


    });


		

}

    
	
	
	