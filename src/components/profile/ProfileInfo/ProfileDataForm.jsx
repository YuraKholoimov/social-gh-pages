import { reduxForm, submit } from "redux-form";
import { createField, Input, Textarea } from "../../common/FormsControl";

import style from "./profileDataForm.module.css"


const ProfileDataForm = ({handleSubmit, userProfile, error }) => {
    return (
    <form onSubmit={handleSubmit}>
        <div className={style.profileDataForm}>
            <div >
                <div><button>Save</button></div>
                {error && <div className={style.formError} >
                                {error}
                            </div>}
                <div><b>Full name</b> : 
                    { createField("Full name", "fullName", [], Input) }
                </div>
                <div><b>About me</b>:
                    { createField("About me", "aboutMe", [], Textarea, ) }
                </div>
                <div><b>Looking for a job</b>: 
                    { createField("", "lookingForAJob", [], Input, {type: "checkbox"}) }
                </div>
                <div><b>My professional skills</b>: 
                    { createField("My professional skills", "lookingForAJobDescription", [], Textarea, ) }
                </div>
                <div>
                    {Object.keys(userProfile.contacts).map((key) => {
                    return (
                        <div key={key}>
                            <p>{key}</p>: { createField(key, `contacts.${key}`, [], Input ) }

                        </div>
                    );
                    })}
                </div>

            </div>
        </div>
    </form>
    );
  };

  const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)

  export default ProfileDataFormReduxForm