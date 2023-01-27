import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
  } from "@nestjs/common";
  import { InjectRepository } from "@nestjs/typeorm";
  import { HttpResponse } from "src/utils";
  import { Repository } from "typeorm";
import { User } from "../models/auth.entity";
  
  @Injectable()
  export class AuthService {
    constructor(
      @InjectRepository(User)
      private usersRepository: Repository<User>
    ) {}
    async getUserById(id: number) {
      try {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) {
          return new NotFoundException("User not found").getResponse();
        }
  
        return new HttpResponse(
          "Get User by id",
          user,
          "Get User",
          null,
          null,
          null
        );
      } catch (error) {
        throw new Error(error);
      }
    }
  
    async createUser(user) {

      const getUser = await this.usersRepository.findOne({
        where: { email: user.email },
      });
      if (getUser) {
        throw new HttpException("User already exist", HttpStatus.CONFLICT);
      }
      user.isDeleted=false;
      const newUser = this.usersRepository.create(user)
      const data = await this.usersRepository.save(newUser);
      return new HttpResponse(
        "Create user",
        data,
        "create user",
        null,
        null,
        null
      );
    }
    async getUsers(query, projections, options, sort) {
      console.log(query);
      const totalResult = await this.usersRepository.count({});
      const data = await this.usersRepository.find({
        select: ["id", "email", "typeOfLogin","isDeleted", "created_at","updated_at"],
        where: query,
        order: sort,
        skip: options.pageNo * options.limit,
        take: options.limit,
      });
      return new HttpResponse(
        "Get all users",
        data,
        "Get all users",
        null,
        totalResult,
        options.pageNo
      );
    }
  
    async updateUser(id: number, user: any) {
      const getUser = await this.usersRepository.findOne({
        where: { id },
      });
      if (!getUser) {
        return new NotFoundException("User not found").getResponse();
      }
      const data = await this.usersRepository.update(id, user);
      return new HttpResponse(
        "update user",
        data,
        "update user",
        null,
        null,
        null
      );
    }
    async deleteUser(id: number) {
      const data = await this.usersRepository.delete(id);
      return new HttpResponse(
        "delete user",
        data,
        "delete user",
        null,
        null,
        null
      );
    }
  }
  