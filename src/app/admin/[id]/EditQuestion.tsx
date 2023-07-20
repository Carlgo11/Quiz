"use client";
import 'bootstrap/dist/css/bootstrap.css'
import styles from './page.module.css'
import React, {useState} from "react"

export default function EditQuestion({params, data, options_length}: {
    params: { id: string },
    data: Array<string>,
    options_length: number
}) {

    const handleIncreaseOptions = (event: Event) => {
        event.preventDefault();
        setLength(length + 1);
    };

    const handleDecreaseOptions = (event: Event) => {
        event.preventDefault();
        setLength(length - 1);
    };

    const [length, setLength] = useState(data.length);

    return (
            <form key="a">
                <div className="card">
                    <div className="card-header">
                        Question {params.id}
                    </div>
                    <div className="card-body">
                        {Array.from({length: length}).map((_, index) => (
                                <div className="input-group mb-3" key={index}>
                                    <div className="input-group-text">
                                        <input type="radio" className="btn btn-outline-secondary" value={index + 1}
                                               name="correct"></input>
                                    </div>
                                    <input name={(index + 1).toString()} id={(index + 1).toString()} type="text"
                                           placeholder={"Option " + (index + 1)} className="form-control"
                                           defaultValue={data[index] || ""}/>
                                </div>
                        ))}
                        <button className={styles.plusMinusBtn} onClick={(e: any) => handleIncreaseOptions(e)}>+
                        </button>
                        <button className={styles.plusMinusBtn} onClick={(e: any) => handleDecreaseOptions(e)}>-
                        </button>
                    </div>
                </div>
            </form>
    )
}
