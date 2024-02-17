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
      host: "db",
      port: 5432,
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
