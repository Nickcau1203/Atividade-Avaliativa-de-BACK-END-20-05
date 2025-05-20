import prisma from "../../prisma/prisma.js";

class ProfileModel {
  // Obter todos os profiles
  async findAll() {
    const profiles = await prisma.profile.findMany();

    return profiles;
  }

  // Obter um profile pelo email
  async findByEmail(email) {
    const profile = await prisma.profile.findUnique({
      where: {
        email,
      },
    });

    return profile;
  }

  // Obter um profile pelo username
  async findByProfilename(username) {
    const profile = await prisma.profile.findUnique({
      where: {
        username,
      },
    });

    return profile;
  }

  // Criar um novo profile
  async create(data) {
    const profile = await prisma.profile.create({
      data,
    });

    return profile;
  }

  // Atualizar um profile
  async update(id, data) {
    const profile = await prisma.profile.update({
      where: {
        id: Number(id),
      },
      data,
    });

    return profile;
  }

  // Excluir um profile
  async delete(id) {
    await prisma.profile.delete({
      where: {
        id: Number(id),
      },
    });

    return true;
  }
}

export default new ProfileModel();
