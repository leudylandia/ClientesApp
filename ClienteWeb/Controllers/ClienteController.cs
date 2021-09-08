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

        public IActionResult Crear()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Crear(Cliente cliente)
        {
            if (ModelState.IsValid)
            {
                await _db.AddAsync(cliente);
                await _db.SaveChangesAsync();

                return RedirectToAction(nameof(Crear));
            }

            return View(cliente);
        }

        public async Task<IActionResult> ObtenerTodos()
        {
            var todos = await _db.Cliente.ToListAsync();

            return Json(new { data = todos });
        }
    }
}
