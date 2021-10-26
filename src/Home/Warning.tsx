import React, {useState} from 'react';

const Warning = (props: any) => {
  const { warning} = props;
  const [alert, setAlert] = useState<string>('You must pick from two different tables*')

  if(warning) {
    return(
      <div className='warning'>
        {alert}
      </div>
    )
  } else {
    return(
      <div className='warning'>
        {/* {alert} */}
      </div>
    )
  }
}

export default Warning;
