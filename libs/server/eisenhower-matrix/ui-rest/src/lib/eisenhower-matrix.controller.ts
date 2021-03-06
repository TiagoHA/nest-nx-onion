import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  AddTaskCommand,
  EisenhowerMatrixFacade,
  GetUserEisenhowerMatrixQuery,
  GetUserQueryReadModel
} from '@todo-app/server/eisenhower-matrix/core/application-services';
import { AddTaskDto } from './dtos/add-task.dto';

@Controller('eisenhower-matrix')
export class EisenhowerMatrixController {
  constructor(private facade: EisenhowerMatrixFacade) {}

  @Get(':userId')
  getUserMatrix(
    @Param('userId') userId: string
  ): Promise<GetUserQueryReadModel> {
    return this.facade.getUserEisenhowerMatrix(
      new GetUserEisenhowerMatrixQuery(userId)
    );
  }

  @Post()
  createMatrix(@Body() body: AddTaskDto): Promise<void> {
    return this.facade.addTask(
      new AddTaskCommand(body.title, body.urgent, body.important, body.userId)
    );
  }
}
