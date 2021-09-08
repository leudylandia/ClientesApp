var datatable;

$(document).ready(function () {
    loadDataTables();
});

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
            }
        ]
    });
}