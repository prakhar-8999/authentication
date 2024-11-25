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
  authenticated: boolean;
  userId: number;
  token: string;
  Role: string;
}

export const tempRoles = {
  runner: 0,
  coach: 1,
};

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
    return this.userRepository.findOne({ where: { UserName: email } });
  }

  async findAllByType(type: number): Promise<User[] | undefined> {
    return this.userRepository.find({ where: { Type: type } });
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
    const user = await this.userRepository.findOne({ where: { Id: id } });
    if (!user) {
      return null;
    }

    // Fetch user's role
    const userRole = await this.userRoleRepository.findOne({
      where: { UserId: id },
      relations: ['role'],
    });

    const response: any = {};
    response.id = user.Id;
    response.FirstName = user.FirstName;
    response.LastName = user.LastName;
    response.Email = user.Email;
    response.role = userRole?.role.NormalizedName || null;
    response.roleId = userRole?.RoleId;

    return response;
  }

  async create(request: Partial<UserInterface>): Promise<responseInterface> {
    const alreadyUser = this.userRepository.findOne({
      where: { UserName: request.Email, Deleted: false },
    });
    if (!alreadyUser) {
      throw new BadRequestException('Email Already Registered!');
    }

    const user = this.userRepository.create({
      FirstName: request.FirstName,
      LastName: request.LastName,
      UserName: request.Email,
      Email: request.Email,
      SecurityStamp: crypto.randomUUID(),
      LastUpdatedAt: new Date(),
      CreatedAt: new Date(),
      PasswordHash: await bcrypt.hash(request.Password, 10),
      Type: request.Type,
      Active: true,
      Deleted: false,
      EmailConfirmed: false,
      PhoneNumberConfirmed: false,
      TwoFactorEnabled: false,
      LockoutEnabled: true,
      AccessFailedCount: 1,
    });

    const result = await this.userRepository.save(user);
    // console.log(result);

    if (!result) {
      throw new BadRequestException('Registration Failed');
    }

    let role;
    role = await this.roleRepository.findOne({
      where: {
        NormalizedName: request.Type === tempRoles.runner ? 'RUNNER' : 'COACH',
      },
    });
    // if (request.Type === ) {
    //   role = await this.roleRepository.findOne({
    //     where: { Id: roles.COACH },
    //   });
    // } else if (request.Type === roles.RUNNER) {
    //   role = await this.roleRepository.findOne({
    //     where: { Id: roles.RUNNER },
    //   });
    // }

    // Ensure that role exists before proceeding
    if (!role) {
      throw new BadRequestException('Role not found');
    }

    // Create the UserRole entity
    const userRole = this.userRoleRepository.create({
      UserId: result.Id,
      RoleId: role.Id,
    });

    // Save the user role to the database
    await this.userRoleRepository.save(userRole);

    const payload = {
      UserId: user.Id,
      username: user.Email,
      Role: request.Type === tempRoles.runner ? 'Runner' : 'Coach',
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName,
    };
    const token = await this.jwtService.signAsync(payload);

    return {
      authenticated: true,
      userId: user.Id,
      token: token,
      Role: request.Type === tempRoles.runner ? 'Runner' : 'Coach',
    };
  }

  async getAllUsers(): Promise<any[]> {
    const users = await this.userRepository.find();
    const response: any[] = [];

    for (const user of users) {
      const userResponse: any = {};
      userResponse.id = user.Id;
      userResponse.FirstName = user.FirstName;
      userResponse.LastName = user.LastName;
      userResponse.Email = user.Email;

      // Fetch role for the user
      const userRole = await this.userRoleRepository.findOne({
        where: { UserId: user.Id },
        relations: ['role'],
      });

      userResponse.role = userRole?.role.NormalizedName || null;
      response.push(userResponse);
    }

    return response;
  }
}
