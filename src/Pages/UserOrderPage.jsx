import Navbar from "../features/Navbar/Navbar";
import { UserOrders } from "../features/User/components/UserOrders";

function UserOrderPage(){
    return(
        <Navbar>
            <h1 className="mx-auto text-2xl">My Orders</h1>
            <UserOrders/>
        </Navbar>
    )
}

export default UserOrderPage;