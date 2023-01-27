import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
  } from "@nestjs/common";
import { CreateUser } from "src/utils/commans/dto";
 
  import { Like } from "typeorm";
import { User } from "../../../../models/auth.entity";
import { AuthService } from "../../../../service/auth.service";
  
  @Controller()
  export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Get('/getUsers')
    getUsers(@Query() query) {
      try {
        const sort: any = {};
        const projections: any = {};
        let options: { limit: number; pageNo: number } = {
          limit: 0,
          pageNo: 0,
        };
        // eslint-disable-next-line prefer-const
        let { limit, pageNo, sortBy, orderBy, ...clauses } = query;
        if ((query.limit, query.pageNo)) {
          options = {
            limit: parseInt(limit as string),
            pageNo: parseInt(pageNo as string),
          };
          delete clauses.limit;
          delete clauses.pageNo;
        }
        if (sortBy && orderBy) {
          sort[sortBy as string] = orderBy === "descend" ? "DESC" : "ASC";
        }
        if (clauses.searchTerm && clauses.searchValue) {
          const searchTerm: any = {};
          searchTerm[clauses.searchTerm as string] = Like(
            `${clauses.searchValue}%`
          );
          clauses = { ...clauses, ...searchTerm };
          delete clauses.searchTerm, delete clauses.searchValue;
        }
  
        return this.authService.getUsers(clauses, projections, options, sort);
      } catch (error) {}
    }
    @Get(":id")
    getUserById(@Param("id", ParseIntPipe) id: number) {
      return this.authService.getUserById(id);
    }
    @Post('/signUp')
    createUser(@Body() body:CreateUser) {
        console.log(body);
      try {
        return this.authService.createUser(body);
      } catch (error) {
        throw error;
      }
    }
    @Patch(":id")
    updateUser(@Body() body: User, @Param("id", ParseIntPipe) id: number) {
      try {
        return this.authService.updateUser(id, body);
      } catch (error) {
        throw error;
      }
    }
  
    @Delete(":id")
    deleteUser(@Param("id", ParseIntPipe) id: number) {
      try {
        return this.authService.deleteUser(id);
      } catch (error) {
        throw error;
      }
    }
  }
  