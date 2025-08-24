import { DynamicModule, Module } from '@nestjs/common';
import { EnvConfigService } from './env-config.service';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { join } from 'node:path';

@Module({
  providers: [EnvConfigService],
  exports: [EnvConfigService],
})
export class EnvConfigModule {
  static forRoot(options: ConfigModuleOptions = {}): DynamicModule {
    const nodeEnv = process.env.NODE_ENV || 'development';
    const envFilePath = join(__dirname, `../../../../.env.${nodeEnv}`);

    return {
      module: EnvConfigModule,
      imports: [
        ConfigModule.forRoot({
          ...options,
          envFilePath: [envFilePath],
        }),
      ],
    };
  }
}
