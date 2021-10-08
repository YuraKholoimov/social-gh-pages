import { connect } from "react-redux";
import SideBareFriends from "./SideBareFriends";


const mapStateToProps = (state) => {
    return {
        state: state.SideBareFriends
    }
}

const SideBareFriendsContainer = connect (mapStateToProps)(SideBareFriends)

export default SideBareFriendsContainer
;