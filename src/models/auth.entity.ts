import { LoginEnumType } from "src/utils/commans/enums";
import { Password } from "src/utils/password.utils";
import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";


@Entity()
export class User extends BaseEntity{
    @Column({ primary: true, generated: 'uuid' })
    id: number;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column()
    typeOfLogin: LoginEnumType;
     @Column()
    isDeleted: boolean;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
    @BeforeInsert()
    async hashPassword(){
      this.password =await Password.toHash(this.password);
    }
    
    
}



