using ClienteWeb.Data;
using ClienteWeb.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClienteWeb.Controllers
{
    public class ClienteController : Controller
    {
        private readonly ApplicationDbContext _db;

        public ClienteController(ApplicationDbContext db)
        {
            this._db = db;
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> Crear(int? id)
        {
            var cliente = new Cliente();

            if (id == null)
            {
                return View(cliente); //Mandamos nuestra variable inicializada para crear el cinete
            }
            else
            {
                cliente = await _db.Cliente.FindAsync(id);
                return View(cliente);
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Crear(Cliente cliente)
        {
            if (ModelState.IsValid)
            {
                if (cliente.Id == 0)
                {
                    await _db.AddAsync(cliente);
                    await _db.SaveChangesAsync();

                    return RedirectToAction(nameof(Crear));
                }
                else
                {
                    _db.Update(cliente);
                    await _db.SaveChangesAsync();

                    return RedirectToAction(nameof(Crear), new { id = 0});
                }
            }

            return View(cliente);
        }

        public async Task<IActionResult> ObtenerTodos()
        {
            var todos = await _db.Cliente.ToListAsync();

            return Json(new { data = todos });
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var cliente = await _db.Cliente.FindAsync(id);

            if (cliente == null)
            {
                return Json(new { success = false, message = "An error occurred while deleting" });
            }

            _db.Cliente.Remove(cliente);
            await _db.SaveChangesAsync();

            return Json(new { success = true, message = "Done!" });
        }



        //**********PRACTICA*************
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Crear2(Cliente cliente)
        {
            if (ModelState.IsValid)
            {
                if (cliente.Id == 0)
                {
                    await _db.AddAsync(cliente);
                    await _db.SaveChangesAsync();

                    return Json(new { success = true, message = "Customer Save!" });
                }
                else
                {
                    _db.Update(cliente);
                    await _db.SaveChangesAsync();

                    return Json(new { success = true, message = "Customer Update!" });
                }
            }

            return Json(new { success = false, message = "Something was wrong!!" });
        }
    }
}
