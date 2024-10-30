import { SetMetadata } from '@nestjs/common';

//Este código utiliza SetMetadata de NestJS para establecer un valor de metadata en las rutas
//donde se aplique el decorador @Public(). La clave IS_PUBLIC_KEY se utilizará para
//verificar si una ruta es pública en el guardia de autenticación.

// Define una clave para identificar las rutas públicas
export const IS_PUBLIC_KEY = 'isPublic';

// Crea el decorador @Public() usando SetMetadata
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
