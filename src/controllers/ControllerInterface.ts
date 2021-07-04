import { Response, Request } from 'express'

interface ControllerInterface {
    index(req: Request, res: Response ): Response | Promise<Response>;
    create(req: Request, res: Response ): Response | Promise<Response>;
    read(req: Request, res: Response ): Response | Promise<Response>;
    update(req: Request, res: Response ): Response | Promise<Response>;
    delete(req: Request, res: Response ): Response | Promise<Response>;
}

export default ControllerInterface