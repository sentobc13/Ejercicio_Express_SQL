const express = require("express")
const app = express()
const mysql = require('mysql2');
const PORT = 3001

app.use(express.json())

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Sentoberlanga13!',
  database: "expressDB"
});

db.connect();

app.get('/createdb',(req,res)=>{
    let sql ='CREATE DATABASE expressDB';
    db.query(sql,(err,result)=>{
      if(err)throw err;
      console.log(result);
      res.send('Database created...')
    })
  })


app.get('/createproductstable', (req, res) => {
    let sql = 'CREATE TABLE products(id INT AUTO_INCREMENT, name_product VARCHAR(50), price FLOAT, PRIMARY KEY(id))'
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Products table created...')
    })
})

app.get('/createcategoriestable', (req, res) => {
    let sql = 'CREATE TABLE categories(id INT AUTO_INCREMENT, name_category VARCHAR(50), description VARCHAR(50),PRIMARY KEY(id))'
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Categories table created...')
    })
})

app.get('/createcategoriesproductstable', (req, res) => {
    let sql = 'CREATE TABLE productoscategorias(id INT AUTO_INCREMENT, product_id INT, category_id INT, PRIMARY KEY(id), FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE, FOREIGN KEY(category_id) REFERENCES categories(id))'
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts table created...')
    })
})
      

app.listen(PORT, () => console.log(`Servidor levantado en el puerto ${PORT}`));