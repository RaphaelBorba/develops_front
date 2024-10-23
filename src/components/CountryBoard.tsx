import Link from "next/link";
import { useEffect, useState } from "react";

export const CountryBoard = () => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch(`http://localhost:3001/`);
                const data = await response.json();
                setCountries(data);
            } catch (error) {
                console.error('Error fetching country data:', error);
            }
        };

        fetchCountries();
    }, []);

    return (
        <div className="flex flex-col gap-4 items-center my-10">
            {
                countries.map((country: any) => (
                    <Link href={`/country/${country.countryCode}`} className="flex flex-row gap-4 border rounded-md p-2" key={country.countryCode}>
                        <h2>Country: {country.name}</h2>
                        <p>Code: {country.countryCode}</p>
                    </Link>
                ))
            }
        </div>
    );
};

export default CountryBoard;