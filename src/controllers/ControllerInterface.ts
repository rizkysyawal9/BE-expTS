import { Response, Request } from 'express'

interface ControllerInterface {
    index?(req: Request, res: Response ): Response;
    create?(req: Request, res: Response ): Response;
    read?(req: Request, res: Response ): Response;
    update?(req: Request, res: Response ): Response;
    delete?(req: Request, res: Response ): Response;
}

export default ControllerInterface