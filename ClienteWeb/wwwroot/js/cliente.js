var datatable;

$(document).ready(function () {
    loadDataTables();
    var id = document.getElementById("clienteId");


    if (id.value > 0) {
        $('#myModal').modal("show");
    }
});

function limpiar() {
    var clienteId = $('#clienteId').val();
    var clienteNombres = document.getElementById("clienteNombres");
    var clienteApellidos = document.getElementById("clienteApellidos");
    var clienteDireccion = document.getElementById("clienteDireccion");
    var clienteTelefono = document.getElementById("clienteTelefono");
    var clienteEstado = document.getElementById("clienteEstado");

    clienteId.value = 0;
    clienteNombres.value = "";
    clienteApellidos.value = "";
    clienteDireccion.value = "";
    clienteTelefono.value = "";
    clienteEstado.value = 0;
}

function loadDataTables() {
    datatable = $('#tblData').DataTable({
        "ajax": {
            "url": "/cliente/obtenerTodos"
        },
        "columns": [
            { "data": "nombres", "width": "20%" },
            { "data": "apellidos", "width": "20%" },
            { "data": "direccion", "width": "20%" },
            { "data": "telefono", "width": "20%" },
            {
                "data": "estado",
                "render": function (data) {
                    if (data)
                        return "Active";
                    else
                        return "Inactive";
                },
                "width": "20%"
            },
            {
                "data": "id",
                "render": function (data) {
                    return `<div style="width: 167px;">
                              <a href="/Cliente/Crear/${data}" class="btn btn-success text-white" style="cursor:pointer;">Update</a>
                              <a onclick=Delete("/Cliente/Delete/${data}") class="btn btn-danger text-white" style="cursor:pointer;">Delete</a>
                            </div>`
                }
            }
        ]
    });
}

function Delete(url) {
    swal({
        title: "Are you sure you want to delete this customer?",
        text: "Customer will not be avaible",
        icon: "warning",
        buttons: true
    }).then((borrar) => {
        if (borrar) {
            $.ajax({
                type: "DELETE",
                url: url,
                success: function (data) {
                    if (data.success) {
                        swal("Delete!", data.message, "success");
                        datatable.ajax.reload();
                    }
                    else {
                        swal("Good job!", data.message, "error");
                        $('#myModalPractice').modal("show");
                    }
                }
            });
        }
    });
}





//************PRACTICA***************
$(document).ready(function () {
    $('#frmFormulario').submit(function (e) {
        
        e.preventDefault();

        var datastring = $("#frmFormulario").serialize();

        var data2 = $("#frmFormulario").serializeArray();

        var myjson = {};
        $.each(data2, function(i, v) {
            myjson[v.name] = v.value;
        });

        if ($("#frmFormulario").valid()) {
            $.ajax({
                type: "POST",
                url: "/cliente/crear2",
                data: { cliente: myjson},
                success: function (data) {
                    if (data.success) {
                        swal("Save", data.message, "success");
                        $("#frmFormulario").trigger("reset"); //Limpiar formulario
                        datatable.ajax.reload(); //Cargar el datatable nuevamente para mostrar el registro guardado
                        $('#myModalPractice').modal("hide");
                    }
                    else {
                        swal("Oop!", data.message, "error");

                    }
                }
            });

        } else {
            swal("Info!", "Complete the form", "info");
        }
    });
});
