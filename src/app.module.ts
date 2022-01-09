import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { AdminControllerController } from './admin-controller/admin-controller.controller';

@Module({
  imports: [CatsModule],
  controllers: [AppController, AdminControllerController],
  providers: [AppService],
})
export class AppModule {}
