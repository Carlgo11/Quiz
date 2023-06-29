export const runtime = 'edge'
import 'bootstrap/dist/css/bootstrap.css'
import '../layout';

export default async function Home() {
    return (
        <form method="POST">
            <h1 className="text-center">Choose A Team Name</h1>
            <hr/>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Team Name</label>
                <input name="username" id="username" className="form-control"/>
            </div>

            <button className="btn btn-lg btn-success" type="submit">Continue</button>
        </form>
    );
}