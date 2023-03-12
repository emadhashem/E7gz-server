import { Appoinment } from "../entities/appoinment.entity"
import { createNewAppoinmentInputType } from "../schemas/appoinment.schema"
import AppError from "../utils/appError"
import { AppDataSource } from "../utils/data-source"
import { findUserById } from "./user.service"

const appoinmentRepo = AppDataSource.getRepository(Appoinment)

interface IcreateNewappoinment extends createNewAppoinmentInputType {
    admin: string
}

export const createNewappoinment = async (appoinment: IcreateNewappoinment) => {

    const overlap = await checkForOverlap(appoinment.start, appoinment.end)
    if (overlap) {
        throw new AppError(400, 'this appoinment is overlaping with other appoinments')
    }
    const admin = await findUserById(appoinment.admin)
    const newappoinment = appoinmentRepo.create({
        ...appoinment,
        admin
    })
    return await newappoinment.save()
}
export const findAppoinmentById = async (appoinment_id: string) => {
    return appoinmentRepo.findOneBy({ id: appoinment_id })
}

export const checkForOverlap = async (start: string, end: string) => {
    return await appoinmentRepo
        .createQueryBuilder('appoinment')
        .where('appoinment.start >= :start AND appoinment.start <= :end', {
            start: start, end: end
        })
        .orWhere('appoinment.end >= :_start AND appoinment.end <= :_end', {
            _start: start, _end: end
        })
        .getOne()
}

export const getAppoinmentsByTitle = async (title: string, admin: string) => {
    return await appoinmentRepo.createQueryBuilder('appoinment')
        .where('appoinment.title =:title AND appoinment.admin = :admin', {
            admin, title: title
        })
        .getMany()
}
export const deleteAppoinment = async (appoinment_id: string) => {
    return await appoinmentRepo.delete({ id: appoinment_id })
}

export const getAllAppoinments = async (admin: string) => {
    return await appoinmentRepo.createQueryBuilder('appoinment')
        .where('appoinment.admin = :admin', { admin })
        .select('appoinment.title AS title')
        .addSelect('COUNT(appoinment.title) AS count')
        .groupBy('appoinment.title')
        .getRawMany()


}