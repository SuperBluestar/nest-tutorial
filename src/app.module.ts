import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { AdminControllerController } from './admin-controller/admin-controller.controller';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [CatsModule],
  controllers: [AppController, AdminControllerController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('cats');
      // .forRoutes({ path: 'ab*cd', method: RequestMethod.ALL });
      // .forRoutes({ path: 'cats', method: RequestMethod.GET });
      // .forRoutes(CatsController);
  }
}
