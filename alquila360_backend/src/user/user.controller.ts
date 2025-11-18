import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "src/entity/user.entity";

@Controller('/user')
export class UserController {
    constructor(private readonly userService: UserService) {

    }

    @Post()
    createUser(@Body() user: User) {
        return this.userService.createUser(user)
    }

    @Get()
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get('/:id')
    getUserByID(@Param() param: any) {
        return this.userService.getUserById(param.id);
    }

    @Put('/:id')
    updateUser(@Param() param: any, @Body() user: User) {
        return this.userService.updateUser(param.id, user);
    }

    @Delete('/:id')
    deleteUser(@Param() param: any) {
        return this.userService.deleteUser(param.id);
    }
}
