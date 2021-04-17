const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');


router.get('/add',isLoggedIn, (req, res) => {
	res.render('links/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
	const { fullname, cedula, telefono, cantidad, semanas, fecha, cantidadpagada, cantidadnopagada, pagoporsemanas, semanaspagadas, semanasnopagadas, totalpagar, abono, ultimopago, semanasatrasadas } = req.body;
	const newCustomer = {
		fullname,
		cedula,
		telefono,
		cantidad,
		semanas,
		fecha,
		cantidadpagada,
		cantidadnopagada,
		pagoporsemanas,
		semanaspagadas,
		semanasnopagadas, 
		totalpagar,
		abono,
		ultimopago,
		semanasatrasadas,
		user_id: req.user.id
	};
	await pool.query('INSERT INTO customers set ?', [newCustomer]);
	req.flash('success', 'Cliente agregado exitosamente!');
	res.redirect('/links');
});

router.get('/inversion', async (req, res) => {
	const inversion = await pool.query('SELECT SUM(cantidad) AS cantidad, SUM(totalpagar) AS total, COUNT(fullname) AS clientes, SUM(cantidadpagada) AS cantidadpagada, SUM(totalpagar) - SUM(cantidad) AS interes, SUM(totalpagar) - SUM(cantidadpagada) AS pendiente FROM customers WHERE user_id = ?', [req.user.id]);
	console.log(inversion)

	res.render('links/inversion', { inversion });
});

router.get('/semanas', async (req, res) => {
	const update = await pool.query('select * from customers where ultimopago >(current_timestamp() - interval 7 day) user_id = ?', [req.user.id]);
	res.render('links/semanas', { update });
	
});

router.get('/', isLoggedIn, async (req, res) => {
	const clientes = await pool.query('SELECT *  FROM customers WHERE user_id = ?', [req.user.id]);
	res.render('links/list', { clientes });
});

router.get('/delete/:id',  isLoggedIn, async(req, res) => {
	const { id } = req.params;
	await pool.query('DELETE FROM customers WHERE ID = ?', [id]);
	req.flash('success', 'Cliente eliminado exitosamente!');
	res.redirect('/links');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
	const { id } = req.params;
	const customers = await pool.query('SELECT id as id, fullname as fullname, cedula as cedula, telefono as telefono, cantidad as cantidad, semanas as semanas, DATE_FORMAT(fecha, "%d.%m.%Y") as fecha, cantidadpagada as cantidadpagada, cantidadnopagada as cantidadnopagada, pagoporsemanas as pagoporsemanas, semanaspagadas as semanaspagadas,semanasnopagadas as semanasnopagadas,totalpagar as totalpagar,abono as abono, DATE_FORMAT(ultimopago, "%d.%m.%Y") as ultimopago, semanasatrasadas as semanasatrasadas FROM customers WHERE id = ?', [id]);
	console.log(customers[0]);
	res.render('links/edit',{customers:customers[0]});
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
	const { id } = req.params;
	const { fullname, cedula, telefono, cantidad, semanas, fecha, cantidadpagada, cantidadnopagada, pagoporsemanas, semanaspagadas, semanasnopagadas, totalpagar, abono, ultimopago, semanasatrasadas } = req.body;
	const newCliente = {
		fullname,
		cedula,
		telefono,
		cantidad,
		semanas,
		fecha,
		cantidadpagada,
		cantidadnopagada,
		pagoporsemanas,
		semanaspagadas,
		semanasnopagadas,
		totalpagar,
		abono,
		ultimopago,
		semanasatrasadas
	};
	console.log(newCliente);
	await pool.query('UPDATE customers set ? WHERE id = ?', [newCliente, id]);
	req.flash('success', 'Informacion editada exitosamente!');
	res.redirect('/links');

});

module.exports = router;