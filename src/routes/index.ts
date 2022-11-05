import { Router, Request, Response} from 'express';

export const router = Router();

router.get('/health', (req: Request, res: Response) => {
    return res.send('Resume Service is Running!');
});

router.get('/*', (req: Request, res: Response) => {
    return res.status(404).send('Invalid Path');
});
