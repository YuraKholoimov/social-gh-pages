import style from "./formsControl.module.css";



export const Textarea = ({ input, meta, ...props }) => {
  
  return (
    <div className={style.formControl + " " + (meta.touched && meta.error ? style.error : "" )}>
      <div>
        <textarea {...input} {...props} />
      </div>
      <div className={style.errorText}>
        { meta.touched && meta.error && <span>{meta.error}</span>}
      </div>
    </div>
  );
};

export const Input = ({ input, meta, ...props }) => {

  return (
    <div className={style.formControl + " " + (meta.touched && meta.error ? style.error : "" )}>
      <div>
        <input {...input} {...props} />
      </div>
      <div className={style.errorText}>
        { meta.touched && meta.error && <span>{meta.error}</span>}
      </div>
    </div>
  );
};
