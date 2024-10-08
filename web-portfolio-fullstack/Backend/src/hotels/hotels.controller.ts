import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Request,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user.entity';
import {
  AddBookingByUserDto,
  CreateHotelDto,
  DeleteEmployeeFromVacancyDTO,
  GetemployeeDataDto,
  GetHotelData,
  GetVacancyData,
  HotelVacancyAllInfoDto,
  OwnerPatchJobByIdDto,
  PatchHotelDto,
  PatchHotelRoomDto,
  PatchHotelVacancyCreateDto,
  PatchHotelVacancyPatchDto,
  RemoveJobWithJobIdDto,
} from './DTO/create-hotelDto';
import { Hotels } from './hotels.entity';
import { HotelRooms } from './hotelsRooms.entity';
import { UserService } from 'src/user/user.service';
import { HotelVacancy } from './hotelsVacancy.entity';
import { JobDataEntity } from './JobDataEntity.entity';
import { Permissions } from 'src/auth/permissions';
import { CheckRolesGuard } from 'src/auth/auth-checkRoles';

@Controller('hotels')
@UseGuards(AuthGuard('jwt'))
export class HotelsController {
    constructor(
        private hotelService: HotelsService,
        private userService: UserService,
      ) {}

      /* hotel */

  @Post(`CreateHotel`)
  // @Permissions('CreateHotel')
  // @UseGuards(CheckRolesGuard)
  async CreateHotel(
    @Request() req,
    @Body() createHotelDto: CreateHotelDto,
  ): Promise<{ hotelID: string }> {
    console.log("I create hotel");
    const user: User = req.user;
    const hotelID:string = await this.hotelService.createHotel(user, createHotelDto);
    return { hotelID };
  }

  @Get(`HotelOwner`)
  async HotelOwner(
    @Request() req,
  ): Promise<{ userWithHotels: any }> {
    const user: User = req.user;
    const userWithHotels = await this.hotelService.getAllOwnerHotels(user);
    return {userWithHotels}
  }

  @Patch(`PatchHotel`)
  async PatchHotel(
    @Request() req,
    @Body() patchHotelDto: PatchHotelDto,
  ) {
    const user: User = req.user;
    await this.hotelService.PatchHotelData(user, patchHotelDto);
  }

  @Post(`GetHotelData`)
  async GetHotelData(
    @Request() req,
    @Body() GetHotelData: GetHotelData,
  ): Promise<{ HotelData: Hotels }> {
    const user: User = req.user;
    const HotelData = await this.hotelService.getHotelData(GetHotelData.HotelId, user);
    return {HotelData}
  }
  
  @Delete("DeleteHotelByOwner")
  async DeleteHotelByOwner(
    @Request() req,
    @Body() getHotelData: GetHotelData,
  ) {
    //delete hotel
  }

      /* room */
      
  @Post(`CreateRoom`)
  async CreateRoom(
    @Request() req,
    @Body() patchHotelRoomDto: PatchHotelRoomDto,
  ):Promise<{hotelData: any}> {
    const user: User = req.user;
    return { hotelData: await this.hotelService.createRoom(patchHotelRoomDto) };
  }

  @Patch(`PatchHotelRoom`)
  async PatchHotelRoom(
    @Request() req,
    @Body() patchHotelRoomDto: PatchHotelRoomDto,
  ) {
    const user: User = req.user;
    await this.hotelService.PatchHotelRoomOwner(patchHotelRoomDto);
  }

  @Post(`HotelRooms`)
  async GetHotelRoomsData(
    @Request() req,
    @Body() GetHotelData: GetHotelData,
  ): Promise<{ HotelRoomsData: HotelRooms[] }> {
    const user: User = req.user;
    const HotelRoomsData = await this.hotelService.getHotelRoomsData(GetHotelData.HotelId, user);
    return {HotelRoomsData}
  }

  @Get(`getAllRooms`)
  async getAllRooms(
  ): Promise<{ Data: any[] }> {
    const Data = await this.hotelService.getAllRoomsData();
    return {Data}
  }

  @Delete("DeleteHotelRoomByOwner")
  async DeleteHotelRoomByOwner(
    @Request() req,
    @Body() getHotelData: GetHotelData,
  ) {
    //delete hotel
  }

  /*vacancy */

  @Post(`CreateVacancy`)
  async CreateVacancy(
    @Body() patchHotelVacancyCreateDto: PatchHotelVacancyCreateDto,
  ): Promise<{ vacancyData: any }> {
    return {
      vacancyData: await this.hotelService.createVacancy(
        patchHotelVacancyCreateDto,
      ),
    };
  }

  @Post(`GetVacanciesData`)
  async GetVacanciesData(
    @Request() req,
    @Body() getHotelData: GetHotelData,
  ): Promise<{ vacanciesData: any }> {
    const user: User = req.user;
    const vacanciesData = await this.hotelService.getVacanciesData(
      user,
      getHotelData,
    );
    return { vacanciesData };
  }

  @Post(`GetVacancyEmployeeData`)
  async GetVacancyEmployeeData(
    @Request() req,
    @Body() getVacancyData: GetVacancyData,
  ): Promise<{ vacancyEmplyeeData: any[] }> {
    const user: User = req.user;
    const vacancyEmplyeeData = await this.hotelService.getVacancyEmployeeData(user, getVacancyData.vacancyId);
    return {vacancyEmplyeeData: vacancyEmplyeeData}
  }

