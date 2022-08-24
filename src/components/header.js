import ApiCall from './ApiCall';
import { useState } from 'react';

function Header() {
    const [selection, setSelection] = useState({value: "Ankara"})
    const cities = ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya"]

    const handleSelection = (e) => {
        setSelection({value: e.target.value})
    }

    return (
        <div>
            <div className="header">
                <select name="selection" value={selection.value} onChange={handleSelection}>
                    <option value="İstanbul">{cities[0]}</option>
                    <option value="Ankara">{cities[1]}</option>
                    <option value="İzmir">{cities[2]}</option>
                    <option value="Bursa">{cities[3]}</option>
                    <option value="Antalya">{cities[4]}</option>
                </select>
            </div>
            <ApiCall getSelection={selection.value} />
        </div>   
    )

}

export default Header