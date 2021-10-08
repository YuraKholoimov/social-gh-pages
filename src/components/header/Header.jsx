import { NavLink } from 'react-router-dom';
import s from './header.module.css';

function Header(props) {
  // debugger;
  return (
    <div className={s.header}>
      <div>
        <img
        src="http://ww4.sinaimg.cn/large/bfae17b6gy1fkt7n9bpbij21hc0f8q4f.jpg"
        alt="#" />
      </div>
      <div className={s.loginBlock}>        
        {props.isAuth 
              ? <div>
                  <div>
                    {props.login}
                  </div>
                  <div>
                    <button onClick={props.logoutThunk}>Logout</button>
                  </div>
                </div>
                
              : <div><NavLink to={"/Login"}>LOGIN</NavLink></div>
        }
      </div> 
    </div>
  );
}
export default Header; 