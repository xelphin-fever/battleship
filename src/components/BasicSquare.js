import React, { useState, useEffect } from 'react';

const BasicSquare = (props) => {
  
  const [myDiv, setMyDiv] = useState(<div className="board-square"></div>);

  const classActive = " board-square board-basic-square-active";
  const classUnActive = "board-square"

  const sendMouseEnter = () => {
    props.sendEvent(props.index);
  }

  const sendMyClick = () => {
    props.sendClick(props.index);
  }


  useEffect(() => {
    if (props.active === true){
      setMyDiv(<div className={classActive}  onMouseOver={sendMouseEnter} onClick={sendMyClick}></div>);
    } else {
      setMyDiv(<div className={classUnActive} onMouseOver={sendMouseEnter}></div>);
    }
  }, [props])

  return (myDiv);
}

export default BasicSquare;