  @Post(`GetAllHotelEmployeeDataOwner`)
  async HotelEmployeeDataOwner(
    @Request() req,
    @Body() GetHotelData: GetHotelData,
  ): Promise<{ EmployeeData: JobDataEntity[] }> {
    const user: User = req.user;
    const EmployeeData = await this.hotelService.getAllHotelEmployeeDataOnHotelId(user, GetHotelData.HotelId);
    return {EmployeeData}
  }

  @Patch("PatchHotelVacancyDataOwner")
  async PatchHotelVacancyDataOwner(
    @Request() req,
    @Body() patchHotelVacancyPatchDto: PatchHotelVacancyPatchDto,
  ) {
    const user: User = req.user;
    await this.hotelService.PatchVacancyData(patchHotelVacancyPatchDto, user);
  }

  @Get("GetAllVacanciesUser")
  async GetAllVacanciesUser(
    @Request() req,
  ): Promise<{ vacanciesData: HotelVacancyAllInfoDto[] }> {
    const user: User = req.user;
    const vacanciesData: HotelVacancyAllInfoDto[] = await this.hotelService.GetAllVacancies(user.id);
    return { vacanciesData };
  }

  @Patch("ApplyToVacancy")
  async ApplyToVacancy(
    @Request() req,
    @Body() getVacancyData: GetVacancyData,
  ) {
    const user: User = req.user;
    await this.hotelService.applyToVacancy(user, getVacancyData.vacancyId);
  }

  @Delete("DeleteEmployeeFromVacancy")
  async DeleteEmployeeFromVacancy(
    @Request() req,
    @Body() deleteEmployeeFromVacancyDTO: DeleteEmployeeFromVacancyDTO,
  ) {
    const user: User = req.user;
    await this.hotelService.removedFromVacancy(user, deleteEmployeeFromVacancyDTO.userId, deleteEmployeeFromVacancyDTO.vacancyId)
  }

  @Delete("AcceptEmployeeForVacancy")
  async DeleteAcceptEmployee(
    @Request() req,
    @Body() deleteEmployeeFromVacancyDTO: DeleteEmployeeFromVacancyDTO,
  ) {
    const boss: User = req.user;

    const employee: User = await this.userService.getUseryId(deleteEmployeeFromVacancyDTO.userId);
    const vacancy: HotelVacancy = await this.hotelService.ft_GetVacancyData(boss, deleteEmployeeFromVacancyDTO.vacancyId);
    const hotel: Hotels = await this.hotelService.ft_getHotelData(deleteEmployeeFromVacancyDTO.hotelId, boss.id);
    await this.hotelService.acceptVacancy(boss, employee, vacancy, hotel);
    await this.hotelService.RemoveVacancy(vacancy);
  }

  /* Booking controller */

  @Post("BookRoomByUser")
  async BookRoomByUser(
    @Request() req,
    @Body() addBookingByUserDto: AddBookingByUserDto,
  ) {
    const user: User = req.user;
    console.log(addBookingByUserDto.hotelRoomId)
    
    await this.hotelService.bookRoomByUser(user,
      addBookingByUserDto.hotelRoomId,
      new Date(addBookingByUserDto.startDate),
      new Date(addBookingByUserDto.endDate),
    )
  }

  @Delete("DeleteBookingByUser")
  async DeleteBookingByUser(
    @Request() req,
    @Body() getVacancyData: GetVacancyData,
  ) {
    //only the user or the hotelOwner cna delete a booking

  }
  
  @Post("ShowAllUserBookings")
  async ShowAllUserBookings(
    @Request() req,
  ):Promise<{ BookingData: any[] }> {
    const user: User = req.user;
    return {BookingData: await this.hotelService.getAllUserBookingsWithRoomDetails(user.id)}
  }
  
  @Post("ShowAllHotelOwnerBookings")
  async ShowAllHotelOwnerBookings(
    @Request() req,
  ) {
    const user: User = req.user;
    
  }

  @Delete("DeleteBookingByOwner")
  async DeleteBookingByOwner(
    @Request() req,
    @Body() getVacancyData: GetVacancyData,
  ) {
    //delete booking/ seperate because maybe a message is send to the User
  }

  /* employee */

  @Post("OwnerGetAllEmployeeData")
  async OwnerGetAllEmployeeData(
    @Request() req,
  ):Promise<{AllData: any[]}> {
    return{AllData: await this.hotelService.getAllHotelEmployeeData(req.user)};
  }

  @Post("OwnerGetAllEmployeeId")
  async OwnerGetAllEmployeeId(
    @Request() req,
  ):Promise<{AllData: any[]}> {
    return{AllData: await this.hotelService.getAllHotelEmployeeDataId(req.user)};
  }

  @Post("OwnerGetAllEmployeeJobINfoRelatedToOwner")
  async OwnerGetAllEmployeeJobINfoRelatedToOwner(
    @Request() req,
    @Body() getemployeeDataDto: GetemployeeDataDto,
  ):Promise<{AllData: any[]}> {
    return{AllData: await this.hotelService.ownerGetAllFromEmployeeIdJobsRelatedToOwner(req.user, getemployeeDataDto.employeeId)};
  }

  @Delete("OwnerRemoveJobFromEmployee")
  async OwnerRemoveJobFromEmployee(
    @Request() req,
    @Body() removeJobWithJobIdDto: RemoveJobWithJobIdDto,
  ) {
        await this.hotelService.ownerRemoveJobFromEmployee(req.user, removeJobWithJobIdDto.jobId)
  }
  

  @Patch('OwnerPatchJobFromEmployee')
  async OwnerPatchJobFromEmployee(
    @Request() req,
    @Body() OwnerPatchJobByIdDto: OwnerPatchJobByIdDto,
  ) {
    await this.hotelService.ownerUpdateJob(req.user, OwnerPatchJobByIdDto);
  }
}
