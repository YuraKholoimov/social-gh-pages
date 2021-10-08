import React from "react";


const withSuspens = (Component) => {
    return (props) => {
        return <React.Suspense fallback={<div>Loading...</div>}>
                  <Component {...props}/>
                </React.Suspense>
    };
}
export default withSuspens;