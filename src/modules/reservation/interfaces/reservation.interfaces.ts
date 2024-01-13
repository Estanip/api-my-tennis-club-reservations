import { Document } from 'mongoose';
import { Player } from '../entities/player.entity';
import { CourtNumbers } from 'src/modules/court/entities/court.entity';

export interface IReservation {
    date: Date;
    from: string;
    to: string;
    court: CourtNumbers;
    players: Player[];
    total_price: number;
}

export interface IReservationAttributes extends Document {
    _id: string;
    date: Date;
    from: string;
    to: string;
    court: CourtNumbers;
    players: Player[];
    total_price: number;
}

export interface IReservationDocument extends IReservationAttributes {}

export type TReservationCollection = IReservationDocument[];