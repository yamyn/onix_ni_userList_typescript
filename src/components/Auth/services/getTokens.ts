import * as jwt from 'jsonwebtoken';
import app from '../../../server/server';
import { IAdminModel } from '../model';
import AdminService from './service';

export interface ITokens {
    accesToken: string;
    refreshToken: string;
}

export interface ITokenInfo {
    email: string;
    iat: number;
    exp: number;
}

export async function generateTokens(admin: IAdminModel): Promise<ITokens> {
    const accesToken: string = jwt.sign(
        { email: admin.email },
        app.get('secret'),
        {
            expiresIn: '5m',
        },
    );
    const refreshToken: string = jwt.sign(
        { email: admin.email },
        app.get('secret'),
        {
            expiresIn: '3d',
        },
    );

    await AdminService.updateRefresh(admin.id, refreshToken);

    return {
        accesToken,
        refreshToken,
    };
}

export function checkRefresh(token: string): ITokenInfo | null {
    try {
        const admin: any = jwt.verify(token, app.get('secret'));

        return admin;
    } catch (error) {
        return null;
    }
}
