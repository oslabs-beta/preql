import React, {useState} from 'react'

const Warning = (props: any) => {
  const [alert, setAlert] = useState<string>('Please select from two different tables')

  const { setWarning, warning } = props;

  if(warning) {
    return(
      <div className='warning'>
        {warning}
      </div>
    )
  } else {
    return(
      <div className='warning'>
        {alert}
      </div>
    )
  }
}

export default Warning;
