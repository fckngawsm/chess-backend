import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "chat-postgres", // Используем имя контейнера PostgreSQL из docker-compose.yml
      port: 5433, // Порт, на котором запущен PostgreSQL в контейнере
      username: "postgres",
      password: "kirill",
      database: "chat",
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
