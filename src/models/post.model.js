import prisma from "../../prisma/prisma.js";

class PostModel {
  // Obter todos os posts
  async findAll() {
    const posts = await prisma.user.findMany();

    return posts;
  }

  // Obter um post pelo email
  async findByEmail(email) {
    const post = await prisma.post.findUnique({
      where: {
        email,
      },
    });

    return post;
  }

  // Obter um post pelo username
  async findByPostname(username) {
    const post = await prisma.post.findUnique({
      where: {
        username,
      },
    });

    return post;
  }

  // Criar um novo post
  async create(data) {
    const post = await prisma.post.create({
      data,
    });

    return post;
  }

  // Atualizar um post
  async update(id, data) {
    const post = await prisma.post.update({
      where: {
        id: Number(id),
      },
      data,
    });

    return post;
  }

  // Excluir um usuário
  async delete(id) {
    await prisma.post.delete({
      where: {
        id: Number(id),
      },
    });

    return true;
  }
}

export default new PostModel();
