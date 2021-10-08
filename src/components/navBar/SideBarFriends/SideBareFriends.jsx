import DialogItem from "../../Dialogs/DialogItems/DialogItems"
import s from './SideBareFriends.module.css'
const SideBareFriends = (props) => {
    
    let dialogItemsElement = props.state.map((el) => <DialogItem key={el.id} name={el.name} id={el.id} img={el.avatar} />)

    return (
        <div className={s.sideBareFriends}>
            <h2>Friends</h2>

            <div className={s.dialogItemElements}>
            { dialogItemsElement }
            </div>
        </div>
    )
}

export default SideBareFriends;