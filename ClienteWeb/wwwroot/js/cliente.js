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
                    return `<div>
                              <a href="/Cliente/Crear/${data}" class="btn btn-success text-white" style="cursor:pointer;">Update</a>
                            </div>`
                },
                "width": "10%"
            }
        ]
    });
}