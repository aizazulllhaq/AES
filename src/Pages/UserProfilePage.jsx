import Navbar from "../features/Navbar/Navbar";
import { UserProfile } from "../features/User/components/UserProfile";

function UserProfilePage(){
    return(
        <Navbar>
            <h1 className="mx-auto text-2xl ">My Profile</h1>
            <UserProfile/>
        </Navbar>
    )
}

export default UserProfilePage;