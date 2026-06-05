import { Injectable } from '@nestjs/common';

import { InferenceResultEntity } from '../../domain/entities/inference-result.entity';
import { InferenceEngineService } from '../services/inference-engine.service';

@Injectable()
export class ProcessValidationUseCase {
  constructor(private readonly inferenceEngineService: InferenceEngineService) {}

  execute(validationProcessId: string): Promise<InferenceResultEntity> {
    return this.inferenceEngineService.process(validationProcessId);
  }
}
