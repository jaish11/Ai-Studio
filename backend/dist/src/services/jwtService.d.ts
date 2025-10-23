import { Request, Response, NextFunction } from "express";
export declare function signToken(payload: object): string;
export declare function authenticate(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=jwtService.d.ts.map