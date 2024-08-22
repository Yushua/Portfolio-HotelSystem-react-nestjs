import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { UserStatus } from './user.model';
import { HotelEmployee } from './hotel-employee.entity';
import { Hotels } from 'src/hotels/hotels.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  //can change
  @Column({ unique: true })
  username: string;

  @Column({ default: '' })
  password: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: UserStatus.IN_PROGRESS })
  status: UserStatus;
  
  @Column({ default: '' })
  email: string;

  @Column({ default: false })
  twoFactorAuth: boolean;

  @Column('text', { array: true, default: '{}' })
  roles: string[];

  //Hotels.

  @OneToMany(() => Hotels, hotels => hotels.user)
  @JoinColumn()
  hotels: Hotels;

  //bookings

  @OneToOne(() => HotelEmployee, employee => employee.user)
  @JoinColumn()
  employee: HotelEmployee;
}
