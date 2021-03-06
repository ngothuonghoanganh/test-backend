import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"

@Injectable()
export class UsersService {

    constructor(@InjectRepository(Users) private usersRepository: Repository<Users>) { }

    async getUsers(user: Users): Promise<Users[]> {
        try {
            return await this.usersRepository.find();
        } catch (error) {
            new BadRequestException(error)
        }
    }

    async getUser(_id: number): Promise<Users> {
        try {
            return await this.usersRepository.findOne({
                where: { id: _id },
                select: ["id", "firstName", "lastName", "email", "email", "phone"]
            });
        } catch (error) {
            new BadRequestException(error)
        }
    }

    async updateUser(id: number, user: Users) {
        try {
            return await this.usersRepository.update(id, user)
        } catch (error) {
            new BadRequestException(error)
        }
    }

    async deleteUser(user: Users) {
        try {
            return await this.usersRepository.delete({ id: user.id });
        } catch (error) {
            new BadRequestException(error)
        }
    }

    async createUser(user: Users) {
        try {
            const existedUser = await this.usersRepository.findOne({
                where: {
                    username: user.username
                }
            })

            if (existedUser) {
                throw new BadRequestException("username_existed")
            }

            const hashPassword = await bcrypt.hash(user.password, 10)
            user.password = hashPassword
            return await this.usersRepository.insert(user);
        } catch (error) {
            new BadRequestException(error)
        }
    }

    async resetPassword(user: Users) {
        try {
            const existedUser = await this.usersRepository.findOne({
                where: {
                    username: user.username
                }
            })

            if (!existedUser) {
                throw new BadRequestException("username_not_existed")
            }

            const hashPassword = await bcrypt.hash(user.password, 10)
            existedUser.password = hashPassword
            return await existedUser.save()
        } catch (error) {
            new BadRequestException(error)
        }
    }

    async login(user: Users) {
        try {
            const existedUser = await this.usersRepository.findOne({
                where: {
                    username: user.username
                }
            })
            if (!existedUser) {
                throw new BadRequestException("user_do_not_exist")
            }
            if (!(await bcrypt.compare(user.password, existedUser.password))) {
                throw new BadRequestException("invalid_password")
            }
            delete existedUser.password
            const token = await jwt.sign({ ...existedUser }, process.env.SECRET_CODE_JWT, {
                expiresIn: "24h"
            })
            return {
                ...existedUser,
                token: token
            }
        } catch (error) {
            new BadRequestException(error)
        }
    }
}
