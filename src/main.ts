import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	//activar validacion de class-validator
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
		}),
	);

	//Swager
	const config = new DocumentBuilder()
		.setTitle('Shop Management')
		.setDescription('The Shop API description')
		.setVersion('1.0')
		.addBearerAuth(
			{
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
			},
			'jwt', // Este es el nombre que usaremos para referenciar el esquema de seguridad
		)
		.build();

	const document = SwaggerModule.createDocument(app, config);

	// Configuración para que el esquema de autenticación se aplique a todas las rutas automáticamente.
	document.paths = Object.keys(document.paths).reduce((paths, path) => {
		const pathItem = document.paths[path];
		const methods = Object.keys(pathItem);

		methods.forEach(method => {
			pathItem[method] = {
				...pathItem[method],
				security: [{ jwt: [] }],
			};
		});

		paths[path] = pathItem;
		return paths;
	}, {});
	SwaggerModule.setup('api', app, document);
	// --

	//Cors
	app.enableCors();

	await app.listen(3000);
}
bootstrap();
