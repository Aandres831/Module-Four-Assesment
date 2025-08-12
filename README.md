# Bank Account Management System 

## Description

This system allows ExpertSoft to manage an electrical company, users and transactions and invoices in the same database. Includes CRUD functionality for users, and a user-friendly web interface. The project is modularized to facilitate its adaptation to other contexts or institutions.

---

## Execution Instructions

1. **Clone the repository** 
```
bash git clone (https://github.com/Aandres831/Module-Four-Assesment.git) 
```


2. **Install backend dependencies** 

```bash cd server 
   npm install 
```


3. **Configure the database** - 
```
Creates the MySQL database according to the MER diagram. - Adjust the connection data in 'server/connection_db.js' if necessary.
```

4. **Load initial data**
   ```bash
   node server/seeders/run_seeders.js
   ```

5. **Starts the server**
   ```bash
   node server/index.js
   ```

6. **Opens the web interface**
    ```bash
   npm run dev
   ```

---

## Technologies used 
- **Backend:** Node.js, Express, MySQL 
- **Frontend:** HTML5, CSS3, Bootstrap 5, JavaScript (ES6)
- **Database:** MySQL 
- **Other:** Fetch API, route modularization and logic



---

## Information from the Coder

- **Name:** Andrés Severino Isaza
- **Clan:** Lovelace
- **Email:** andresseverino646@gmail.com
- **ID:** 1000307252

---

## Diagrama MER

![Diagrama MER](./docs/MER_Module4.drawio.png)
> El diagrama MER se encuentra en la carpeta `docs` como imagen.

---

## Código Fuente Organizado

```
ExpertSoft/
│
├── app/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── user.js
│   └── ...
│
├── server/
│   ├── conexion_db.js
│   ├── index.js
│   ├── prestamos.js
│   ├── usuarios.js
│   ├── libros.js
|   └── data/ 
|       ├── invoices.csv
|       ├── transactions.csv
|       ├── users.csv
│   └── seeders/
│       ├── load_invoices
│       ├── load_transactions.js
│       ├── load_usuarios.js
│       └── run_seeders.js
│
├── index.html
├── users.html
├── README.md
└── docs/
    └── diagrama_mer.png
```

---
## Los querys utilizados fueron

```
CREATE DATABASE pd_Andres_severino_lovelace;
USE pd_Andres_severino_lovelace;

CREATE TABLE users (
	user_id int AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    identification VARCHAR(120) UNIQUE,
	address VARCHAR(120),
    cellphonne_number VARCHAR(100),
    email VARCHAR(150) UNIQUE
);


CREATE TABLE invoices(
	invoice_id INT AUTO_INCREMENT PRIMARY KEY,
    number_bill VARCHAR (100) NOT NULL,
    billing_period VARCHAR(60),
    billed_amount DECIMAL,
    amount_paid DECIMAL,
    user_id INT,
    FOREIGN KEY (user_id ) REFERENCES users(user_id)
);

CREATE TABLE transactions (
	transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    number_transaction VARCHAR(100),
    date_transaction VARCHAR (70),
    transaction_value DECIMAL,
    transaction_state ENUM ('Pendiente', 'Fallida', 'Completada'),
    transaction_type VARCHAR (100),
    platform ENUM( 'Nequi', 'Davivienda'),
    user_id INT,
    invoice_id INT,
    FOREIGN KEY (user_id ) REFERENCES users(user_id),
    FOREIGN KEY (invoice_id ) REFERENCES invoices(invoice_id)
);
DELETE  FROM users;
ALTER TABLE users MODIFY name VARCHAR(150) DEFAULT 0;   

SELECT * FROM users;
SELECT * FROM transactions;
SELECT * FROM invoices;
```
El archivo .SQL utilizado para la carga de la base de datos se encuentra en la carpeta `docs` bajo el nombre `pd_Andres_severino_lovelace.sql`.

---

---

## Archivo Excel Original

El archivo Excel utilizado para la carga inicial de datos se encuentra en la carpeta `docs` bajo el nombre `datos_originales.xlsx`.

---
