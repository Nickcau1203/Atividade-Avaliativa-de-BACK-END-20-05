import PostModel from "../models/post.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class PostController {
  // Listar todos os posts
  async getAllUsers( res ) {
    try {
      const posts = await PostModel.findAll();
      res.json(users);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      res.status(500).json({ error: "Erro ao listar usuários" });
    }
  }

  // Registrar novo post
  async register(req, res) {
    try {
      const { userId, content, type, visibility, workoutId, mediaUrl } = req.body;

      // Validação básica
      if (!userId || !content || !type || !visibility || !workoutId || !mediaUrl) {
        return res.status(400).json({
          error: "Os campos userId, content, type, visibility, workoutId e mediaUrl são obrigatórios!",
        });
      }

      // Verificar se o post já existe
      const userUserIdExists = await UserModel.findByUserId(userId);
      if (userUserIdExists) {
        return res.status(400).json({ error: "Este userId já está em uso!" });
      }

      const userContentExists = await UserModel.findByContent(content);
      if (userContentExists) {
        return res.status(400).json({ error: "Este content já está em uso!" });
      }

      // Hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Criar objeto do post
      const data = {
        id: userId,
        content,
        type,
        visibility,
        workoutId,
        mediaUrl,
      };

      // Criar post
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

      // Verificar se o post existe
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
          userId: userExists.userId,
          content: userExists.content,
          type: userExists.type,
          visibility: userExists.visibility,
          workoutId: userExists.workoutId,
          mediaUrl: userExists.mediaUrl,
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

export default new PostController();
