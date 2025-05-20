import prisma from "../../prisma/prisma.js";

class WorkoutModel {
  // Obter todos os workouts
  async findAll() {
    const workout = await prisma.workout.findMany();

    return workout;
  }

  // Obter um workout pelo email
  async findByEmail(email) {
    const workout = await prisma.workout.findUnique({
      where: {
        email,
      },
    });

    return workout;
  }

  // Obter um workout pelo username
  async findByWorkoutname(username) {
    const workout = await prisma.workout.findUnique({
      where: {
        username,
      },
    });

    return workout;
  }

  // Criar um novo workout
  async create(data) {
    const workout = await prisma.workout.create({
      data,
    });

    return workout;
  }

  // Atualizar um workout
  async update(id, data) {
    const workout = await prisma.workout.update({
      where: {
        id: Number(id),
      },
      data,
    });

    return workout;
  }

  // Excluir um workout
  async delete(id) {
    await prisma.workout.delete({
      where: {
        id: Number(id),
      },
    });

    return true;
  }
}

export default new WorkoutModel();
