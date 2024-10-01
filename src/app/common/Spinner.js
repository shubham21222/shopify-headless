
const Spinner = () => {
  return (
    <div className="page flex justify-center items-center h-screen">
        <div className="loadContainer">
          <div className="loadInner">
            <div className="loadCircle">
              <div className="loadCircleInner"></div>
            </div>
            <div className="loadCircle">
              <div className="loadCircleInner"></div>
            </div>
            <div className="loadCircle">
              <div className="loadCircleInner"></div>
            </div>
            <div className="loadCircle">
              <div className="loadCircleInner"></div>
            </div>
            <div className="loadCircle">
              <div className="loadCircleInner"></div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Spinner