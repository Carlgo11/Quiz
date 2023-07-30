export default function Loading() {
  return (
      <div className="card">
        <div className="card-header">Question</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <div className="input-group-text">
              <input type="radio" className="btn btn-outline-secondary" disabled></input>
            </div>
            <input className="form-control"/>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-text">
              <input type="radio" className="btn btn-outline-secondary" disabled></input>
            </div>
            <input className="form-control"/>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-text">
              <input type="radio" className="btn btn-outline-secondary" disabled></input>
            </div>
            <input className="form-control"/>
          </div>
        </div>
      </div>
  )
}
