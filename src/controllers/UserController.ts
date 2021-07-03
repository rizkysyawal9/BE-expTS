import ControllerInterface from "./ControllerInterface";
import { Request, Response } from 'express'

let data: any[] = [
    {id: 1, name: "Odi"},
    {id: 2, name: "Idi"},
    {id: 3, name: "Ebi"},
]

class UserControllers implements ControllerInterface {
    index(req:Request, res:Response): Response{
        return res.send({
            success: true,
            data: data
        })
    }
    create(req:Request, res:Response): Response{
        const { id, name } = req.body
        data.push({
            id: parseInt(id),
            name: name
        })
        console.log(data)
        return res.send({
            success: true,
            message: "Data berhasil di input"
        });
    }
    read(req:Request, res:Response): Response{
        const { id } = req.params
        let user = data.find(item => item.id === parseInt(id))
        console.log(user)
        return res.send({
            success: true,
            data: user
        })
    }
    update(req:Request, res:Response): Response{
        const { id } = req.params
        const { name } = req.body
        let index = data.findIndex((item) => item.id === parseInt(id))
        data[index] = {
            ...data[index],
            name: name
        }
        return res.send({
            success: true, 
            message: "User berhasil diubah"
        });
    }
    delete(req:Request, res:Response): Response{
        const { id } = req.params
        let index = data.findIndex(item => item.id === parseInt(id))
        data.splice(index, 1)
        return res.status(200).json({
            success: true,
            message: 'User berhasil dihapus'
        })
    }
}

export default new UserControllers();