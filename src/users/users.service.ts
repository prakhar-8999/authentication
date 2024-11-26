/* eslint-disable require-await */
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { Role } from './roles.entity';
import { User } from './user.entity';
import { UserInterface } from './user.schema';
import { UserRole } from './userroles.entity';

export interface responseInterface {
  message: string
}

interface userRequestInterface extends Partial<UserInterface>{
  role: "ADMIN" | "USER"
}
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private jwtService: JwtService
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email: email } });
  }

  

  async findRole(id: number): Promise<UserRole | undefined> {
    return this.userRoleRepository.findOne({
      where: { UserId: id },
      relations: ['role'],
    });
  }

  async findAll(): Promise<User[] | undefined> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User | undefined> {
    // Fetch user by ID
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      return null;
    }

    // Fetch user's role
    const userRole = await this.userRoleRepository.findOne({
      where: { UserId: id },
      relations: ['role'],
    });

    const response: any = {};
    response.id = user.id;
    response.FirstName = user.firstName;
    response.LastName = user.lastName;
    response.Email = user.email;
    response.role = userRole?.role.NormalizedName || null;
    response.roleId = userRole?.RoleId;

    return response;
  }

  async create(request: userRequestInterface): Promise<responseInterface> {
    const alreadyUser = await this.userRepository.findOne({
      where: { email: request.email },
    });
    
    if (alreadyUser) {
      throw new BadRequestException('Email Already Registered!');
    }

    const password = await bcrypt.hash(request.password, 10)

    const user = this.userRepository.create({
      firstName: request.firstName,
      lastName: request.lastName,
      email: request.email,
      createdAt: new Date(),
      updatedAt: new Date(),
      password: password
    });

    if (!request.role) {
      throw new BadRequestException('Please provide role!');
    }

    const role = await this.roleRepository.findOne({
      where: {
        NormalizedName: request.role,
      },
    });

    if (!role) {
      throw new BadRequestException('Role not found');
    }

    const result = await this.userRepository.save(user);
    if (!result) {
      throw new BadRequestException('Registration Failed');
    }

    const userRole = this.userRoleRepository.create({
      UserId: result.id,
      RoleId: role.Id,
    });

    await this.userRoleRepository.save(userRole);

    return {"message": "User registered successfully!"};
  }

  async getAllUsers(): Promise<any[]> {
    const users = await this.userRepository.find();
    const response: any[] = [];

    for (const user of users) {
      const userResponse: any = {};
      userResponse.id = user.id;
      userResponse.firstName = user.firstName;
      userResponse.lastName = user.lastName;
      userResponse.email = user.email;

      const userRole = await this.userRoleRepository.findOne({
        where: { UserId: user.id },
        relations: ['role'],
      });

      userResponse.role = userRole?.role.NormalizedName || null;
      response.push(userResponse);
    }

    return response;
  }
}
