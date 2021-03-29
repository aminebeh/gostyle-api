import { Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon) private usersRepository: Repository<Coupon>,
  ) {}
  create(createCouponDtos: CreateCouponDto[]) {
    return this.usersRepository.save(
      this.usersRepository.create(createCouponDtos),
    );
  }

  async insert(createCouponDto: CreateCouponDto) {
    return this.usersRepository.save(
      this.usersRepository.create(createCouponDto),
    );
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneOrFail(id);
  }

  async update(id: number, updateCouponDto: UpdateCouponDto) {
    await this.usersRepository.findOneOrFail(id);
    return this.usersRepository.update(id, updateCouponDto);
  }

  async remove(id: number) {
    await this.usersRepository.findOneOrFail(id);
    await this.usersRepository.delete(id);
  }
}
