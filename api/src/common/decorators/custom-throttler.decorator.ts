/* eslint-disable prettier/prettier */
//src/common/decorators/custom-throttler.decorator.ts
//Custom throttle config

import { Throttle } from "@nestjs/throttler"

//Strict rate for auth, payments
export const StrictThrottle = () =>
    Throttle({
        default: {
            ttl: 1000,
            limit: 3,
        }
    })

//Moderate rate for orders
export const ModerateThrottle = () =>
    Throttle({
        default: {
            ttl: 1000, // 1000 milidetik = 1 detik
            limit: 5,  // maksimal 5 klik Execute, per 1 detik
        }
    })

//Relaxed rate for read operations
export const RelaxedThrottle = () =>
    Throttle({
        default: {
            ttl: 1000,
            limit: 20,
        }
    })