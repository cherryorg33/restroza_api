// import { API_PREFIX } from "../shared/constants/global.constants";

import { Config } from "./config.interface";

export const GLOBAL_CONFIG: Config = {
  nest: {
    port: 3300,
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: "Nestjs Prisma Starter",
    description: "The nestjs API description",
    version: "1.5",
    path: "api/v1",
  },
  security: {
    expiresIn: 3600 * 24, // 24h
    bcryptSaltOrRound: 10,
  },
};
