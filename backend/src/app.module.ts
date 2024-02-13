import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LessonModule } from './lesson/lesson.module';
import { UploadModule } from './upload/upload.module';
import { AssessmentModule } from './assessment/assessment.module';
import { QuestModule } from './quest/quest.module';
import { PronouceScoreModule } from './pronouce-score/pronouce-score.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../upload'),
      serveRoot: '/upload/',
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    UserModule,
    AuthModule,
    LessonModule,
    UploadModule,
    AssessmentModule,
    QuestModule,
    PronouceScoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
