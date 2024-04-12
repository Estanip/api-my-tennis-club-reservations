import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CONFIG } from 'src/shared/Config/configuration';
import { CourtRepository } from '../court/court.repository';
import { CourtSchema, courtSchema } from '../court/schemas';
import { PricingRepository } from '../pricing/pricing.repository';
import { PricingSchema, pricingSchema } from '../pricing/schemas';
import { UserSchema, userSchema } from '../users/schemas';
import { UserRepository } from '../users/user.repository';
import { ReservationController } from './reservation.controller';
import { ReservationRepository } from './reservation.repository';
import { ReservationService } from './reservation.service';
import { ReservationSchema, reservationSchema } from './schemas';
import { ReservationSetter } from './utils/setters';
import { ReservationValidator } from './utils/validators';

@Module({
    imports: [
        MongooseModule.forFeatureAsync(
            [
                {
                    name: ReservationSchema.name,
                    collection: CONFIG.models.RESERVATIONS,
                    useFactory: () => reservationSchema,
                },
                {
                    name: UserSchema.name,
                    collection: CONFIG.models.USERS,
                    useFactory: () => userSchema,
                },
                {
                    name: PricingSchema.name,
                    collection: CONFIG.models.PRICING,
                    useFactory: () => pricingSchema,
                },
                {
                    name: CourtSchema.name,
                    collection: CONFIG.models.COURTS,
                    useFactory: () => courtSchema,
                },
            ],
            CONFIG.db.name,
        ),
    ],
    controllers: [ReservationController],
    providers: [
        ReservationService,
        ReservationRepository,
        ReservationValidator,
        ReservationSetter,
        CourtRepository,
        UserRepository,
        PricingRepository,
    ],
})
export class ReservationModule {}
