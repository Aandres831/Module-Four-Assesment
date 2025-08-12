import express from "express";
// import prestamosRouter from "./prestamos.js";
import usersRouter from "./users.js"
import cors from "cors"
// import librosRouter from "./libros.js";




const app = express();
app.use(cors());
app.use(express.json());



app.get("/", async (req, res) => {
  res.send("Server online");
});

// app.use("/prestamos", prestamosRouter);
app.use("/users", usersRouter);
// app.use("/libros", librosRouter);

app.listen(3006, () => {
  console.log("el servidor iniciado y corriendo en http://localhost:3006");
});