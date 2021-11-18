import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Resenha from 'App/Models/Resenha'
import StoreResenhaValidator from 'App/Validators/StoreResenhaValidator'

export default class ResenhaController {
  public async index({ }: HttpContextContract) {
    const resenhaDB = await Resenha.all()
    return resenhaDB
  }

  public async store({ request, auth }: HttpContextContract) {
    const data = await request.validate(StoreResenhaValidator)
    const resenhaDB = await Resenha.create({ ...data, userId: auth.user?.id })
    return resenhaDB
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const resenhaDB = await Resenha.findOrFail(params.id)
      return resenhaDB
    } catch (error) {
      response.status(400).send("Resenha não encontrada!")
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    const { resenha } = await request.validate(StoreResenhaValidator)
    try {
      const resenhaDB = await Resenha.findOrFail(params.id)
      resenhaDB.resenha = resenha
      await resenhaDB.save()
      return resenhaDB

    } catch (error) {
      response.status(400).send("Resenha não encontrada!")
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const resenhaDB = await Resenha.findOrFail(params.id)
      await resenhaDB.delete()
      return resenhaDB
    } catch (error) {
      response.status(400).send("Resenha não encontrada!")
    }
  }
}