import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UserController {
  // Listar todos os usuários
  async getAllUsers( res ) {
    try {
      const users = await UserModel.findAll();
      res.json(users);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      res.status(500).json({ error: "Erro ao listar usuários" });
    }
  }

  // Registrar novo usuário
  async register(req, res) {
    try {
      const { username, email, password, userType, profilePhoto, bio } = req.body;

      // Validação básica
      if ( !username || !email || !password || !userType || !profilePhoto || !bio ) {
        return res.status(400).json({
          error: "Os campos username, email, password, userType, profilePhoto e bio são obrigatórios!",
        });
      }

      // Verificar se o usuário já existe
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

      // Criar objeto do usuário
      const data = {
        username,
        email,
        password: hashedPassword,
        userType,
        profilePhoto,
        bio,
      };

      // Criar usuário
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
      const { email, password, username, userType, profilePhoto, bio } = req.body;

      // Validação básica
      if  ( !email || !password || !username || !userType || !profilePhoto || !bio ) {
        return res
          .status(400)
          .json({ error: "Os campos email, senha, username são obrigatórios!" });
      }

      // Verificar se o usuário existe
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
          id: userExists.id,
          username: userExists.username,
          email: userExists.email,
          password: userExists.password,
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

export default new UserController();
