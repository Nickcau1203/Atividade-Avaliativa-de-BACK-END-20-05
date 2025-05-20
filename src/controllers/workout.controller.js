import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class WorkoutController {
  // Listar todos os workouts
  async getAllUsers( res ) {
    try {
      const users = await UserModel.findAll();
      res.json(users);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      res.status(500).json({ error: "Erro ao listar usuários" });
    }
  }

  // Registrar novo workout
  async register( res) {
    try {
      const { userId, title, type, duration, notes, location } = req.body;
      // Validação básica
      if ( !userId || !title || !type || !duration || !notes || !location ) {
        return res.status(400).json({
          error: "Os campos userId, title, type, duration, notes e location são obrigatórios!",
        });
      }

      // Verificar se o workout já existe
      const userEmailExists = await UserModel.findByEmail(email);
      if (userEmailExists) {
        return res.status(400).json({ error: "Este email já está em uso!" });
      }

      const userNameExists = await UserModel.findByUsername(username);
      if (userNameExists) {
        return res.status(400).json({ error: "Este username já está em uso!" });
      }

      // Hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Criar objeto do workout
      const data = {
        userId,
        title,
        type,
        duration,
        notes,
        location,
      };

      // Criar workout
      const user = await UserModel.create(data);

      return res.status(201).json({
        message: "Usuário criado com sucesso!",
        user,
      });
    } catch (error) {
      console.error("Erro ao criar um novo usuário: ", error);
      res.status(500).json({ error: "Erro ao criar um novo usuário" });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validação básica
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Os campos email e senha são obrigatórios!" });
      }

      // Verificar se o workout existe
      const userExists = await UserModel.findByEmail(email);
      if (!userExists) {
        return res.status(401).json({ error: "Credenciais inválidas!" });
      }

      // Verificar senha
      const isPasswordValid = await bcrypt.compare(
        password,
        userExists.password
      );
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Credenciais inválidas!" });
      }

      // Gerar Token JWT
      const token = jwt.sign(
        {
          userId: userExists.userId,
          userTitle: userExists.userTitle,
          userType: userExists.userType,
          userDuration: userExists.userDuration,
          userNotes: userExists.userNotes,
          userLocation: userExists.userLocation,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      return res.json({
        message: "Login realizado com sucesso!",
        token,
        userExists,
      });
    } catch (error) {
      console.error("Erro ao fazer login: ", error);
      res.status(500).json({ error: "Erro ao fazer login!" });
    }
  }
}

export default new WorkoutController();
