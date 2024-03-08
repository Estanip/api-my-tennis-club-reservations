import dotenv from 'dotenv';
dotenv.config();

const {
    ENVIRONMENT,
    PORT,
    JWT_EXPIRE,
    JWT_SECRET,
    IS_PUBLIC_KEY,
    MONGO_DB_NAME_PROD,
    MONGO_HOST_PROD,
    MONGO_HOST_DEV,
    MONGO_DB_NAME_DEV,
    USERS,
    MEMBERS,
    COURTS,
    MEMBERSHIP_TYPES,
    PRICING,
    RESERVATIONS,
    SOCIO_DATA,
    NO_SOCIO_DATA,
    ABONADO_DATA,
    COURT_1,
    COURT_2,
    COURT_3,
    COURT_4,
    COURT_5,
} = process.env;

export const membership_run_data = [
    JSON.parse(ABONADO_DATA),
    JSON.parse(SOCIO_DATA),
    JSON.parse(NO_SOCIO_DATA),
];

export const courts_run_data = [
    JSON.parse(COURT_1),
    JSON.parse(COURT_2),
    JSON.parse(COURT_3),
    JSON.parse(COURT_4),
    JSON.parse(COURT_5),
];

export const is_public = IS_PUBLIC_KEY;
export const database_uri =
    ENVIRONMENT === 'development'
        ? `${MONGO_HOST_DEV}/${MONGO_DB_NAME_DEV}`
        : `${MONGO_HOST_PROD}/${MONGO_DB_NAME_PROD}`;
export const database_name = ENVIRONMENT === 'development' ? MONGO_DB_NAME_DEV : MONGO_DB_NAME_PROD;
export const models = {
    USERS,
    MEMBERS,
    COURTS,
    MEMBERSHIP_TYPES,
    PRICING,
    RESERVATIONS,
};
export default () => ({
    db: {
        host: ENVIRONMENT === 'development' ? MONGO_HOST_DEV : MONGO_HOST_PROD,
        name: ENVIRONMENT === 'development' ? MONGO_DB_NAME_DEV : MONGO_DB_NAME_PROD,
        uri:
            ENVIRONMENT === 'development'
                ? `${MONGO_HOST_DEV}/${MONGO_DB_NAME_DEV}`
                : `${MONGO_HOST_PROD}/${MONGO_DB_NAME_PROD}`,
    },
    env: ENVIRONMENT,
    isPublic: IS_PUBLIC_KEY,
    jwt: {
        expires: JWT_EXPIRE,
        secret: JWT_SECRET,
    },
    port: parseInt(PORT, 10) || 3012,
});
