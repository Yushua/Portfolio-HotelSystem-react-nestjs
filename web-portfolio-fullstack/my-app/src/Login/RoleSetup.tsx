import { useEffect } from 'react';
import { newWindow } from '../App';
import UserProfile from '../MainBrowser/Pages/UserPages/UserProfile';
import MainBrowser from '../MainBrowser/MainBrowser';
import ShowAllOwnerHotels from '../MainBrowser/Pages/HotelOwnerPages/ShowAllOwnerHotels';
import AllVacancies from '../MainBrowser/Pages/HotelOwnerPages/AllVacancies';
import ShowAllEmployees from '../MainBrowser/Pages/HotelOwnerPages/ShowHotelEmployees';
import CreateHotelPage from '../MainBrowser/Pages/HotelOwnerPages/createPages/CreateHotelPage';
import ShowAllHotelRooms from '../MainBrowser/Pages/UserPages/ShowAllRooms';
import AllBookings from '../MainBrowser/Pages/UserPages/AllBookings';
import RolesManagement from '../MainBrowser/Pages/SettingPages/RolesManagementPage';

export const WebPages: Array<[string, JSX.Element]> = [
  ['Profile', <UserProfile />],
  //owner
  ['Create Hotel', <CreateHotelPage/>],
  ['Hotel Owner', <ShowAllOwnerHotels/>],
  ['Vacancies', <AllVacancies/>],
  ['Employees', <ShowAllEmployees/>],
  //User
  ['Rooms', <ShowAllHotelRooms/>],
  ['Bookings', <AllBookings/>],
  ['Role Setup', <RolesManagement/>],
];

// const filterWebPages = (pageNames: string[]): Array<[string, JSX.Element]> => {
//   return WebPages.filter(([name, _]) => pageNames.includes(name));
// };

//to do, add filter online.
export async function filterRoles(): Promise<Array<[string, JSX.Element]>> {
  //filter the webpages based on your role.
  //simple system. each role has the corresponding roles attached to it. make sure the name on the backend is there
  //then it goes through each of them, filters and adds to the list. then again. then you check here if its included.
  //it can happen multiple webs you can access, that is ok
  return WebPages;
}

function RoleSetup(){
  // const [RoleWebList, setRoleWebList] = useState<Array<[string, JSX.Element]>>([]);
  // const [FavoriteWebList, setFavoriteWebList] = useState<Array<[string, JSX.Element]>>([]);

  useEffect(() => {
    const getRolesOfUser = async () => {
      // const webPagesUserArray: string[] = await getUserWebpages();
      // setRoleWebList(filterWebPages(webPagesUserArray));
      // console.log(webPagesUserArray.length)

      // const webPagesUserFavArray: string[] = await getUserFavorites();
      // setFavoriteWebList(filterWebPages(webPagesUserFavArray));
      // if (webPagesUserArray.length === 0 && webPagesUserFavArray.length === 0){
      //   //for now add all webpages as info
      //   newWindow(<MainBrowser webPages={WebPages} favoritePages={WebPages}/>);
      // }
      newWindow(<MainBrowser webPages={WebPages} favoritePages={WebPages}/>);
    };
    getRolesOfUser();
  }, []);

    return (
      <>
        loading Role setup
      </>
    );
  }
  
  export default RoleSetup;