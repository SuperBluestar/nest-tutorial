import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { AdminControllerController } from './admin-controller/admin-controller.controller';

@Module({
  imports: [],
  controllers: [AppController, CatsController, AdminControllerController],
  providers: [AppService],
})
export class AppModule {}
