// '.tbl-content' consumed little space for vertical scrollbar, scrollbar width depend on browser/os/platfrom. Here calculate the scollbar width .
  $(document).ready(function() {

listarTareasGrado(1);


  var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
  $('.tbl-header').css({'padding-right':scrollWidth});




  //Realiza una peticion al servidor dada la url, el tipo(GET,PUT,POST,DELETE,etc...) y la infromación a guardar.
function realizarPeticion(url,tipo,data){

        $.ajax({
          type: tipo,
          data:JSON.stringify(data),
          url: url,
          success: function(datos) {
          if(datos["data"] != ""){
            var botones=[]
            for (i in datos["data"])
            {  // if (datos[i].estado=="Activo") {continue};
               var elementotr=document.createElement('tr');



                  var elementotd=document.createElement('td');
                elementotr.appendChild(elementotd);
                  var texto=document.createTextNode(datos["data"][i]["nombre"]);
                    elementotd.appendChild(texto);


                var elementotd=document.createElement('td');
                elementotr.appendChild(elementotd);
                  var texto=document.createTextNode(datos["data"][i]["titulo"]);
                    elementotd.appendChild(texto);

                var elementotd=document.createElement('td');
                elementotr.appendChild(elementotd);
                  var texto=document.createTextNode(calcularTiempoRestante(datos["data"][i]["fecha_culminacion"],datos["data"][i]["hora"]));
                    elementotd.appendChild(texto);


 


                    var elementotd=document.createElement('td');
                    elementotr.appendChild(elementotd);
                    /*
                    var button="<button onclick = 'verDetallesTarea("+datos["data"][i]["id"]+")> </button>"
                    elementotd.append(button)
                   var objp=$('#hola');
                   objp.append(button)

*/



                    var button = document.createElement('button');
                    button.id=datos["data"][i]["id"]
                   
                    botones.push(button)
                    elementotd.appendChild(button);


                    //  var texto=document.createTextNode("id tarea" + datos["data"][i]["id"] );



                   var obj=$('#listaTareas');

                    obj.append(elementotr);

                  }
botones.forEach(function(boton) {
  console.log(boton);
  boton.onclick = function(re){
                    var r=boton.id
                    verDetallesTarea(r);
                    };
});
/*
                  for (i in botones){
                     botones[i].onclick = function(re){
                    var r=botones[i].id
                    verDetallesTarea(r);
                    };
                  }
*/
          }else{

              alert("Estimado estudiante, su curso actual no tiene tareas pendientes.");

          }

          },
          error: function(error){

            console.log("Error al realizar la peticion al servidor= "+ error );

          }
        });

}

function calcularTiempoRestante(fechaCulminacion,horaCulminacion){

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var hourToday = today.getHours();

    if(dd<10) {
        dd = '0'+dd
    }

    if(mm<10) {
        mm = '0'+mm
    }

    today = yyyy + '-'  + mm +  '-' +dd;


    var fechaFin = moment(fechaCulminacion);
    var fechaActual = moment(today);

    var diasrestantes = fechaFin.diff(fechaActual, 'days');
    var horasRestantes = horaCulminacion - hourToday;

    if(horaCulminacion - hourToday  < 0 ){

          horasRestantes = (horaCulminacion - hourToday) + 24;
          diasrestantes = diasrestantes - 1;

    }else{

        horasRestantes = horaCulminacion - hourToday;

    }
    if (diasrestantes>=0){
return ("Faltan" + " " + diasrestantes + " " + "dias," + " " + horasRestantes + " " + "horas."  );
}
else{
  return("la tarea ya expiro");

}
}


function verDetallesTarea(id_curso){
           $.ajax({
    
              url:   'http://localhost:3000/tareas/verTarea/'+id_curso,
              type:  'GET',
      
              success:  function (r)
              {
           location.href='detalleTarea.html';


              },
              error: function(e)
             {
                    alert('Ocurrio un error en el servidor ..'+e);
                                console.log(JSON.stringify(e));

                  //materias.attr('disabled', false);
              }
          });
}

function listarTareasGrado(id_curso){
            $.ajax({
    
              url:   'http://localhost:3000/estudiantes/iniciarSesion/'+id_curso,
              type:  'GET',
      
              success:  function (r)
              {
              $.ajax({
    
              url:   'http://localhost:3000/estudiantes/buscar/'+id_curso,
              type:  'GET',
      
              success:  function (r)
              {
              realizarPeticion("http://localhost:3000/tareas/"+ r["data"][0]["id"],"GET","");
              $("#nombre").append(r["data"][0]["nombre"]);

              },
              error: function(e)
             {
                    alert('Ocurrio un error en el servidor ..'+e);
                                console.log(JSON.stringify(e));

                  //materias.attr('disabled', false);
              }
          });

              },
              error: function(e)
             {
                    alert('Ocurrio un error en el servidor ..'+e);
                                console.log(JSON.stringify(e));

                  //materias.attr('disabled', false);
              }
          });





 // realizarPeticion("http://localhost:3000/tareas/"+ id_curso,"GET","");

}



}).resize();
