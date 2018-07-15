

$(document).ready(function() {

var id_Estudiante="";
   var id_Tarea="";
   getEstudiante();
  asignarid_Tarea();



  $("#btnComentario").click(function() {
  comentario=document.getElementById("comentario");
  hacerComentario(comentario.value);
  comentario.value="";
  verDetalleTarea();
});


function hacerComentario(comentario)
{
if(comentario!=""){
   datos={};

      datos.comentario=comentario;
      datos.id_tarea=id_Tarea;
      datos.id_estudiante=id_Estudiante;
  
 $.ajax({
    
              url:   'http://localhost:3000/comentarios/crear',
              type:  'POST',
              data:datos,

              success:  function (r)
              {
                  

              },
              error: function(e)
             {
                    alert('Ocurrio un error en el servidor ..'+e);
                                console.log(JSON.stringify(e));

                  //materias.attr('disabled', false);
              }
          });


}
else {
  alert("debe escribir un comentario")

}
}

function asignarid_Tarea(){
  $.ajax({
    
              url:   'http://localhost:3000/tareas/detalleTarea',
              type:  'GET',

              success:  function (r)
              {
                  id_Tarea= r["id"];
                   verDetalleTarea();

              },
              error: function(e)
             {
                    alert('Ocurrio un error en el servidor ..'+e);
                                console.log(JSON.stringify(e));

                  //materias.attr('disabled', false);
              }
          });
}
      function verDetalleTarea(){
                  titulo= $("#titulo");
                  descripcion= $("#descripcion");
                  tema= $("#tema");
                  grado= $("#grado");
                  materia= $("#materia");
                  fecha= $("#fecha");
                  logros= $("#logros");
                  archivo= $("#archivo");
           $.ajax({
            
              url:   'http://localhost:3000/tareas/detalleTareaId/'+id_Tarea,
              type:  'GET',
      
              success:  function (a)
              {
                 titulo.append(a["data"][0]["titulo"]);
                 descripcion.append(a["data"][0]["descripcion"]);
                 tema.append(a["data"][0]["tmTitulo"]+" ------ "+a["data"][0]["tmDescipcion"]);
                 grado.append(a["data"][0]["grado"]);
                 materia.append(a["data"][0]["materia"]);
                 fecha.append(a["data"][0]["fecha"]);
                 logros.append(a["data"][0]["logros"]);
                 if (a["data"][0]["archivo"]!=""){
                 archivo.append("<a  href= 'http://localhost:8082/SCALEND-DEFINITIVO-master/Servidor/public/archivos/"+a["data"][0]["archivo"]+"'> Archivo Adjunto </a>");
        }
      else
      {
               archivo.append("no hay archivo adjunto");
      }

                  cargarComentarios();


              },
              error: function(e)
             {
                    alert('Ocurrio un error en el servidor ..'+e);
                                console.log(JSON.stringify(e));

                  //materias.attr('disabled', false);
              }
          });

              }


              function getEstudiante(){
                      $.ajax({
    
              url:   'http://localhost:3000/estudiantes/getSesion',
              type:  'GET',
      
              success:  function (r)
              {
                  console.log("get"+r["id"]);
                  id_Estudiante=r["id"];
              },
              error: function(e)
             {
                    alert('Ocurrio un error en el servidor ..'+e);
                                console.log(JSON.stringify(e));

                  //materias.attr('disabled', false);
              }
          });

}
      

function cargarComentarios(){

              $.ajax({
              url:   'http://localhost:3000/comentarios/'+id_Tarea,
              type:  'GET',
              success:  function (datos)
              {

                   for (i in datos["data"])
            {  // if (datos[i].estado=="Activo") {continue};

               var elementotr=document.createElement('tr');



                  var elementotd=document.createElement('td');
                elementotr.appendChild(elementotd);
                  var texto=document.createTextNode(datos["data"][i]["nombre"]);
                    elementotd.appendChild(texto);


                var elementotd=document.createElement('td');
                elementotr.appendChild(elementotd);
                  var texto=document.createTextNode(datos["data"][i]["comentario"]);
                    elementotd.appendChild(texto);




                   var obj=$('#listaComentarios');

                    obj.append(elementotr);
                  }
              },
              error: function(e)
             {
                    alert('Ocurrio un error en el servidor ..'+e);
                                console.log(JSON.stringify(e));

                  //materias.attr('disabled', false);
              }
          });

      }
});