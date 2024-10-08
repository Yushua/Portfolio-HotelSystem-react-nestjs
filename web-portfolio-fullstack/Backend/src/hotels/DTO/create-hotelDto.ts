import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Hotels } from '../hotels.entity';

export class CreateHotelDto {
  @IsNotEmpty()
  @IsString()
  HotelName: string;

  @IsString()
  @IsNotEmpty()
  Description: string;
}

export class GetHotelData {
  @IsNotEmpty()
  @IsString()
  HotelId: string;
}

export class GetVacancyData {
  @IsNotEmpty()
  @IsString()
  vacancyId: string;
}

export class GetemployeeDataDto {
  @IsNotEmpty()
  @IsString()
  employeeId: string;
}

export class RemoveJobWithJobIdDto {
  @IsNotEmpty()
  @IsString()
  jobId: string;
}


export class DeleteEmployeeFromVacancyDTO {
  @IsNotEmpty()
  @IsString()
  vacancyId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  hotelId: string;
}

export class PatchHotelDto {
  @IsNotEmpty()
  @IsString()
  HotelName: string;

  @IsString()
  @IsNotEmpty()
  Description: string;

  @IsString()
  @IsNotEmpty()
  HotelId: string;
}

export class PatchHotelRoomDto {
  @IsNotEmpty()
  @IsString()
  HotelId: string;

  //this is an option.
  hotelRoomId?: string;

  @IsNotEmpty()
  @IsString()
  RoomNumber: string;

  @IsNotEmpty()
  @IsString()
  RoomName: string;

  @IsNotEmpty()
  @IsString()
  Employee: string;

  @IsNotEmpty()
  @IsString()
  HotelDescription: string;

  @IsNotEmpty()
  @IsNumber()
  BigBeds: number;

  @IsNotEmpty()
  @IsNumber()
  SmallBeds: number;

  @IsNotEmpty()
  @IsNumber()
  Rooms: number;

  @IsNotEmpty()
  @IsNumber()
  Price: number;

  @IsNotEmpty()
  @IsBoolean()
  Kitchen: boolean;

  @IsNotEmpty()
  @IsBoolean()
  Wifi: boolean;

  @IsNotEmpty()
  @IsBoolean()
  Breakfast: boolean;

  @IsNotEmpty()
  @IsBoolean()
  Roomservice: boolean;

  @IsNotEmpty()
  @IsBoolean()
  Animals: boolean;
}

export class PatchHotelVacancyCreateDto {
  @IsNotEmpty()
  @IsString()
  HotelId: string;

  @IsString()
  @IsNotEmpty()
  jobName: string;

  @IsString()
  @IsNotEmpty()
  jobDescription: string;

  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @IsNumber()
  @IsNotEmpty()
  jobPay: number;
}

export class PatchHotelVacancyPatchDto {
  @IsNotEmpty()
  @IsString()
  VacancyId: string;

  @IsString()
  @IsNotEmpty()
  jobDescription: string;

  @IsString()
  @IsNotEmpty()
  jobName: string;

  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @IsNumber()
  @IsNotEmpty()
  jobPay: number;
}


export class AddBookingByUserDto {
  @IsNotEmpty()
  @IsString()
  startDate: string;

  @IsNotEmpty()
  @IsString()
  endDate: string;

  @IsNotEmpty()
  @IsString()
  hotelRoomId: string;
}

export class OwnerPatchJobByIdDto {
  @IsNotEmpty()
  @IsString()
  JobName: string;

  @IsNotEmpty()
  @IsString()
  JobTitle: string;

  @IsNotEmpty()
  @IsString()
  JobDescription: string;

  @IsNotEmpty()
  @IsNumber()
  JobPay: number;
  
  @IsNotEmpty()
  @IsString()
  jobId: string;
}

export class HotelVacancyAllInfoDto {
  VacancyId: string;
  jobName: string;
  jobPay: number;
  jobTitle: string;
  jobDescription: string;
  hotelName: string;
  hotelOwner: string;
  hotelId: string;
}

export class HotelAllVacanciesDataDto {
  hotel: Hotels;
  VacancyId: string;
  jobName: string;
  jobPay: number;
  jobTitle: string;
  jobDescription: string;
  jobApplicants: number;
}