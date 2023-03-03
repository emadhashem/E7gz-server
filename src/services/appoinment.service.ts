import { Appoinment } from "../entities/appoinment.entity"
import { createNewAppionmentInputType } from "../schemas/appoinment.schema"
import AppError from "../utils/appError"
import { AppDataSource } from "../utils/data-source"
import { findUserById } from "./user.service"

const appionmentRepo = AppDataSource.getRepository(Appoinment)

interface IcreateNewAppionment extends createNewAppionmentInputType {
    admin: string
}

export const createNewAppionment = async (appionment: IcreateNewAppionment) => {

    const overlap = await checkForOverlap(appionment.start, appionment.end)
    if (overlap) {
        throw new AppError(400, 'this appionment is overlaping with other appionments')
    }
    const admin = await findUserById(appionment.admin)
    const newAppionment = appionmentRepo.create({
        ...appionment,
        admin
    })
    return await newAppionment.save()
}
export const findAppoinmentById = async (appionment_id: string) => {
    return appionmentRepo.findOneBy({ id: appionment_id })
}

export const checkForOverlap = async (start: string, end: string) => {
    return await appionmentRepo
        .createQueryBuilder('appionment')
        .where('appionment.start >= :start AND appionment.start <= :end', {
            start: start, end: end
        })
        .orWhere('appionment.end >= :_start AND appionment.end <= :_end', {
            _start: start, _end: end
        })
        .getOne()
}