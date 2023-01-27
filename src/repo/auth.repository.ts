import { EntityRepository, Repository } from "typeorm";
import { User } from "../models/auth.entity";

@EntityRepository()
export class TasksRepository extends Repository<User> {

}